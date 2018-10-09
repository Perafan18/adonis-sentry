'use strict'

const Env = use('Env')

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
  dns: Env.get('SENTRY_DNS')
  enviroment: Env.get('SENTRY_ENVIROMENT')

}
