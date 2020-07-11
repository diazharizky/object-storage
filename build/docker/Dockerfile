##############
# BASE IMAGE #
##############
FROM node:12.9.1-alpine as base

# install build-tools
RUN apk add --no-cache git build-base python bash

# install nodemon
RUN npm install -g nodemon

#################
# BUILDER IMAGE #
#################
FROM node:12.9.1-alpine as builder

# install build-tools
RUN apk add --no-cache git build-base python bash

# install nodemon
RUN npm install -g nodemon

# update npm
RUN npm install -g npm@latest

# copy whole source code and executablize it
WORKDIR /src/app
COPY . .
RUN npm install
RUN NEXE_PLATFORM=alpine npm run pkg

###############
# FINAL IMAGE #
###############
FROM alpine:latest

RUN \
    apk update &&\
    apk add --no-cache libstdc++ libgcc su-exec

# copy config folder
ENV NODE_CONFIG_DIR /etc/object-storage
COPY ./config ${NODE_CONFIG_DIR}

# copy the compiled one
COPY --from=builder /src/app/.bin/object-storage /usr/local/bin/object-storage

ENTRYPOINT [ "/usr/local/bin/object-storage" ]
