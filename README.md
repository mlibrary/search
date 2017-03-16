# Search

A work in progress single page app for new search. This repository contains the front-end code that generates the UI and connects to the middle and backend.

[View the early development beta website](https://earleyj-drupal8.www.lib.umich.edu)

## Getting Started

### 1. Clone Search
```sh
$ git clone https://github.com/mlibrary/search.git
```

### 2. Install
```sh
$ npm install
```

You'll need `npm` for this.

- https://docs.npmjs.com/getting-started/installing-node

### 3. Run Locally
```sh
$ npm start
```

## CSS
Enter the stylesheets directory and run Gulp. See [Falafel repo](https://github.com/mlibrary/falafel) for more setup instructions.
```sh
$ gulp
```

## Building for Production

```sh
$ npm run build
```

These files will be created in the `build` directory.

## Local Development

Local development will only work if you have access to the UMich network. This is a requirment for communicating with the backend service (Spectrum).

## Contact
Email Jon Earley at earleyj@umich.edu if you have any questions.

## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This will explain why you are seeing a lack of configuration (babel, webpack...) since Create React App is for "creating React apps with no build configuration".
