# Search

This repository contains the front-end code that generates the UI and connects to the middle and backend.

## Getting Started

### 1. Clone Search

```sh
$ git clone https://github.com/mlibrary/search.git
```

### 2. Install

```sh
$ npm install
```

### 3. Run Locally

```sh
$ npm start
```

### Troubleshooting
If you load the site and it produces this error:

![Screen Shot 2022-03-30 at 3 06 10 PM](https://user-images.githubusercontent.com/27687379/160911686-77086207-4c6c-4b0a-92fc-757ebebb2005.png)

#### 1. Stop the browser view (`Ctrl + C`)

#### 2. Navigate to the `pride` dependency

```sh
$ cd node_modules/pride
```

#### 3. Edit `pride.js`

```sh
$ nano pride.js
```
#### 4. Replace all instances of `_underscore._.` with `_underscore.` and save.

#### 5. Install `pride`

```sh
$ npm install
```

#### 6. Go back and rerun the app

```sh
$ cd ../../ && npm start
```

## CSS

Style using [Emotion's CSS object styles](https://emotion.sh/docs/css-prop#object-styles). To see examples look to the ResourceAccess or Metadata modules and related components.

We no longer write new Sass for this project.

## Local Development

Local development will only work if you have access to the UMich network. This is a requirment for communicating with the backend service (Spectrum).

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This will explain why you are seeing a lack of configuration (babel, webpack...) since Create React App is for "creating React apps with no build configuration".
