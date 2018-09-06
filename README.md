# E2E testing a Vue app with Cypress

This is an example repo on how to build clean e2e tests with Cypress.

I am using Vue CLI 3 to bootstrap a generic Vue app. For an API we are using [json-server](https://github.com/typicode/json-server).

## Installation
Install the deps

`npm install`

You need to start the API in a separate command prompt.

`npm run server` 
 
Then you are ready to run the app or run tests.

### Running the app

`npm run serve`

### Running tests
You have essentially 2 options each with 2 variants. 

Run the e2e tests in headless mode or in GUI mode. 

Headless mode opens a browser behind the scenes
and outputs the results in the terminal.

GUI mode opens the nice Cypress GUI and is more suited while developing e2e tests.

Each can run their own webpack dev server or use the one that is already started by you.

#### Headless mode
`npm run test:e2e -- --headless` - this starts e2e tests and runs its own dev server

`npm run tests:e2e -- --headless --url http://locahost:8080` - this runs e2e tests on the provided url

#### GUI Mode
`npm run test:e2e` - opens the Cypress GUI and runs its own dev server

`npm run tests:e2e -- --url http://locahost:8080` - opens the Cypress GUI pointing to the provided url


**Author:** Dobromir Hristov
