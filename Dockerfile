FROM node:latest
COPY . /public
RUN cd /public ;npm i http-server -g
ENTRYPOINT exec http-server