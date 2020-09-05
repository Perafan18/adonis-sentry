'use strict'

const path = require('path')
const { ioc, registrar } = require('@adonisjs/fold')
const { Config } = require('@adonisjs/sink')
const test = require('japa')

require('dotenv').load()

test.group('Sentry Provider', (group) => {
  group.before(() => {
    ioc.bind('Adonis/Src/Config', () => {
      const config = new Config()
      config.set('sentry', {
        dsn: process.env.SENTRY_DSN,
        environment: 'testing'
      })
      return config
    })
  })

  test('register sentry provider', async (assert) => {
    await registrar
      .providers([path.join(__dirname, '../../providers/SentryProvider')])
      .registerAndBoot()

    assert.isDefined(ioc.use('Adonis/Src/Sentry'))
    assert.isTrue(ioc._bindings['Adonis/Src/Sentry'].singleton)
    assert.isDefined(ioc.use('Sentry'))
  })
})
