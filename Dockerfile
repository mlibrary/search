FROM node:25.8.2@sha256:ccfc02deb6abb1b70b6ef21d3d93b3f671c0de6f463ff331cf0ea0a28ad875c9
RUN mkdir -p /app/build
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm install && npm cache clean --force

COPY . /app

ARG BASE_URL=http://localhost:3000

ENV REACT_APP_LOGIN_BASE_URL=${BASE_URL} \
    REACT_APP_SPECTRUM_BASE_URL=${BASE_URL}/spectrum

CMD ["npm", "run", "start"]
