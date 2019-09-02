'use strict'

require('dotenv').load()
const test = require('japa')
const Sentry = require('@sentry/node')

test.group('Sentry', () => {
  test('configure and throw exception', async (assert) => {
    const sentryDsn = process.env.SENTRY_DSN
    Sentry.init({ dsn: sentryDsn })
    let name = 'adonis'
    const resultEventId = await new Promise(resolve => {
      try {
        name = 'Pedro Perafán'

        if (name === 'Pedro Perafán') {
          throw new Error('Wrong! your name cannot be Pedro Perafán')
        }

        console.log(`My name is ${name}`)
      } catch (error) {
        Sentry.setExtra('data', { 'message': {txt: 'Hello'} })
        Sentry.setExtra('user', { 'id': 123 })
        const eventId = Sentry.captureException(error)
        name = 'Adonis Framework'
        console.log('An exeption was thrown, go to sentry.io', eventId)
        resolve(eventId)
      }
    })
    await new Promise(resolve => setTimeout(() => resolve(), 4000))
    assert.equal(name, 'Adonis Framework')
    assert.equal(!!resultEventId, true)
  }).timeout(20000)
})
