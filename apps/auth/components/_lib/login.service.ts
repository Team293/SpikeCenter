import { loginWithMagicLinkAction } from './server-actions';

export function getLoginService() {
  return new LoginService();
}

class LoginService {
  async loginWithMagicLink(email: string, redirectUrl: string) {
    await loginWithMagicLinkAction({ email, redirectUrl });
  }
}
