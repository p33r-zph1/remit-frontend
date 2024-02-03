import { createContext, useCallback, useState } from 'react';
import { SignInInput, signIn, signOut } from 'aws-amplify/auth';

export interface AuthContext {
  setUser: (username: string | null) => void;
  authenticate: (input: SignInInput) => Promise<void>;
  logout: () => Promise<void>;
  readonly isAuthenticated: boolean;
  readonly user: string | null;
  readonly error: string;
}

export const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const isAuthenticated = Boolean(user);

  console.log({ user });

  const [error, setError] = useState('');

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
      setUser(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setUser, error, authenticate, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
