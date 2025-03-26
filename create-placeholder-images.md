# Creating Placeholder Images for the Website

The Global Development Research Portal requires several placeholder images to represent different topics. These images should be accessible, properly sized, and relevant to the content they represent.

## Required Placeholder Images

The following placeholder images should be created and placed in the `public/img/` directory:

1. **favicon.ico** - Website icon (32x32px)
2. **energy-placeholder.jpg** - Representing magnetic energy generation (300x200px)
3. **water-placeholder.jpg** - Representing water purification systems (300x200px) 
4. **agriculture-placeholder.jpg** - Representing sustainable agriculture (300x200px)
5. **featured-blog-placeholder.jpg** - For featured blog posts (600x400px)
6. **blog-water-placeholder.jpg** - Water filtration blog image (300x200px)
7. **blog-agriculture-placeholder.jpg** - Sustainable farming blog image (300x200px)
8. **blog-education-placeholder.jpg** - Education technology blog image (300x200px)
9. **blog-energy-placeholder.jpg** - Energy solutions blog image (300x200px)
10. **magnetic-energy-placeholder.jpg** - For research page on magnetic energy (300x200px)
11. **solar-energy-placeholder.jpg** - For research page on solar energy (300x200px)
12. **water-filtration-placeholder.jpg** - For research page on water filtration (300x200px)
13. **rainwater-collection-placeholder.jpg** - For research page on rainwater collection (300x200px)
14. **drought-resistant-placeholder.jpg** - For research page on drought resistant farming (300x200px)
15. **soil-regeneration-placeholder.jpg** - For research page on soil regeneration methods (300x200px)

## Image Requirements

All placeholder images should:

1. **Be properly sized** - Images should be sized correctly to prevent unnecessary downloads or scaling
2. **Include alt text** - All `<img>` tags in HTML already include descriptive alt text
3. **Be optimized** - Images should be compressed for fast loading
4. **Be accessible** - Sufficient contrast for any text overlaid on images
5. **Be relevant** - Images should clearly represent the topic they're associated with

## Creating Placeholder Images

For development purposes, you can use one of these approaches:

### Option 1: Use online placeholder services

```html
<!-- Example of using a placeholder service -->
<img src="https://placeholder.pics/svg/300x200/2E7D32/FFFFFF/Sustainable%20Agriculture" alt="Sustainable Agriculture">
```

### Option 2: Create simple colored rectangles with text

```css
/* CSS for placeholder images */
.placeholder-image {
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  width: 100%;
  height: 100%;
}
```

```html
<!-- HTML for placeholder image -->
<div class="placeholder-image" style="height: 200px;">
  Solar Energy Solutions
</div>
```

### Option 3: Use free stock photos

For a more professional look, use free stock photos from sites like:
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)

Ensure you download the correct sizes and optimize the images before using them.

## Implementation Notes

1. All image paths in HTML files are currently set to the correct locations in the `public/img/` directory
2. The CSS already includes proper styling for responsive images
3. When replacing placeholders with real images, maintain the same file names or update all references in HTML files

## Accessibility Reminders

- All images must include descriptive alt text
- Decorative images should use empty alt attributes (`alt=""`)
- Complex images should have detailed descriptions
- Maintain sufficient color contrast
- Avoid text as part of images when possible 