# adonis-sentry

Sentry provider for AdonisJS

[![npm version](https://badge.fury.io/js/adonis-sentry.svg)](https://badge.fury.io/js/adonis-sentry)
[![Build status](https://ci.appveyor.com/api/projects/status/sq2dbol6yxbjvkmn/branch/master?svg=true)](https://ci.appveyor.com/project/Perafan18/adonis-sentry/branch/master)
[![GitHub license](https://img.shields.io/github/license/Perafan18/adonis-sentry.svg)](https://github.com/Perafan18/adonis-sentry/blob/master/LICENSE)


## Install

```bash
adonis install adonis-raven
```

You need to add the provider to AdonisJS at `start/app.js`:

```javascript
const providers = [
   ...
   'adonis-sentry/providers/Sentry',
];
```

and in your `.env` file

```bash
SENTRY_DNS=
```

then you can use it as

```javascript
const sentry = use('Sentry')
```

if you want to catch all the exceptions of your adonis project you must create an exception handler

```bash
adonis make:ehandler
```

and we need add sentry notify in `app/Exceptions/Handler.js`

```javascript
'use strict'

const sentry = use('Sentry')

class ExceptionHandler {

  ...

  async report (error, { request }) {
    sentry.captureException(error)
  }
}

module.exports = ExceptionHandler

```

## Official documentation for Node.js apps

https://docs.sentry.io/clients/node/

## Issues & PR

It is always helpful if we try to follow certain practices when creating issues or PR's, since it will save everyone's time.

1. Always try creating regression tests when you find a bug (if possible).
2. Share some context on what you are trying to do, with enough code to reproduce the issue.
3. For general questions, please create a forum thread.
4. When creating a PR for a feature, make sure to create a parallel PR for docs too.

## License

Adonis Sentry is open-sourced software licensed under the MIT license.
