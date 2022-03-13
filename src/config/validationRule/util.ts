export const strPatterns = {
  // eslint-disable-next-line no-useless-escape
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[=\w\-\?]{8,64}$/,
  alphaNumeric: /^[\w]+$/,
  email: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
  postal: /^[0-9]{5,7}$/,
  tel: /^[0-9]{10,11}$/,
  katakana: /^[ァ-ヴーｦ-ﾟ]+$/,
  confirm: (compare: string) =>
    new RegExp(`^${compare.replace(/\?/g, '\\?')}$`),
}

export const length = {
  login_id: [8, 32],
  password: [8, 64],
  email: [8, 255],
  default: [2, 128],
  short: [2, 64],
  long: [2, 255],
}

export const MAX_IMAGE_SIZE = 5000000 // 5MB
