FROM caddy:alpine
COPY site /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile
