'use strict'

const Env = use('Env')

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
  dsn: Env.get('SENTRY_DSN'),

  environment: Env.get('SENTRY_ENVIRONMENT'),
  options: {
    // captureUnhandledRejections: true
  }
}
