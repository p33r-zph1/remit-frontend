import { fetchAuthSession, signIn, signOut } from 'aws-amplify/auth';
import type { SignInInput } from 'aws-amplify/auth';

export async function login({ username, password }: SignInInput) {
  try {
    const { isSignedIn, nextStep } = await signIn({ username, password });

    console.log({ isSignedIn, nextStep });
  } catch (error) {
    console.log('error signing in', error);
  }
}

export async function currentSession() {
  try {
    const authSession = await fetchAuthSession();

    // const { accessToken, idToken } = authSession.tokens || {};

    // console.log({ accessToken, idToken });

    return authSession;
  } catch (err) {
    console.error(err);
  }
}

export async function logout() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
