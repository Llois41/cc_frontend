FROM mhart/alpine-node:latest
COPY . /src
WORKDIR /src
RUN npm install
ENTRYPOINT exec node bin/www