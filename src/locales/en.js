export default {
  app: {
    name: process.env.APP_NAME_EN,
    locale: 'Locale',
    theme: 'Theme',
    activity: {
      empty: 'Activity is empty',
    },
  },
  tooltip: {
    theme: {
      toLight: 'Switch on Light mode',
      toDark: 'Switch on Dark mode',
    },
    edit: 'Edit',
    trash: {
      disabled: "Can't delete",
      hasChildren: 'Related resources exist',
    },
  },
  alert: {
    success: {
      signin: 'You have successfully signed in.',
      signup:
        'We have Sent the verification code to the email address you entered.\nAfter a few seconds, the current page will change and you will be asked to enter your new password and verification code.',
      forgotPassword:
        'We have Sent the verification code to the email address you entered.\nAfter a few seconds, the current page will change and you will be asked to enter your new password and verification code.',
      resetPassword:
        'You have successfully reseted password.\nAfter a few seconds, you will be redirected to the login screen.',
      verify:
        'You have succeeded the verification.\nAfter a few seconds, you will be redirected to the login screen.',
      admin: 'Admin account successfully saved.',
      user: 'User account successfully saved.',
      organization: 'Organization successfully saved.',
      profile: 'Profile successfully saved.',
      save: 'The data successfully saved.',
      delete: 'The data successfully deleted.',
    },
    error: {
      signin: 'Sign in failed.',
      signup: 'Sign up failed.',
      unauthorized: 'Please Sign in and Try again',
      forbidden: 'Forbidden',
      notfound: 'Not Found',
      cognito: {
        UserNotFoundException: "The account doesn't exist.",
        NotAuthorizedException:
          'Username or password is different, or your account has been disabled.',
        UserNotConfirmedException:
          'Account verification has not yet been completed.',
        UsernameExistsException: 'The same username already exists.',
        CodeMismatchException: 'Invalid verification code.',
        InvalidParameterException: 'Invalid attributes you have entered.',
        InvalidPasswordException: 'Password format does not match.',
        LimitExceededException:
          'Password has exceeded the number of attempts. Please try again in a few minutes.',
        ExpiredCodeException: 'Account may already be verified or expired',
        default: 'Verification failed.',
      },
    },
  },
  confirm: {
    delete:
      'Once deleted, it cannot be restored. Are you sure you want to delete it?',
    invite:
      'An invitation email will be sent to this user. Would you like to be invited to the management system?',
  },
  breadcrumb: {
    dashboard: 'Dashboard',
    user: {
      create: 'User registration',
      edit: 'User edit',
      id: '{id}',
      index: 'User List',
    },
    admin: {
      create: 'Admin registration',
      id: '{id}',
      index: 'Admin List',
    },
    blog: {
      index: 'Blogs',
      report: 'Blog Report',
      id: '{id}',
      comment: {
        index: 'Blog Comments',
        commentId: '{commentId}',
      },
    },
    chat: {
      index: 'Chat list',
      report: 'Chat Report',
    },
    master: {
      index: 'Master',
      meeting_room: {
        index: 'Meeting room',
      },
      progress: {
        index: 'Progress',
      },
      department: {
        index: 'Department',
      },
    },
    organization: {
      index: 'Organization',
    },
    profile: {
      index: 'Profile',
    },
    setting: {
      index: 'Setting',
      common: 'Common',
      password: 'Password',
      notification: 'Notification',
    },
    signin: 'Sign in',
    signup: 'Account Setup',
    password: {
      forgot: 'Password regeneration',
      reset: 'Password reset',
    },
    account_verification: 'Account Verification',
  },
  tab: {
    setting: {
      common: 'Common',
      notification: 'Notification',
      changePassword: 'Password',
    },
    userDetail: {
      activity: 'Activity',
      base: 'Base',
      score: 'Score',
    },
    adminDetail: {
      activity: 'Activity',
      base: 'Base',
    },
  },
  unit: {
    default: 'records',
  },
  card: {
    title: {
      activity: 'Activity',
      minutes: 'Minutes',
      chat: 'Chat',
      chatPerPost: 'Report per post',
      chatPerUser: 'Report per user',
      reportCount: 'Reported count',
      minutesCount: 'Minutes count',
      sub: {
        chat: '（chat）',
      },
    },
  },
  chart: {
    label: {
      blog: 'Report count',
      blogPerPost: 'Reported count',
      minutes: 'Post count',
      chat: 'Report count',
      chatPerPost: 'Reported count',
      chatPerUser: 'Reported count',
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
        actions: 'Actions',
        chat_report: {
          index: {
            id: 'ID',
            roomName: 'Chat room',
            messageId: 'Message ID',
            messageBody: 'Body',
            writtenBy: 'Written by',
            createdBy: 'Reported by',
            reportCategory: 'Reason',
            count: 'Count',
          },
        },
        user: {
          index: {
            id: 'ID',
            full_name: 'Name',
            full_name_kana: 'Name kana',
            department: 'Department',
            email: 'Email',
            email_verified_at: 'Verified Date',
            createdBy: 'Created by',
            created_by: 'Created by',
            created_at: 'Created at',
          },
        },
        admin: {
          index: {
            id: 'ID',
            full_name: 'Name',
            full_name_kana: 'Name kana',
            department: 'Department',
            email: 'Email',
            email_verified_at: 'Verified Date',
            createdBy: 'Created by',
            created_by: 'Created by',
            created_at: 'Created at',
          },
        },
        department: {
          index: {
            id: 'ID',
            department_code: 'Department code',
            name: 'Department name',
            color: 'Color',
            createdBy: 'Created by',
            created_at: 'Created at',
          },
        },
        progress: {
          index: {
            id: 'ID',
            name: 'Name',
            value: 'Value',
            createdBy: 'Created by',
            created_at: 'Created at',
          },
        },
        meeting_room: {
          index: {
            id: 'ID',
            name: 'Name',
            createdBy: 'Created by',
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
    min: '{attribute} must be at least {length} chars.',
    max: '{attribute} must be equal or less than {length} chars',
    minNum: '{attribute} must be at least {length}',
    maxNum: '{attribute} must be equal or less than {length}',
    imageSize: '{attribute} size should be less than {size} MB',
  },
  attribute: {
    both: 'Login ID or Email',
    email: 'Email',
    login_id: 'Login ID',
    old_password: 'Current password',
    password: 'Password',
    password_confirmation: 'Password（confirm）',
    new_password: 'New password',
    new_password_confirmation: 'New password（confirm）',
    verification_code: 'Verificaction code',
    family_name: 'Family name',
    family_name_kana: 'Family name kana',
    given_name: 'Given name',
    given_name_kana: 'Given name kana',
    image: 'Image',
    department_code: 'Department code',
    department_id: 'Department',
    color: 'Color',
    name: {
      department: 'Department name',
      progress: 'Progress name',
      meeting_room: 'Meeting room name',
    },
    value: {
      progress: 'Progress value',
    },
    organization: {
      name: 'Name',
      name_kana: 'Name kana',
      postal_code: 'Postal code',
      pref_id: 'Prefecture',
      city: 'City',
      address: 'Address',
      tel: 'Tel',
    },
  },
  link: {
    password: {
      forgot: 'Forget your password?',
    },
    profile: 'Profile',
    moreLink: 'More',
    edit: {
      profile: 'Edit profile',
    },
  },
  placeholder: {
    email: 'sample@example.com',
    department_code: 'Alper numeric',
  },
  status: {
    inviteAdmin: 'Already invited',
    isDefault: 'Default value',
  },
  submit: {
    address: 'Enter address',
    changePassword: 'Change password',
    clearUpload: 'Clear image',
    create: 'Register',
    delete: 'Delete',
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
    upload: 'Upload image',
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
        edit: 'Admin Edit',
        activity: 'Activity',
        profile: 'Profile',
      },
      blog: {
        index: 'Blog List',
        report: 'Blog Report',
      },
      chat: {
        index: 'Chat list',
        report: 'Chat Report',
      },
      master: {
        index: 'Master',
        meeting_room: 'Meeting Room',
        department: 'Department',
        progress: 'Task Progress',
      },
      organization: {
        index: 'Organization',
      },
      profile: 'プロフィール',
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
        edit: 'User Edit',
        activity: 'Activity',
        profile: 'Profile',
      },
      password: {
        forgot: 'Password regeneration',
        reset: 'Password reset',
      },
      account_verification: 'Account Verification',
    },
  },
}
