# 2J Blog Site

Static website configured for deployment on Railway with Nginx.

## Project Structure

- `index.html` - Homepage
- `blog.html` - Blog listing page
- `research.html` - Research page
- `login.html` - Login page
- `signup.html` - Registration page
- `accessibility.html` - Accessibility information
- `public/` - Static assets (CSS, JS, images)
- `data/` - Data files for the site

## Deployment on Railway

This site is configured to be deployed on Railway using Nginx:

1. Push your code to a Git repository
2. Connect the repository to Railway
3. Railway will automatically build and deploy the site using the included Dockerfile

## Local Development

To run this site locally:

1. Clone the repository
2. You can serve the static files using any local server, e.g.:
   - Using Python: `python -m http.server`
   - Using Node.js: Install `http-server` via npm and run `http-server`

## Nginx Configuration

The site uses a custom Nginx configuration (see `nginx.conf`) that:
- Sets up proper caching for static assets
- Configures security headers
- Ensures proper routing

## Docker Setup

The included Dockerfile:
- Uses Nginx Alpine as the base image
- Copies the static files to the appropriate Nginx directory
- Sets up the Nginx configuration
- Configures permissions for security
- Dynamically sets the port based on Railway's environment 