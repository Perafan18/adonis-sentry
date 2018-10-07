'use strict'

require('dotenv').load()
const test = require('japa')
const Sentry = require('@sentry/node')

test.group('Sentry', () => {
  test('configure and throw exception', async (assert) => {
    const sentryDns = process.env.SENTRY_DNS
    Sentry.init({ dsn: sentryDns })
    let name = 'adonis'
    try {
      name = 'Pedro Perafán'

      if (name === 'Pedro Perafán') {
        throw new Error('Wrong! your name cannot be Pedro Perafán')
      }

      console.log(`My name is ${name}`)
    } catch (error) {
      Sentry.captureException(error)
      name = 'Adonis Framework'
      console.log('An exeption was thrown, go to sentry.io')
    }
    assert.equal(name, 'Adonis Framework')
  })
})
