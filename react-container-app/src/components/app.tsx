import {
  AmplifyProvider,
  Authenticator,
  withAuthenticator
} from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import React, { Suspense } from 'react';

// Importing Components
import awsconfig from './../aws-exports';
import Container from './container/index';
import Footer from './footer/footer';
import Header from './header/header';

Amplify.configure(awsconfig);

class App extends React.Component {
  render() {
    return (
      <AmplifyProvider>
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              {user && (
                <><Header signOut={signOut} user={user} />
                  <Suspense fallback={<div>loading...</div>}>
                    <Container user={user} />
                  </Suspense>
                  <Footer/>
                </>
              )}
            </div>
          )}
        </Authenticator>
      </AmplifyProvider>
    );
  }
}

export default withAuthenticator(App);

