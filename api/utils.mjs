import { GlobalConfig } from './models/index.mjs'

export async function getOrSetGlobalConfig (cfg) {
  /*
    Fetches the config document from mongodb or sets it.
    The function returns the config for now, but with lot of
    emailaddresses later this might not be so smart.

    Function has the side effect of setting global.config to
    the object set or fetched.
  */

  try {
    global.config = await GlobalConfig.findOne()
    // We wanna make sure admin is a host. This will fail,
    // if config is not fetched properly. In which case
    // we wanna catch the error and create a new one.
    // global.config.hosts.addToSet(config.adminEmailAddress)
    await global.config.save()
  } catch (err) {
    console.log(`Failed to fetch persistent config from mongodb. ${err}`)
    console.log('Creating new config.')
    global.config = new GlobalConfig(cfg)
    await global.config.save()
  }

  return global.config
}
