// import Login from './pages/Login';
import SendMoney from './pages/SendMoney';

import NavBar from './components/NavBar';
import BottomNavigation from './components/BottomNavigation';
// import Transfer from './pages/Transfer';
// const isLoggedin = true;

export default function App() {
  // if (!isLoggedin) return <Login />;

  return (
    <main className="mb-16">
      <NavBar />

      <SendMoney />

      <BottomNavigation />
    </main>
  );
}
