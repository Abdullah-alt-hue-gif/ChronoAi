# Team Assets

This directory contains profile images for the ChronoAI team members. Images are used throughout the application for team recognition and branding purposes.

## Profile Images

The following team member profile images are included:

| Member | File | Format | Resolution |
|--------|------|--------|-----------|
| Hadia | `hadia.jpg` | JPEG | 400x400px |
| Kinza | `kinza.jpg` | JPEG | 400x400px |
| Maryam | `maryam.jpg` | JPEG | 400x400px |
| Sehrish | `sehrish.jpg` | JPEG | 400x400px |
| Abdullah | `abdullah.svg` | SVG | Placeholder |

## Image Guidelines

### Technical Specifications
- **Aspect Ratio**: 1:1 (square)
- **Recommended Size**: 400x400 pixels minimum
- **File Format**: JPG for photographs, PNG/SVG for graphics
- **File Size**: Less than 100KB for optimal load times
- **Color Space**: RGB (no CMYK)

### Naming Conventions
- Use lowercase member name (e.g., `hadia.jpg`)
- No spaces in filenames
- Use standard image extensions (.jpg, .jpeg, .png, .svg)

### Usage in Application
- Grid cards: 96x96px display size with rounded corners
- Featured cards: 160x160px display size with shadow effects
- Profile pages: Large format at original resolution
- Navigation: 80x80px for compact display

## Replacing or Updating Images

### To add or replace a team member image:

1. Prepare square image (1:1 aspect ratio)
2. Resize to 400x400 pixels or larger
3. Export as JPEG or PNG
4. Place in this directory with lowercase member name
5. Update application references if filename changes
6. Test image display across responsive breakpoints

### To update Abdullah's image:

1. Replace `abdullah.svg` with `abdullah.jpg` or `abdullah.png`
2. Update import path in `lib/mockData.ts`:
   ```typescript
   // Before
   image: "/team/abdullah.svg"
   
   // After
   image: "/team/abdullah.jpg"
   ```
3. Clear browser cache to see updated image

## Component Integration

Profile images are handled by the `ProfileImage` component which provides:

- Automatic fallback to member initials if image fails to load
- Responsive sizing (small: 80px, medium: 96px, large: 160px)
- Hover effects with subtle transitions
- Loading states with skeleton screens
- CSS optimization with next/image

### Component Usage Example

```typescript
<ProfileImage
  name="Jane Doe"
  size="large"
  image="/team/jane.jpg"
/>
```

## Image Optimization

All images are optimized automatically by Next.js:
- Lazy loading by default
- WebP format conversion when possible
- Responsive image sizes based on viewport
- Compression and format optimization
- CDN delivery friendly

## Accessibility

- All images have alt text generated from team member names
- High contrast backgrounds ensure visibility
- Sufficient color contrast ratios (WCAG AA)
- Fallback text for missing images

## File Organization

```
public/
└── team/
    ├── README.md          (This file)
    ├── hadia.jpg
    ├── kinza.jpg
    ├── maryam.jpg
    ├── sehrish.jpg
    └── abdullah.svg       (Placeholder - replace with .jpg)
```

## Maintenance Notes

- Check image quality on different screen sizes
- Verify all images load correctly in production
- Monitor image file sizes for performance impact
- Update images annually for freshness

## Questions or Issues

If you encounter issues with image loading or placement, check:
1. File exists in correct directory
2. Filename matches reference in code
3. File permissions allow read access
4. Image format is supported (JPG, PNG, SVG)
5. Browser cache is cleared for testing

---

**Part of the ChronoAI project team assets**

*Professional team representation for intelligent event scheduling*