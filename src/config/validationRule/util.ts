export const strPatterns = {
  // eslint-disable-next-line no-useless-escape
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[=\w\-\?]{8,64}$/,
  email: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
  katakana: /^[ァ-ヴーｦ-ﾟ]+$/,
  confirm: (compare: string) =>
    new RegExp(`^${compare.replace(/\?/g, '\\?')}$`),
}

export const length = {
  login_id: [8, 32],
  password: [8, 64],
  email: [8, 255],
  default: [2, 128],
}
