FROM nginx

RUN apt-get update && \
    apt-get install nginx

COPY dist /usr/share/nginx/html
