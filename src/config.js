import str2bool from 'str2bool'

const DEBUG = str2bool(process.env.REACT_APP_DEBUG || false)
const port = process.env.PORT || 8080

// FIXME:
// This should probably *not* be node_env but a separate label as
// opk, heroku, rikssenter, azure or something like that. Time will tell.
const env = process.env.NODE_ENV || 'development'

// This is for private or non-profits only. Please read:
// https://fullcalendar.io/license/premium
const FULLCALENDER_LICENSE_KEY = 'GPL-My-Project-Is-Open-Source'

const graphqlUrl = process.env.GRAPHQL_URL || `http://localhost:${port}/graphql`

// Define views for fullcalendar
export const views = {
  resourceTimelineDays: {
    type: 'resourceTimeline',
    slotDuration: { days: 1 },
    slotLabelFormat: {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    },
    duration: { days: 8 },
    dateIncrement: { days: 1 }

  }
}

const adminEmailAddress = 'lars.bahner@gmail.com'
const globalConfig = {
  hosts: [adminEmailAddress],
  prices: {
    guest: 250,
    host: 200,
    caretaker: 0
  }
}

const development = {
  DEBUG,
  FULLCALENDER_LICENSE_KEY,
  adminEmailAddress,
  globalConfig,
  graphqlUrl,
  port,
  views,
  introspection: true,
  playground: true
}

const production = {
  ...development,
  // FIXME:
  // The following is required to enable on heroku
  // Set to false after launch
  introspection: true,
  playground: true
}

// this is for settings to be used when running test
const test = {
  ...development
}

const configs = {
  development,
  production,
  test
}

// This is stolen from NRK Mediakvern <3
const config = configs[env]
if (!config) throw new Error(`Missing config for env '${env}'!`)
export default config
