import playerData from './player-data'
import providerData from './provider-data'

export default {
  paths: {
    ...providerData,
    ...playerData,
  },
}
