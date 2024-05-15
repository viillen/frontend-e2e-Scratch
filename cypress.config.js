const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://notes-serverless-app.com',
    env: {
      viewportWidthBreakpoint: 768,
    },
    requestTimeout: 20000,
    'defaultCommandTimeout': 40000,
    chromeWebSecurity: false,
  },

  projectId: '6wmdtb'
})
  