FROM node:14.17-alpine
ARG PROJECT=ui
ENV PROJECT ${PROJECT}

RUN apk update && apk upgrade && \
    apk add --no-cache \
    bash \
    git \
    python \
    make \
    g++

WORKDIR /app
COPY . .

RUN rm -rf node_modules
RUN npm install @angular/cli@12.1.0 -g

RUN npm install

RUN npm run build:common
RUN npm run build:$PROJECT

RUN ng config -g cli.warnings.versionMismatch false
RUN rm -rf .npmrc
EXPOSE 8080
CMD npm run start:${PROJECT}
