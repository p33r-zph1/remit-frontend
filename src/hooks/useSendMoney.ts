import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { coerce, z } from 'zod';

import useAgents from './api/useAgents';
import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';

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
    data: { rate: exchangeRate },
    isSuccess: pairUpdated,
  } = usePriceOracle({
    from: senderCurrency.currency,
    to: recipientCurrency.currency,
  });

  const { data: agents } = useAgents(senderCurrency.countryIsoCode);

  const formProps = useForm<SendMoney>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientId: '',
      recipientAmount: '',
      sendAmount: '',
      agentId: 'default',
    },
  });

  const { setValue, getValues, watch } = formProps;

  const agentId = watch('agentId');

  const conversionHandler = useCallback(
    (value: number | string | null) => {
      const result = coerce.number().safeParse(value);

      if (!result.success) return '';

      const agent = agents.find(a => a.agentId === agentId);

      let recipientAmount = 0;

      if (agent) {
        // Converting commission percentage to decimal
        const commissionRate = agent.commission / 100;

        // Calculating fiat value
        const fiatValue = result.data * exchangeRate;

        // Calculating the amount with commission
        recipientAmount = fiatValue - fiatValue * commissionRate;
      } else {
        // Calculating fiat value without commision
        recipientAmount = result.data * exchangeRate;
      }

      // Returns stringified amount (if amount is zero returns empty string)
      const formatAmount = String(recipientAmount === 0 ? '' : recipientAmount);

      setValue('recipientAmount', formatAmount);
    },
    [agentId, agents, exchangeRate, setValue]
  );

  useEffect(() => {
    // re-calculates the conversion amount when the pair(exchange rate) or agent gets ypdated
    if (pairUpdated || agentId) {
      conversionHandler(getValues('sendAmount'));
    }
  }, [agentId, conversionHandler, getValues, pairUpdated]);

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
