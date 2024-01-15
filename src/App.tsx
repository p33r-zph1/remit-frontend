import { useState } from 'react';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import SelectCurrency from './components/SelectCurrency';
import fiatCurrencies, { Currency } from './constants/currency';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MinusIcon } from '@heroicons/react/20/solid';
import BottomNavigation from './components/BottomNavigation';

// TODO: implement login functionality
const isLoggedin = true;
const defaultCurrency = fiatCurrencies[0];
const secondaryCurrency = fiatCurrencies[1];

export default function App() {
  const [senderFiat, setSenderFiat] = useState<Currency>(defaultCurrency);
  const [recipientFiat, setRecipientFiat] =
    useState<Currency>(secondaryCurrency);

  if (!isLoggedin) return <Login />;

  return (
    <main className="mb-16">
      <NavBar />

      <div className="px-6 py-2">
        {/* Recipient Input */}
        <label className="flex flex-col mt-4 max-w-md sm:mx-auto sm:mt-16">
          <span className="label-text text-sleep-100 text-base">Recipient</span>
          <input
            type="text"
            placeholder="Enter recipient number"
            className="input input-ghost border-0 focus:outline-none p-0 font-bold text-2xl placeholder:text-lg placeholder:opacity-50"
          />
        </label>
        {/* Sender: Fiat Currency Selection & Input */}
        <div className="flex flex-col mt-12 sm:max-w-md sm:mx-auto relative">
          <span className="absolute top-3 left-8 text-sm text-sleep-200">
            You send
          </span>
          <input
            type="text"
            className="rounded-full font-bold border-brand pl-8 pt-9 pb-3 pr-32 text-xl transition-shadow duration-200"
            placeholder="0.00"
          />

          <div className="absolute inset-y-0 right-0 flex items-center border-l">
            <SelectCurrency<Currency>
              selected={senderFiat}
              currencies={fiatCurrencies}
              disabled={false}
              hideChevron={false}
              onChange={fiat => setSenderFiat(fiat)}
            />
          </div>
        </div>
        {/* Conversion & Fee Summary */}
        <div className="sm:max-w-md sm:mx-auto relative">
          <div className="absolute inset-y-0 left-8 w-0.5 bg-[#E7E9EB]" />

          <div className="space-y-6 py-6">
            <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
              <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
                <MinusIcon
                  className="h-full w-full text-sleep-200"
                  strokeWidth={2}
                />
              </div>
              <span className="text-sm font-semibold text-sleep-200 w-1/2 truncate">
                0.00
              </span>
              <span className="text-sm font-semibold text-sleep-200">
                Platform fee
              </span>
            </div>

            <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
              <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
                <XMarkIcon
                  className="h-full w-full text-sleep-200"
                  strokeWidth={2}
                />
              </div>
              <select className="select w-full focus:outline-none select-bordered rounded-full shadow-sm hover:shadow-md duration-200">
                <option disabled selected>
                  Select agent commision
                </option>

                <option>0.3% - Agent 6443</option>
                <option>0.5% - Agent 2887</option>
                <option>0.8% - Agent 2341</option>
                <option>1% - Agent 8211</option>
              </select>
            </div>
          </div>
        </div>
        {/* Recipient: Fiat Currency Selection & Input */}
        <div className="flex flex-col sm:max-w-md sm:mx-auto relative">
          <span className="absolute top-3 left-8 text-sm text-sleep-200">
            Recipient will get
          </span>
          <input
            type="text"
            className="rounded-full font-bold border-brand pl-8 pt-9 pb-3 pr-32 text-xl transition-shadow duration-200"
            placeholder="0.00"
          />

          <div className="absolute inset-y-0 right-0 flex items-center border-l">
            <SelectCurrency<Currency>
              selected={recipientFiat}
              currencies={fiatCurrencies}
              disabled={false}
              hideChevron={false}
              onChange={fiat => setRecipientFiat(fiat)}
            />
          </div>
        </div>
        {/* Send Money Button */}
        <div className="sm:max-w-md sm:mx-auto mt-16">
          <button className="btn btn-primary btn-block rounded-full font-semibold text-xl">
            Send money
          </button>
        </div>
      </div>

      <BottomNavigation />
    </main>
  );
}
