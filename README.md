# 2jSoftware Website

A minimalist static website for 2jSoftware - a Cleveland-based software engineering and AI/ML solutions provider.

## Features

- Extreme minimalism with clean design and strategic whitespace
- Performance-optimized for fast loading (<3s)
- Mobile-first responsive design
- Railway deployment ready
- Modern design elements with subtle animations
- Semantic HTML5 structure for better accessibility and SEO

## Project Structure

```
project-root/
├── Dockerfile           # Configuration for Caddy
├── Caddyfile            # Caddy server configuration
├── site/                # Main directory that Railway will serve
│   ├── index.html       # Main HTML file
│   ├── css/             # CSS directory
│   │   └── style.css    # Main stylesheet
│   ├── js/              # JavaScript directory
│   │   └── main.js      # Main JavaScript file
│   └── assets/          # Images and other static assets
│       ├── images/      # Image files
│       └── icons/       # Icon files
└── README.md            # Project documentation
```

## Deployment Instructions

### Railway Deployment

1. Push this code to a GitHub repository
2. Log into Railway (https://railway.app/)
3. Create a new project from your GitHub repository
4. Railway will automatically detect the Dockerfile and deploy the site
5. Access the site via the provided Railway domain
6. (Optional) Configure a custom domain through Railway's settings

### Local Development

To run this project locally:

1. Install Docker on your system
2. Clone this repository
3. In the project directory, run:
   ```
   docker build -t 2jsoftware-site .
   docker run -p 80:80 2jsoftware-site
   ```
4. Visit http://localhost in your browser

## Customization

- Colors: Edit the CSS variables in `site/css/style.css`
- Content: Update the text and sections in `site/index.html`
- Images: Add your own images to `site/assets/images/`
- Icons: Add custom icons to `site/assets/icons/`

## Technical Details

- Built with pure HTML, CSS, and minimal vanilla JavaScript
- No external libraries or frameworks
- Optimized for Core Web Vitals
- Caddy server for automatic HTTPS
