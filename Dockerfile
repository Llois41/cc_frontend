FROM node:latest
COPY . /public
RUN cd /public; npm i http-server -g; npm i
ENTRYPOINT http-server