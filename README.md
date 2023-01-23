# Search

This repository contains the front-end code that generates the UI and connects to the middle and backend.

## Getting Started

### 1. Clone Search

```bash
git clone https://github.com/mlibrary/search.git
```

### 2. Install

```bash
npm install --legacy-peer-deps
```

### 3. Run Locally

```bash
npm start
```

### Troubleshooting
#### TypeError: Cannot read properties of undefined (reading 'isFunction')
If you load the site and it produces this error:

![Screen Shot 2022-03-30 at 3 06 10 PM](https://user-images.githubusercontent.com/27687379/160911686-77086207-4c6c-4b0a-92fc-757ebebb2005.png)

##### 1. Stop the browser view (`Ctrl + C`)

##### 2. Navigate to the `pride` dependency

```bash
cd node_modules/pride
```

##### 3. Edit `pride.js`

```bash
nano pride.js
```
##### 4. Replace all instances of `_underscore._.` with `_underscore.` and save.

##### 5. Install `pride`

```bash
npm install
```

##### 6. Go back and rerun the app

```bash
cd ../../ && npm start
```

#### ERR_OSSL_EVP_UNSUPPORTED
If you run `npm start` and receive this error:
```bash
Error: error:0308010C:digital envelope routines::unsupported
 opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
```

##### 1. Check current version of Node

```bash
node --version
```

If the version of Node is higher than `17`, follow the next step.

##### 2. Export NODE_OPTIONS

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

##### 3. Run the app

```bash
npm start
```

## CSS

Style using [Emotion's CSS object styles](https://emotion.sh/docs/css-prop#object-styles). To see examples look to the ResourceAccess or Metadata modules and related components.

We no longer write new Sass for this project.

## Local Development

Local development will only work if you have access to the UMich network. This is a requirment for communicating with the backend service (Spectrum).

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). This will explain why you are seeing a lack of configuration (babel, webpack...) since Create React App is for "creating React apps with no build configuration".
