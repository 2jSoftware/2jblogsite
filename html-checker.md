# HTML Accessibility and Standards Checker

This document provides guidelines and tools for checking our HTML files to ensure they meet accessibility standards and follow best practices.

## Key Accessibility Checks

### Semantic Structure

- [ ] Use proper HTML5 semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`, etc.)
- [ ] Ensure logical heading hierarchy (h1 → h2 → h3, etc.)
- [ ] Include landmark roles (`role="banner"`, `role="navigation"`, `role="main"`, etc.)
- [ ] Use `<main>` element to contain the primary content
- [ ] Ensure all interactive elements are within the proper semantics

### Text Alternatives

- [ ] All `<img>` elements have appropriate `alt` attributes
- [ ] Decorative images use empty `alt=""` attributes
- [ ] Complex images have detailed descriptions
- [ ] Icon fonts or SVGs have proper text alternatives
- [ ] `<figure>` elements use `<figcaption>` where appropriate

### Keyboard Accessibility

- [ ] All interactive elements are keyboard accessible
- [ ] Focus styles are visible and well-defined
- [ ] Skip links are provided for navigation
- [ ] Focus order is logical
- [ ] Custom components have proper ARIA roles and keyboard support

### Form Accessibility

- [ ] All form controls have associated `<label>` elements
- [ ] Required fields are indicated both visually and programmatically
- [ ] Form validation errors are associated with their fields
- [ ] Form elements have proper `autocomplete` attributes
- [ ] Buttons have descriptive text

### ARIA Usage

- [ ] ARIA attributes are used appropriately and only when necessary
- [ ] Live regions are used for dynamic content updates
- [ ] Modal dialogs use proper ARIA roles and attributes
- [ ] ARIA expanded states are used for menus and accordions
- [ ] ARIA hidden is used appropriately to hide content from screen readers

### Color and Contrast

- [ ] Text has sufficient contrast with its background (4.5:1 for normal text, 3:1 for large text)
- [ ] Color is not the only means of conveying information
- [ ] Focus indicators have sufficient contrast
- [ ] UI components and graphics have sufficient contrast (3:1)

## Tools for Testing

### Online Validators

1. **W3C HTML Validator**: https://validator.w3.org/
   - Checks HTML for standards compliance and syntax errors

2. **WAVE Accessibility Evaluation Tool**: https://wave.webaim.org/
   - Provides comprehensive accessibility analysis

3. **Axe DevTools**: https://www.deque.com/axe/
   - Browser extension for accessibility testing

4. **Lighthouse in Chrome DevTools**:
   - Includes accessibility audits as part of its testing suite

### Command Line Tools

Run these commands to check our HTML files automatically:

```bash
# Install HTML validator
npm install -g html-validator-cli

# Check a specific file
html-validator --file=index.html

# Check all HTML files
html-validator --file=*.html
```

```bash
# Install pa11y for accessibility checking
npm install -g pa11y

# Check a specific file
pa11y index.html

# Generate a report
pa11y index.html --reporter html > accessibility-report.html
```

## Manual Testing Checklist

### Keyboard Navigation Test

1. Starting from the top of the page, press Tab to navigate through all interactive elements
2. Ensure focus is visible at all times
3. Check that all interactive elements can be activated with Enter/Space
4. Make sure dropdown menus are accessible with arrow keys
5. Verify that modal dialogs trap focus appropriately

### Screen Reader Test

Test with at least one of these screen readers:

- **NVDA** (Windows, free): https://www.nvaccess.org/
- **VoiceOver** (Mac, built-in): Activate with Cmd+F5
- **JAWS** (Windows, commercial): https://www.freedomscientific.com/products/software/jaws/
- **Narrator** (Windows, built-in)

Check that:
1. All important content is announced
2. Interactive elements have meaningful labels
3. Form fields have clear instructions
4. Error messages are announced
5. Dynamic content updates are announced

## Accessibility Statement Template

An accessibility statement is recommended for the site. Here's a template:

```html
<h1>Accessibility Statement</h1>

<p>The Global Development Research Portal is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.</p>

<h2>Conformance status</h2>

<p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. The Global Development Research Portal is striving to conform to WCAG 2.1 level AA.</p>

<h2>Feedback</h2>

<p>We welcome your feedback on the accessibility of the Global Development Research Portal. Please let us know if you encounter accessibility barriers:</p>

<ul>
    <li>Email: <a href="mailto:accessibility@devresearchportal.org">accessibility@devresearchportal.org</a></li>
</ul>

<p>We try to respond to feedback within 5 business days.</p>
```

## Implementation Priority

1. Fix any critical issues that prevent users from accessing core functionality
2. Address keyboard navigation issues
3. Correct semantic structure problems
4. Fix form accessibility issues
5. Improve text alternatives for images
6. Address color contrast issues
7. Enhance ARIA usage where needed

## Resources

- [WebAIM's WCAG 2 Checklist](https://webaim.org/standards/wcag/checklist)
- [The A11Y Project](https://www.a11yproject.com/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [W3C Web Accessibility Initiative](https://www.w3.org/WAI/) 