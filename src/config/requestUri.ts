export default {
  current: '/current',
  user: {
    index: '/user',
    create: '/user',
    show: '/user/{id}',
    update: '/user/{id}',
    destroy: '/user/{id}',
  },
  admin: {
    index: '/admin',
    create: '/admin',
    show: '/admin/{id}',
    update: '/admin/{id}',
    profile: '/admin/{id}/profile',
    activity: '/admin/{id}/activity',
  },
  department: {
    index: '/department',
    create: '/department',
    update: '/department/{id}',
    destroy: '/department/{id}',
  },
  progress: {
    index: '/progress',
    create: '/progress',
    update: '/progress/{id}',
    destroy: '/progress/{id}',
  },
  meeting_room: {
    index: '/meeting_place',
    create: '/meeting_place',
    update: '/meeting_place/{id}',
    destroy: '/meeting_place/{id}',
  },
} as { [k: string]: any }
