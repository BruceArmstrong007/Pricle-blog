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
      Timeline: '/user/dashboard/timeline',
      Search: '/user/dashboard/search',
    },
    Posts: {
      Root: '/user/posts',
      Create: '/user/posts/create',
      Edit: '/user/posts/edit'
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
    Posts: {
      Root: string;
      Create: string;
      Edit: string;
    }
    Dashboard: {
      Root: string;
      Timeline: string;
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
