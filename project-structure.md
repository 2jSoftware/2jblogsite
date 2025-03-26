# Global Development Research Portal - Project Structure

## Overview

This document outlines the organization and structure of the Global Development Research Portal website, a platform for sharing sustainable development research, connecting global collaborators, and providing practical implementation guides.

## Directory Structure

```
REACTORWEBSITE/
├── index.html                    # Main landing page
├── research.html                 # Research topics and resources
├── blog.html                     # Blog listing page
├── login.html                    # User login page
├── signup.html                   # User registration page
├── focused-readme.md             # Project overview and vision document
├── project-structure.md          # This file - project organization
├── public/                       # Public assets
│   ├── css/                      # Stylesheets
│   │   └── styles.css            # Main stylesheet for the site
│   ├── js/                       # JavaScript files
│   │   └── main.js               # Main JavaScript functionality
│   └── img/                      # Image assets (placeholders currently)
├── src/                          # Source files for development
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page templates
│   └── utils/                    # Utility functions
└── data/                         # Data storage
    ├── blog/                     # Blog content
    └── research/                 # Research documents and resources
```

## Page Structure

### Core Pages

1. **Home (`index.html`)**
   - Landing page with featured research topics and recent blog posts
   - Community statistics and mission statement
   - Call-to-action for signing up

2. **Research (`research.html`)**
   - Categorized research topics (energy, water, agriculture, etc.)
   - Implementation guides at different complexity levels
   - Downloadable resources

3. **Blog (`blog.html`)**
   - Featured blog post
   - Recent posts listing
   - Category filtering and search functionality
   - Interface for submitting new blog posts (for logged-in users)

4. **Sign Up (`signup.html`)**
   - Registration form for new users
   - Fields for personal information and areas of interest
   - Terms of service agreement

5. **Login (`login.html`)**
   - Login form for existing users
   - Password recovery option

### Planned Additional Pages

1. **Forum** (to be developed)
   - Discussion boards categorized by topic
   - Question and answer functionality
   - User profiles and reputation system

2. **About** (to be developed)
   - Mission and vision
   - Team information
   - Partner organizations

3. **Individual Research Pages** (to be developed)
   - Detailed content for each research topic
   - Implementation guides with step-by-step instructions
   - Downloadable resources specific to the topic

4. **Individual Blog Posts** (to be developed)
   - Full content of each blog post
   - Author information
   - Comments section
   - Related posts

## Technology Stack

The current MVP is built with:

- HTML5 for structure
- CSS3 for styling (with CSS variables for theming)
- Vanilla JavaScript for interactivity

Future development may incorporate:

- A frontend framework (React, Vue, etc.) for more dynamic functionality
- A backend system for user authentication and content management
- A database for storing user data and content

## Responsive Design

The website is designed with a mobile-first approach, ensuring functionality across:

- Mobile phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large displays (1200px+)

## Future Development Roadmap

1. **Phase 1: MVP** (Current)
   - Basic HTML/CSS/JS implementation
   - Core page templates
   - Responsive design

2. **Phase 2: Enhanced Functionality**
   - User authentication system
   - Database integration
   - Blog post submission system
   - Forum implementation

3. **Phase 3: Content Expansion**
   - Detailed research content
   - Case studies
   - Video tutorials
   - Interactive demonstrations

4. **Phase 4: Community Features**
   - User profiles
   - Direct messaging
   - Project collaboration tools
   - Implementation tracking

## Contributing

For future contributors, please follow these guidelines:

1. Maintain the established design system (colors, typography, component styles)
2. Ensure all pages remain responsive across device sizes
3. Keep accessibility in mind (proper contrast, semantic HTML, etc.)
4. Add appropriate documentation for new features

## License

[To be determined] 