'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Sentry = require('@sentry/node')

class SentryProvider extends ServiceProvider {
  register () {
    const Config = this.app.use('Adonis/Src/Config')
    this.app.singleton('Sentry', () => {
      const sentryDsn = Config.get('sentry.dsn')
      const environment = Config.get('sentry.environment')
      const options = Config.get('sentry.options', {})
      Sentry.init({
        dsn: sentryDsn,
        environment,
        ...options
       })
      return Sentry
    })
  }
}

module.exports = SentryProvider
