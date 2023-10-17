FROM node:14.18-alpine
ARG arg
RUN apk update && apk upgrade && \
    apk add --no-cache \
    bash \
    git \
    python3 \
    make \
    g++


COPY . .
RUN rm -rf node_modules
RUN npm install
RUN rm -rf .npmrc
EXPOSE 8080
CMD [ "npm","run","start"]
