'use strict'

const path = require('path')

module.exports = async (cli) => {
  try {
    await cli.copy(path.join(__dirname, 'stubs/sentry.js'), path.join(cli.helpers.configPath(), 'sentry.js'))
    cli.command.completed('create', 'config/sentry.js')
  } catch (error) {
    console.log(error)
  }
}
