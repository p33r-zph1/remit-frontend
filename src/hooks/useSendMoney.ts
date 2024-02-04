import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coerce, z } from 'zod';

import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';
import useAgents from './api/useAgents';

const formSchema = z.object({
  recipientId: z.string().min(1, 'Please enter a valid recipient'),
  sendAmount: z.string().min(1, 'Please enter a valid amount'),
  recipientAmount: z.string().min(1),
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
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
    from: senderCurrency.currency,
    to: recipientCurrency.currency,
  });

  const { data: agents } = useAgents(senderCurrency.countryIsoCode);

  const formProps = useForm<SendMoney>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentId: 'default',
    },
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

    // agents list
    agents,

    // hook form props
    formProps,
  };
}
