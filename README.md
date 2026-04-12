# Resume

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Contact API

The Vercel contact endpoint lives at `/api/contact`.

For direct email delivery, configure one of these environment variable sets:

- `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`

Optional variables:

- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `CONTACT_CC_EMAIL`
- `FIREBASE_WEB_API_KEY`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CONFIG_KEY`

If SMTP delivery is unavailable, the endpoint now falls back to queueing the contact payload into Firestore so the existing Firebase trigger can continue mail delivery.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
