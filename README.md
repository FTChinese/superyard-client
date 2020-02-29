# SuperyardClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.1.

## Mocking API

A mocking API is provided in the `server` directory. This is a fully-fledged Koa-based app independent of the Angular app.

To run it,

```sh
cd server
npm install
npm run start
```

It is written in TypeScript and run directly with `ts-node`.

When using the mocking API, you can login with any username and password you like.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Template Inheritance

It seems Angular does not have the concept of template inheritance as the serve-side jinja2-linke template engines. I'm using nested `RouteOutlet` to acheive the same result. See this article [How to reuse common layouts in Angular using Router](https://medium.com/angular-in-depth/angular-routing-reusing-common-layout-for-pages-from-different-modules-440a23f86b57)

## Login Status Persistence

On server-side, you saves user account data in cookie (either via plain cookie or session data).
