import BaseController from './baseController'

export default class LandingPageController extends BaseController {
  override templatePath = 'landing'

  override post = async (): Promise<void> => {
    return null
  }
}
