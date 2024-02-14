import { signIn, type SignInInput, signOut } from 'aws-amplify/auth';
import { createContext, useCallback, useState } from 'react';

import type { CognitoGroup, Group } from '../schema/cognito';

export interface AuthContext {
  setUser: (username: string | undefined) => void;
  setGroup: (role: CognitoGroup | undefined) => void;
  authenticate: (input: SignInInput) => Promise<void>;
  logout: () => Promise<void>;
  hasGroup: (group: Group) => boolean;
  readonly isAuthenticated: boolean;
  readonly user: string | undefined;
  readonly error: string | undefined;
  readonly group: CognitoGroup | undefined;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string>();
  const [group, setGroup] = useState<CognitoGroup>();
  const [error, setError] = useState<string>();

  const isAuthenticated = Boolean(user);

  const authenticate = useCallback(async (input: SignInInput) => {
    try {
      const { isSignedIn, nextStep } = await signIn(input);

      if (isSignedIn && nextStep.signInStep === 'DONE') {
        setUser(input.username);
        return;
      }

      throw new Error('Unhandled auth step');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      setUser(undefined);
      setGroup(undefined);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  const hasGroup = useCallback(
    (_group: string) => group?.some(g => g === _group) || false,
    [group]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        setUser,
        group,
        setGroup,
        authenticate,
        logout,
        error,
        hasGroup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
