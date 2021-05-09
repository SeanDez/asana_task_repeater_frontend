# steps
# base image (ubuntu 20.04)
# nodejs 14
#

FROM node:14.16.1

ENV NODE_ENV=production

# standard app directory
RUN apt update && mkdir -p /usr/src/app

# bakes bash script into the image (want as little as possible for filesize)
COPY ./init.sh /usr/src

WORKDIR /usr/src/app

# runs bash script
# copies git repo to docker image
RUN chmod +x ../init.sh
ENTRYPOINT ["../init.sh"]

EXPOSE 3000 80
