FROM node:26.13.0@sha256:6d2c7d5d074bf72f81ddc252b4fbb5d625bc028eeda49cb4b8c2ff8eda1ee617
RUN mkdir -p /app/build
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm install && npm cache clean --force

COPY . /app

ARG BASE_URL=http://localhost:3000

ENV REACT_APP_LOGIN_BASE_URL=${BASE_URL} \
    REACT_APP_SPECTRUM_BASE_URL=${BASE_URL}/spectrum

CMD ["npm", "run", "start"]
