FROM node:26.10.0@sha256:a723b54c35a76e947095a20a67d39585bb09c862e6b1adeb8a9f518f95e34fb0
RUN mkdir -p /app/build
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm install && npm cache clean --force

COPY . /app

ARG BASE_URL=http://localhost:3000

ENV REACT_APP_LOGIN_BASE_URL=${BASE_URL} \
    REACT_APP_SPECTRUM_BASE_URL=${BASE_URL}/spectrum

CMD ["npm", "run", "start"]
