# Siirto Deeplink Generator

## development

    Just push to develop branch and Travis.ci shall automatically deploy
    ths site to <DOMAIN-NAME-TBD>

## frontend dev

    sudo npm install yarn
    yarn install
    yarn start

### Create new component

    yarn plop MyComponentName

### Run tests (via jest)

    yarn test

### Dev mode

To generate QR codes and deep links that target our dev environment just
add "dev=true" as a query string parameter. E.g. "http://example.com?dev=true"
