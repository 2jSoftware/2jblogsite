# Cursorrules: Guidelines for High Quality, Accessible, and Stylish Code

## Code Quality Standards
- Use semantic and well-structured HTML to clearly define content hierarchy, leveraging elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>`.
- Write clean, modular, and maintainable CSS. Consider using naming conventions like BEM where applicable.
- Avoid inline styles; keep styling definitions within external CSS files.
- Utilize CSS variables for consistent theming across the site.
- Write modular and event-driven JavaScript with a clear separation between logic and presentation.
- Follow consistent indentation and code formatting rules across HTML, CSS, and JS files.
- Include descriptive comments and documentation where necessary to improve maintainability.

## Website Accessibility Guidelines
- Ensure all images include a descriptive `alt` attribute for screen readers.
- Maintain sufficient color contrast between text and background; use accessible color palettes.
- Use semantic HTML elements to aid accessibility (e.g., correct heading levels and landmarks).
- Apply ARIA roles and attributes when necessary to improve usability for assistive technologies.
- Design forms with proper associations between `<label>` elements and their corresponding inputs.
- Ensure that interactive elements, such as buttons and links, are keyboard navigable and include visible focus styles.
- Regularly test the site with accessibility evaluation tools (e.g., Lighthouse, aXe).

## Styling and Responsive Design Standards
- Adopt a mobile-first design approach; ensure layouts are responsive and function well on all devices.
- Utilize modern CSS layout techniques like Flexbox and CSS Grid for dynamic and adaptive layouts.
- Use media queries to adjust styling for various breakpoints (mobile, tablet, desktop).
- Keep typography, spacing, and sizes consistent throughout the website.
- Minimize CSS bloat by keeping styles lean and modular; consider using or referencing established style guides.

## Build and Review Process
- Perform regular code reviews to ensure adherence to these guidelines.
- Utilize automated linters and formatters for HTML, CSS, and JavaScript to enforce consistent code quality.
- Maintain clear and descriptive commit messages within version control.
- Integrate automated testing and continuous integration (CI) tools to catch issues early in the development process.

## Future Improvements
- Continuously update these guidelines as the project evolves and new best practices emerge.
- Explore additional accessibility tools and techniques as part of ongoing quality assurance.
- Consider integrating advanced CSS methodologies or frameworks to further enhance maintainability and scalability. 