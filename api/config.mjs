const port = process.env.PORT || 80

const env = process.env.NODE_ENV || 'development'

const mongo = {
  url: process.env.MONGODB_URL || 'mongodb://localhost/natta'
}

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
  mongo,
  adminEmailAddress,
  globalConfig,
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

const configs = {
  development,
  production
}

// This is stolen from NRK Mediakvern <3
const config = configs[env]
if (!config) throw new Error(`Missing config for env '${env}'!`)
export default config
