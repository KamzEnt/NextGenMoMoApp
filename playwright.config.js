// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: 'http://localhost:3000'
  },
  testDir: 'tests',
  timeout: 30000,
  retries: 0
};

module.exports = config;
