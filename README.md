# Express and Webpack Boilerplate

Bare-bones Express and Webpack boilerplate with ES6+ babel transpilation enabled.

Has two build modes: Development and Production.

When you run `npm run buildDev`, Javascript, HTML, and CSS files are unminified and not uglified, meaning that you can easily inspect them in Chrome Dev Tools. Hot Module Reloading is enabled via `webpack-dev-middleware`.

When you run `npm run buildProd`, Javascript, HTML, and CSS files are all minified and uglified, and images are encoded as Base64 directly into your CSS file, which results in less calls to the server for image files.

## Installation & Usage

    npm clone ...

    cd ...

    npm install

    npm run buildDev        // for development
        // OR
    npm run buildProd

    npm start               // navigate to localhost:8080 for local dev
