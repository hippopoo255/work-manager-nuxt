export default {
  app: {
    name: process.env.APP_NAME_EN,
  },
  tooltip: {
    theme: {
      toLight: 'Switch on Light mode',
      toDark: 'Switch on Dark mode',
    },
  },
  alert: {
    success: {
      signin: 'インデックスページです',
      signup:
        'ご登録いただいているメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      resetPassword:
        '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      verify:
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
    },
    error: {
      signin: 'サインインに失敗しました。',
    },
  },
  layout: {
    sidebar: {
      home: 'HOME',
      signin: 'Sign in',
      signup: 'Sign up',
      'password-reset': 'Password reset',
      'password-forgot': 'Forget password?',
    },
  },
  validation: {
    required: '{attribute} is required.',
    pattern: '{attribute} is invalid format.',
    confirmation: '{attribute} is not match with confimation attribute.',
    min: '{attribute} is at least {length} chars.',
    max: '{attribute} is equal or less than {length} chars',
  },
  attribute: {
    email: 'Email',
    login_id: 'Login ID',
    both: 'Login ID or Email',
    password: 'Password',
    password_confirmation: 'Password（confirm）',
    verification_code: 'Verificaction code',
  },
  link: {
    'password-forgot': 'Forget your password?',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  submit: {
    signin: 'Sign in',
    signout: 'Sign out',
    save: 'Save',
    sendVerificationCode: 'Send verification code',
    resetPassword: 'Send',
    testSignin: 'Sign in as Demo user',
  },
  page: {
    index: {
      message: 'This is the Index Page!!!',
    },
    title: {
      signin: 'Sign in',
      signup: 'Sign up',
      'password-forgot': 'Password regeneration',
      'password-reset': 'Password reset',
    },
  },
}
