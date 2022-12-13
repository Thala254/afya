import 'dotenv/config';
import { config } from '@keystone-6/core';

import { lists } from './schema';

import { withAuth, session } from './auth';
import { extendGraphqlSchema } from './mutations';

const frontEndUrl = process.env.FRONTEND_URL;

export default withAuth(
  config({
    server: {
      cors: {
        origin: [`${frontEndUrl}`],
        credentials: true,
      },
    },
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
      useMigrations: true,
      async onConnect() {
        console.log('Connected to the database!');
      },
    },
    graphql: {
      cors: {
        origin: [`${frontEndUrl}`],
        credentials: true,
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
    extendGraphqlSchema, // custom mutations
    lists,
    session,
  })
);
