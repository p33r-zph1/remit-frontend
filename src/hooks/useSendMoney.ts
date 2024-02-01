import { useCallback, useEffect, useState } from 'react';
import { coerce } from 'zod';

import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';

export default function useSendMoney() {
  const {
    data: {
      defaultRecipientCurrency,
      defaultSenderCurrency,
      supportedCurrencies,
    },
  } = useExchangeCurrency();

  const [senderCurrency, setSenderCurrency] = useState(defaultSenderCurrency);
  const [recipientCurrency, setRecipientCurrency] = useState(
    defaultRecipientCurrency
  );

  const {
    data: { rate },
    isSuccess: pairUpdated,
  } = usePriceOracle({
    from: senderCurrency?.currency,
    to: recipientCurrency?.currency,
  });

  const [sendAmount, setSendAmount] = useState('');
  const [recipientAmount, setRecipientAmount] = useState('');

  const conversionHandler = useCallback(
    (value: string) => {
      const result = coerce.number().safeParse(value);

      if (!result.success) return;

      const conversion = result.data * rate;
      const formatConversion = String(conversion === 0 ? '' : conversion);

      setRecipientAmount(formatConversion);
    },
    [rate]
  );

  const amountHandler = useCallback(
    (value: string) => {
      setSendAmount(value);
      conversionHandler(value);
    },
    [conversionHandler]
  );

  useEffect(() => {
    // re-calculates the conversion amount when the pair gets ypdated
    if (pairUpdated) conversionHandler(sendAmount);
  }, [conversionHandler, pairUpdated, sendAmount]);

  return {
    // select currency dropdown
    senderCurrency,
    setSenderCurrency,
    recipientCurrency,
    setRecipientCurrency,

    // controlled input state
    sendAmount,
    recipientAmount,
    amountHandler,
    // setSendAmount,
    // setRecipientAmount,

    // list of exhange currencies
    currencyList: supportedCurrencies,
  };
}
