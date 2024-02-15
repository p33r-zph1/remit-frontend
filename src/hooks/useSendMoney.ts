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

      // Closure for calculating fiat value
      const calculateFiatValue = (amount: number) => amount * exchangeRate;

      // Corrected Closure for applying commission
      const applyCommission = (amount: number, commissionRate: number) =>
        amount - amount * commissionRate;

      // Corrected Closure for applying platform fee
      const applyPlatformFee = (amount: number, feeRate: number) =>
        amount - amount * feeRate;

      const agent = agents.find(a => a.agentId === agentId);

      let fiatValue = calculateFiatValue(result.data);

      if (agent) {
        const commissionRate = agent.commission / 100;
        fiatValue = applyCommission(fiatValue, commissionRate);
      }

      const platformFeeRate = platformFee / 100;
      const recipientAmount = applyPlatformFee(fiatValue, platformFeeRate);

      // Format and set the recipient amount
      const formatAmount = recipientAmount === 0 ? '' : String(recipientAmount);
      setValue('recipientAmount', formatAmount);
    },
    [agentId, agents, exchangeRate, setValue]
  );

  useEffect(() => {
    // re-calculates the conversion amount when the pair(exchange rate) updated
    if (pairUpdated) {
      conversionHandler(getValues('sendAmount'));
    }
  }, [conversionHandler, getValues, pairUpdated, setValue]);

  useEffect(() => {
    // reset the selected agent to default when sender select's a new currency
    setValue('agentId', 'default');
  }, [senderCurrency.countryIsoCode, setValue]);

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

const platformFee = 1; // 1%
