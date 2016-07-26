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
