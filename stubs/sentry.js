'use strict'

const Env = use('Env')

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
  dns: Env.get('SENTRY_DNS'),
  environment: Env.get('SENTRY_ENVIRONMENT')

}
