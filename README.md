# Search

A work in progress single page app for new search. This repository contains the front-end code that generates the UI and connects to the middle and backend.

## Getting Started

###1. Clone Search
```sh
$ git clone https://github.com/mlibrary/search.git
```

###2. Install
```sh
$ npm install
```

You'll need `npm` for this.

- https://docs.npmjs.com/getting-started/installing-node

###3. Run Locally
```sh
$ npm start
```

## CSS
Enter the stylesheets directory and run Gulp. See [Falafel repo](https://github.com/mlibrary/falafel) for more setup instructions.
```sh
$ gulp
```

## Building for production

```sh
$ npm run build
```

These files will be created in the `build` directory.

## Config

This codebase expects to have access to the UMich network so it can make requests locally over HTTP to the Spectrum (the backend) in development mode. If you have the credentials, the UMich VPN is helpful when off campus. [Instructions fo rgetting started with the UMich VPN](http://its.umich.edu/enterprise/wifi-networks/vpn/getting-started).

## Contact
Email Jon Earley at earleyj@umich.edu if you have any questions.


## Create React App
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
