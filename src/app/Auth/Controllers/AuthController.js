import BaseController from '../../../infrastructure/Controllers/BaseController';
import Service from '../Services/AuthService';

class AuthController extends BaseController {
  constructor() {
    super();
    this.service = Service.getService();
  }
}

export default AuthController;
