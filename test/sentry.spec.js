'use strict'

require('dotenv').load()
const test = require('japa')
const Raven = require('raven')

test.group('Raven', () => {
  test('configure and throw exception', async (assert) => {
    const sentryDns = process.env.SENTRY_DNS
    Raven.config(sentryDns).install()
    let name = 'adonis'
    try {
      name = 'Pedro Perafán'

      if (name === 'Pedro Perafán') {
        throw new Error('Wrong! your name cannot be Pedro Perafán')
      }

      console.log(`My name is ${name}`)
    } catch (error) {
      Raven.captureException(error)
      name = 'Adonis Framework'
      console.log('An exeption was thrown, go to sentry.io')
    }
    assert.equal(name, 'Adonis Framework')
  })
})
