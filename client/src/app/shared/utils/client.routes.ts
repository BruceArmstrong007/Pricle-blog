export const ClientRoutes: RoutesInterface = {
  Auth: {
    Root: '/auth',
    Login: '/auth/login',
    Register: '/auth/register',
    VerifyAccount: '/auth/verify-account',
    ResetPassword: '/auth/reset-password',
  },
  User: {
    Root: '/user',
    Contacts: {
      Root: '/user/contacts',
      Friends: '/user/contacts/friends',
      SentRequests: '/user/contacts/sent-requests',
      ReceivedRequests: '/user/contacts/received-requests',
    },
    Settings: {
      Root: '/user/settings',
      Account: '/user/settings/account',
      Personal: '/user/settings/personal',
    },
    Dashboard: {
      Root: '/user/dashboard',
      Search: '/user/dashboard/search',
    },
    Profile: {
      Root: '/user/profile',
    },
  },
  Home: '/home',
};

export interface RoutesInterface {
  Auth: {
    Root: string;
    Login: string;
    Register: string;
    VerifyAccount: string;
    ResetPassword: string;
  };
  User: {
    Root: string;
    Contacts: {
      Root: string;
      Friends: string;
      SentRequests: string;
      ReceivedRequests: string;
    };
    Dashboard: {
      Root: string;
      Search: string;
    };
    Settings: {
      Root: string;
      Account: string;
      Personal: string;
    };
    Profile: {
      Root: string;
    };
  };
  Home: string;
}
