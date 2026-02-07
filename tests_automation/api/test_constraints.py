import pytest
import httpx
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000"

import pytest_asyncio

@pytest_asyncio.fixture(scope="function")
async def auth_token():
    async with httpx.AsyncClient() as client:
        # Assumes test user exists from seed script
        response = await client.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "testuser@example.com", "password": "testpassword123"}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        return response.json()["access_token"]

@pytest.mark.asyncio
async def test_tc003_entity_and_session_creation(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    async with httpx.AsyncClient() as client:
        # 1. Create Event (using event_name per schema)
        event_resp = await client.post(
            f"{BASE_URL}/api/v1/events/",
            headers=headers,
            json={
                "event_name": "QA Schema Test",
                "event_type": "conference",
                "start_date": "2026-05-01T09:00:00",
                "end_date": "2026-05-01T17:00:00",
                "constraints": {}
            }
        )
        assert event_resp.status_code == 200, f"Event creation failed: {event_resp.text}"
        event_id = event_resp.json()["id"]

        # 2. Add Entities (using entities list per schema)
        entity_payload = {
            "entity_type": "Room",
            "entities": [{"name": "Grand Ballroom", "capacity": 100}]
        }
        ent_resp = await client.post(
            f"{BASE_URL}/api/v1/events/{event_id}/entities",
            headers=headers,
            json=entity_payload
        )
        assert ent_resp.status_code == 200

        # 3. Add Sessions (using sessions list per schema)
        session_payload = {
            "sessions": [{"title": "QA Keynote", "duration": 45, "priority": 1}]
        }
        sess_resp = await client.post(
            f"{BASE_URL}/api/v1/events/{event_id}/sessions",
            headers=headers,
            json=session_payload
        )
        assert sess_resp.status_code == 200

@pytest.mark.asyncio
async def test_tc004_ai_schedule_generation_e2e(auth_token):
    headers = {"Authorization": f"Bearer {auth_token}"}
    async with httpx.AsyncClient() as client:
        # 1. Create Event
        event_resp = await client.post(
            f"{BASE_URL}/api/v1/events/",
            headers=headers,
            json={
                "event_name": "AI Auto-Generation Test",
                "event_type": "conference",
                "start_date": "2026-06-01T08:00:00",
                "end_date": "2026-06-01T18:00:00",
                "constraints": {}
            }
        )
        event_id = event_resp.json()["id"]

        # 2. Add Venue Entity
        await client.post(
            f"{BASE_URL}/api/v1/events/{event_id}/entities",
            headers=headers,
            json={"entity_type": "Venue", "entities": [{"name": "Main Stage"}]}
        )
        
        # 3. Add Sessions
        await client.post(
            f"{BASE_URL}/api/v1/events/{event_id}/sessions",
            headers=headers,
            json={"sessions": [
                {"title": "Intro to AI", "duration": 60, "priority": 1},
                {"title": "Deep Learning Workshop", "duration": 120, "priority": 2}
            ]}
        )

        # 4. Trigger Schedule Generation (correct endpoint name)
        gen_resp = await client.post(f"{BASE_URL}/api/v1/events/{event_id}/generate-schedule", headers=headers)
        
        assert gen_resp.status_code == 200, f"Generation failed: {gen_resp.text}"
        data = gen_resp.json()
        assert "schedule" in data
        assert len(data["schedule"]) >= 2
