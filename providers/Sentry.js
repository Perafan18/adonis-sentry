'use strict'

const { ServiceProvider } = require('@adonisjs/fold')
const Sentry = require('@sentry/node')

class SentryProvider extends ServiceProvider {
  _registerSentry () {
    this.app.singleton('Adonis/Src/Sentry', (app) => {
      const Config = app.use('Adonis/Src/Config')
      const options = Config.get('sentry.options', {})

      Sentry.init({
        dsn: Config.get('sentry.dsn'),
        environment: Config.get('sentry.environment'),
        ...options
      })

      return Sentry
    })

    this.app.alias('Adonis/Src/Sentry', 'Sentry')
  }
  /**
   * Registers providers for all the migration related
   * commands
   *
   * @method _registerCommands
   *
   * @return {void}
   */
  _registerCommands () {
    this.app.bind('Adonis/Commands/SentryTestCommand', () => require('../commands/TestCommand'))
  }

  /**
   * Register all the required providers
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this._registerSentry()
    this._registerCommands()
  }
  /**
   * On boot add command with ace
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const ace = require('@adonisjs/ace')
    ace.addCommand('Adonis/Commands/SentryTestCommand')
  }
}

module.exports = SentryProvider
