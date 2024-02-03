// import { useCallback, useContext } from 'react';
// import { useNavigate, useRouter } from '@tanstack/react-router';
// import { signOut } from 'aws-amplify/auth';

// // import { authRoute } from '../config/router.config';
// import { AuthContext } from '../contexts/AuthContext';

// export default function useLogout() {
//   // const { auth } = authRoute.useRouteContext();
//   const auth = useContext(AuthContext);

//   if (!auth) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   const router = useRouter();
//   const navigate = useNavigate();

//   return useCallback(() => {
//     return signOut().then(() => {
//       auth.setUser(null);

//       navigate({ to: '/login' });
//       router.invalidate();
//     });
//   }, [auth, navigate, router]);
// }
