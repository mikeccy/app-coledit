import { Base } from './Base';

export class User extends Base({
  email: undefined,
  password: undefined,
  avatar: undefined,
}) {
  getEmail() {
    return this.get('email');
  }
}

export const userLogin = (user) => {
  return {
    type: 'USER_LOGIN',
    user,
  }
}

export const userLogout = (userId) => {
  return {
    type: 'USER_LOGOUT',
    userId,
  }
}
