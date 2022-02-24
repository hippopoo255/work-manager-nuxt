export default {
  app: {
    name: process.env.APP_NAME_EN,
    locale: 'Locale',
    theme: 'Theme',
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
        'ご入力いただいたメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      forgotPassword:
        'ご入力いただいたメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
      resetPassword:
        '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      verify:
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
      admin: '管理者アカウントを保存しました。',
      profile: 'プロフィールを更新しました。',
    },
    error: {
      signin: 'サインインに失敗しました。',
      signup: 'サインアップに失敗しました。',
      cognito: {
        UserNotFoundException: 'アカウントが存在しません',
        NotAuthorizedException: 'ユーザー名またはパスワードが違います',
        UserNotConfirmedException: 'アカウントの検証が完了していません',
        UsernameExistsException: '同じ名前のユーザーが既に登録されています',
        CodeMismatchException: '検証コードに誤りがあります',
        InvalidParameterException: '入力項目が正しくありません',
        InvalidPasswordException: 'パスワードの形式が正しくありません',
        LimitExceededException:
          'パスワードが試行回数を超えました。しばらくしてからもう一度お試しください',
        ExpiredCodeException:
          '既に検証済みのアカウントか、有効期限切れの可能性があります',
        default: '検証に失敗しました',
      },
    },
  },
  tab: {
    setting: {
      common: 'Common',
      notification: 'Notification',
      changePassword: 'Password',
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
    old_password: 'Current password',
    password: 'Password',
    password_confirmation: 'Password（confirm）',
    new_password: 'New password',
    new_password_confirmation: 'New password（confirm）',
    verification_code: 'Verificaction code',
  },
  link: {
    'password-forgot': 'Forget your password?',
    profile: 'Profile',
  },
  placeholder: {
    email: 'sample@example.com',
  },
  submit: {
    changePassword: 'Change password',
    create: 'Create',
    inviteAdmin: 'Invite as an Admin',
    resetPassword: 'Send',
    save: 'Save',
    sendVerificationCode: 'Send verification code',
    signin: 'Sign in',
    signout: 'Sign out',
    signup: 'Sign up',
    theme: 'On Dark mode',
    testSignin: 'Sign in as a Demo user',
    update: 'Update',
  },
  page: {
    index: {
      message: 'This is the Index Page!!!',
    },
    title: {
      admin: {
        index: 'Admin List',
        create: 'Admin Registration',
        id: 'Admin Detail',
      },
      blog: {
        index: 'Blog List',
        report: 'Blog Report',
      },
      chat: {
        report: 'Chat Report',
      },
      master: {
        index: 'Master',
      },
      organization: {
        index: 'Organization',
      },
      setting: {
        index: 'Setting',
        common: 'Common',
        password: 'Change Password',
        notification: 'Notification',
      },
      signin: 'Sign in',
      signup: 'Sign up',
      user: {
        index: 'User List',
        create: 'User registration',
        id: 'User Detail',
      },
      'password-forgot': 'Password regeneration',
      'password-reset': 'Password reset',
      'account-verification': 'Account Verification',
    },
  },
}
