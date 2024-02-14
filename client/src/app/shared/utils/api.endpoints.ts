export const API = {
  LOGIN: { url: '/auth/login', method: 'POST' },
  REGISTER: { url: '/auth/register', method: 'POST' },
  REFRESH: { url: '/auth/refresh', method: 'GET' },
  VERIFY_EMAIL_LINK: {
    url: '/auth/verify-email-link',
    method: 'POST',
  },
  VERIFY_EMAIL: { url: '/auth/verify-email', method: 'POST' },
  RESET_PASSWORD_LINK: {
    url: '/auth/reset-password-link',
    method: 'POST',
  },
  RESET_PASSWORD: { url: '/auth/reset-password', method: 'POST' },
  PROFILE: { url: '/user/profile', method: 'GET' },
  SEARCHUSERS: { url: '/user/search-users', method: 'GET' },
  UPDATEUSER: { url: '/user/update', method: 'POST' },
  UPLOADPROFILE: { url: '/upload/profile', method: 'PUT' },

  CONTACTS: { url: '/contact/fetch', method: 'GET' },
  REMOVECONTACT: { url: '/contact/remove-contact', method: 'POST' },
  ACCEPTREQUEST: { url: '/contact/accept-request', method: 'POST' },
  DECLINEREQUEST: { url: '/contact/decline-request', method: 'POST' },
  SENDREQUEST: { url: '/contact/send-request', method: 'POST' },
  CANCELREQUEST: { url: '/contact/cancel-request', method: 'POST' },
  SEENCONTACT: { url: '/contact/seen-contact', method: 'POST' },

  CHANGEPASSWORD: { url: '/user/reset-password', method: 'POST' },
  CHANGEEMAILLINK: { url: '/user/change-email-link', method: 'POST' },
  CHANGEEMAIL: { url: '/user/change-email', method: 'POST' },
  DELETEUSER: { url: '/user/delete', method: 'DELETE' },
  LOGOUT: { url: '/user/logout', method: 'GET' },

  CREATETAGS: { url: '/tags', method: 'POST' },
  SEARCHTAGS: { url: '/tags/search', method: 'GET' },
  CHECKTAG: { url: '/tags/check', method: 'GET' },

  CREATEPOST: { url: '/posts', method: 'POST' },
  UPDATEPOST: { url: '/posts', method: 'PATCH' },
  GETPOSTS: { url: '/posts', method: 'GET' },
  SEARCHPOSTS: { url: '/posts/search', method: 'GET' },
  DELETEPOST: { url: '/posts', method: 'DELETE' },
  TIMELINEPOST: { url: '/posts/timeline', method: 'GET' }
};

export type APIEndpoint = { url: string; method: string };
