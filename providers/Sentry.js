'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Sentry = require('@sentry/node')

class SentryProvider extends ServiceProvider {
  register () {
    const Config = this.app.use('Adonis/Src/Config')
    this.app.singleton('Sentry', () => {
      const sentryDns = Config.get('sentry.dns')
      const environment = Config.get('sentry.environment')
      Sentry.init({ 
        dsn: sentryDns,
        environment
       })
      return Sentry
    })
  }
}

module.exports = SentryProvider
