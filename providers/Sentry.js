'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const raven = require('raven')

class SentryProvider extends ServiceProvider {
  register () {
    const Config = this.app.use('Adonis/Src/Config')
    this.app.singleton('Sentry', () => {
      const sentryDns = Config.get('raven.dns')
      raven.config(sentryDns).install()
      return raven
    })
  }
}

module.exports = SentryProvider
