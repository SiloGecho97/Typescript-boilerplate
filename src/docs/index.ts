import basicInfo from './common/basicInfo'
import servers from './common/servers'
import events from './events'
import components from './schema/components'

export default JSON.stringify({
  ...basicInfo,
  ...servers,
  ...components,
  ...events,
})
