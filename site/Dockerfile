FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy only the necessary static website files to the Nginx server
COPY *.html ./
COPY public ./public
COPY data ./data
COPY research ./research

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Make sure all files belong to nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE $PORT

# Start Nginx server with dynamic port substitution
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;' 