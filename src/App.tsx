// import Login from './pages/Login';
// import SendMoney from './pages/SendMoney';
// import Transfer from './pages/Transfer';
import TransactionHistory from './pages/TransactionHistory';

import NavBar from './components/NavBar';
import BottomNavigation from './components/BottomNavigation';

export default function App() {
  // if (true) return <Login />;

  return (
    <main className="pb-16 min-h-screen flex flex-col">
      <NavBar />

      <TransactionHistory />
      <BottomNavigation />
    </main>
  );
}
