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
      admin: '管理者アカウントを保存しました。',
    },
    error: {
      signin: 'サインインに失敗しました。',
    },
  },
  layout: {
    sidebar: {
      dashboard: 'Dashboard',
      user: {
        top: 'User Account',
        index: 'List',
        create: 'Add',
      },
      admin: {
        top: 'Admin Account',
        index: 'List',
        create: 'Add',
      },
      blog: {
        top: 'Blog',
        index: 'List',
        report: 'Report',
      },
      chat: {
        top: 'Chat',
        report: 'Report',
      },
      setting: {
        top: 'Settings',
        index: 'index',
        organization: 'Organization',
        master: 'Master',
      },
    },
    table: {
      header: {
        user: {
          index: {
            id: 'ID',
            full_name: 'Name',
            full_name_kana: 'Name kana',
            email: 'Email',
            email_verified_at: 'Verified Date',
            created_by: 'Created by',
            created_at: 'Created at',
          },
        },
      },
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
    profile: 'プロフィール',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  submit: {
    signin: 'Sign in',
    signout: 'Sign out',
    save: 'Save',
    create: 'Create',
    update: 'Update',
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
      user: {
        create: 'Customer registration',
      },
      'password-forgot': 'Password regeneration',
      'password-reset': 'Password reset',
      'account-verification': 'Account Verification',
    },
  },
}
