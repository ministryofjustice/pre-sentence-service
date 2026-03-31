import BaseController from './baseController'

export default class SubmitCompletedController extends BaseController {
  override templatePath = 'submit-completed'

  override redirectPath = 'psr-start'
}
