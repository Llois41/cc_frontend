FROM node:latest
COPY . /public
RUN cd /public; npm i
WORKDIR /public
ENTRYPOINT npm run open