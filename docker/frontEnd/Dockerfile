# steps
# base image (ubuntu 20.04)
# nodejs 14
#

FROM node:14.16.1

ENV NODE_ENV=development

# standard app directory
RUN apt update && mkdir -p /usr/src/app

# bakes bash script into the image (want as little as possible for filesize)
COPY ./init.sh /usr/src

WORKDIR /usr/src/app

# runs bash script
# unlike ENTRYPOINT, this will add build directory to the docker image
# ENTRYPOINT made it part of container(!)
# extra space is negated by the following stage
RUN chmod +x ../init.sh && /bin/bash ../init.sh


#### Start next stage
# Run the nginx image, tell it to serve the build folder from stage 0 (above)

#:latest assumed
FROM nginx

WORKDIR /var/www/html

COPY --from=0 /usr/src/app/asana_task_repeater_frontend/build .
# including filename in copy path overwrites
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# CMD also works but ENTRYPOINT makes sure it works
ENTRYPOINT ["nginx","-g","daemon off;"]
