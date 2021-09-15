/* eslint-disable import/first */
/*
 * Do appinsights first as it does some magic instrumentation work, i.e. it affects other 'require's
 * In particular, applicationinsights automatically collects bunyan logs
 */
import fs from 'fs'
import { initialiseAppInsights, buildAppInsightsClient } from './server/utils/azureAppInsights'

initialiseAppInsights()
buildAppInsightsClient()

import app from './server/index'
import logger from './logger'

app.listen(app.get('port'), () => {
  const data = fs.readFileSync('banner.txt', 'utf8')
  console.log(data.toString())
  logger.info(`Server listening on port ${app.get('port')}`)
})
