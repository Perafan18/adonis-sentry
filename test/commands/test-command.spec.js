'use strict'

const path = require('path')
const ace = require('@adonisjs/ace')
const { ioc, registrar } = require('@adonisjs/fold')
const { Config } = require('@adonisjs/sink')
const test = require('japa')

const TestCommand = require('../../commands/TestCommand')

require('dotenv').load()

test.group('Test Command', (group) => {
  group.before(async () => {
    ioc.bind('Adonis/Src/Config', () => {
      const config = new Config()
      config.set('sentry', {
        dsn: process.env.SENTRY_DSN,
        environment: 'testing'
      })
      return config
    })

    await registrar
      .providers([path.join(__dirname, '../../providers/Sentry')])
      .registerAndBoot()
  })

  test('send test exception to sentry', async (assert) => {
    ace.addCommand(TestCommand)
    const result = await ace.call('sentry:test')
    assert.equal(result, 'Event sent')
  })
})
