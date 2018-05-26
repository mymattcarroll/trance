# Trace | Deployment

## Release Process

### Instructions

1.  After cloning the repository, checkout `master` branch

    ```
    git checkout master
    ```

1.  Ensure you have the latest version of code

    ```
    git pull
    ```

1.  Update the [Changelog](../CHANGELOG.md) by replacing `Unreleased` with `1.0.1 (YYYY-MM-DD)`

1.  Push changes to the `master` branch

    ```
    git add -A
    git commit -m "[RELEASE] 1.0.1"
    git push
    ```

1.  Follow the steps below for Travis CI or Manual Deployments

## Deployment

### Automated

1.  Commit to the `master` branch (or merge a Merge Request into the `master` branch) to trigger the build process for the Test environment

1.  Once Test can be promoted to Production, create a **Production Git Tag** to trigger the build and deployment process for the Production environment e.g. `1.0.1`

### Manual

#### Prerequisites

-   [Node 8](https://nodejs.org/en/download/)
-   [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

#### Instructions

Coming soon...
