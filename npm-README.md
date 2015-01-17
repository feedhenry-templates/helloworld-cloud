# NPM

This template uses various npm scripts to perform development and build tasks.

# Tasks

The following are a short overview of the scripts available for this App. You can get a full list of tasks npm with ```npm run```.

## start

Run ```npm start``` or ```npm run start``` to serve this App locally. By default this App will run on http://localhost:8001.

Note that 'npm start' supports live reload, i.e. it will monitor for file changes (which can be configured) and reloads the app.

## debug

Run ```npm run debug``` to debug this App locally. This task uses [Node Inspector](https://github.com/node-inspector/node-inspector) to debug your application, and will open the Debugger at 'application.js' in your browser. See the documentation for [Node Inspector](https://github.com/node-inspector/node-inspector) for more information on how to use Node Inspector.

## test

Run ```npm test``` or ```npm run test``` to run the unit and accept tests for this App.

## test coverage

This App uses [Istanbul](https://github.com/gotwarlost/istanbul) for generating code coverage for your tests.
Run ```npm run test-cov``` to run code coverage for this App.

## analysis

Run ```npm run analysis``` to get a static analysis report of your code. This task uses [Plato](https://github.com/es-analysis/plato) to generate the report. See the documentaion for [Plato](https://github.com/es-analysis/plato) for more information on how to use and configure Plato.

## Environment variables

The `start` and `debug` scripts set environment variables. To set your own environment variables, modify the appropriate script entry in package.jsone.g.

```
"start": "MY_ENV_VAR=some_value nodemon application.js"
```


