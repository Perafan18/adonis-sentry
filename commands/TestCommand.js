'use strict'

const { Command } = require('@adonisjs/ace')

class TestCommand extends Command {
  constructor (Sentry) {
    super()
    this.sentry = Sentry
  }

  static get inject () {
    return ['Adonis/Src/Sentry']
  }

  static get signature () {
    return 'sentry:test'
  }

  static get description () {
    return 'Generate a test event and send it to Sentry'
  }

  async handle () {
    try {
      throw new Error('This is a test exception sent from the Sentry Adonis.')
    } catch (error) {
      this.sentry.captureException(error)

      let lastEventId = this.sentry.lastEventId()

      if (!lastEventId) {
        this.error(`There was an error sending the test event.`)
        this.error(`Please check if you DSN is set properly in your config or '.env' as 'SENTRY_ENVIRONMENT'.`)
      } else {
        return this.viaAce ? this.info(`Event sent with ID: ${lastEventId}`) : 'Event sent'
      }
    }
  }
}

module.exports = TestCommand
