# react-redux-rr4-wp2-rhl3

## Overview

This is a starter kit that lets you build modern web SPAs and microsites
with a great development experience and best practices.

### Latest and greatest

This starter kit gives you all the goodness of

- react v15
- react-router v4
- redux v3
- immutable.js v3
- rxjs v5
- webpack v2
- react-hot-loader v3

and GraphQL

### UX Components and Themes

It comes with a growing set of UX components that are build from the ground up with
a common theme structure.
This allows you to start right away without worrying about finding and integrating
another UX Framework.

Goal is to provide a comprehensive set of UX components that support multiple themes
and can be used independently. Once this is achieved these components will be moved
out of this repo into their own UX components repo and npm package.

### Project layout

#### Components

- The components folder should only contain pure components.
- Move components that can be reused across multiple projects out into their own npm packages.

#### Containers

- The containers folder should contain all your state aware components.
- Containers usually are pages and complex panels.

##### Container layout

- `actions` should contain all actions and action creators specific to the container.
- `epic` should contain all the epics specific to the container.
- `reducer` should contain the reducer specific to the container.

### GraphQL

We integrated an example on how to combine `GraphQL` and `redux`. Basically it normalized
the `GraphQL` response which is then merged by the entity reducers.

We also added `npm run graphql` to query the `GraphQL` schema and generate the entity reducers
automatically.

### Shrinkwrap

Whenever you have changed dependencies you should run `npm shrinkwrap --also=dev` to lock
the versions of your dependencies for other developers and the production build.

#### Issues

You might run into an issue that `npm shrinkwrap --also=dev` fails and complains about
unmet peer dependencies.
This usually happens if you upgraded a package to a newer version but some other packages
specify an older version as peer dependency.
To fix this, first make sure the newer version is actually still compatible with those other packages
and your app is still working.
Then manually change the peer dependencies of the packages that complain to the newer version.
Now you should be able to run `npm shrinkwrap --also=dev`.

### What's next

- We will grow the UX components until we find that they are ready to go into their own repo.
- We will add another build script that will build multiple themes at once.
- We will improve the GraphQL usage example.
- We will implement the server side rendering feature.

### Contribution

You are very welcome. Please fork, make PRs and report issues and become a contributor.
