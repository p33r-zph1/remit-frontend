import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coerce, z } from 'zod';

import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';

const formSchema = z.object({
  recipientId: z.string(),
  sendAmount: z.string(),
  recipientAmount: z.string(),
});

export type SendMoney = z.infer<typeof formSchema>;

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

  const formProps = useForm<SendMoney>({
    resolver: zodResolver(formSchema),
  });

  const { setValue, getValues } = formProps;

  const conversionHandler = useCallback(
    (value: number | string | null) => {
      const result = coerce.number().safeParse(value);

      if (!result.success) return '';

      const conversion = result.data * rate;
      const formatConversion = String(conversion === 0 ? '' : conversion);

      setValue('recipientAmount', formatConversion);
    },
    [rate, setValue]
  );

  useEffect(() => {
    // re-calculates the conversion amount when the pair gets ypdated
    if (pairUpdated) {
      conversionHandler(getValues('sendAmount'));
    }
  }, [conversionHandler, getValues, pairUpdated]);

  return {
    // currency dropdown controlled state
    senderCurrency,
    setSenderCurrency,
    recipientCurrency,
    setRecipientCurrency,

    // callback function for calculating the conversion
    conversionHandler,

    // list of exchange currencies
    supportedCurrencies,

    // hook form props
    formProps,
  };
}
