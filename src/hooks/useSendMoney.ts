import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { coerce, z } from 'zod';

import { platformFee } from '../constants';
import { type Currency } from '../schema/currency';
import { calculateFees } from '../schema/fees';
import { orderTypeSchema } from '../schema/order';
import useAgents from './api/useAgents';
import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';

const sendMoneySchema = z.object({
  orderType: orderTypeSchema.refine(type => Boolean(type)),
  senderAmount: z.string().min(1, 'Please enter a valid amount'),
  recipientAmount: z.string().min(1),
  chainId: z.number().min(1, { message: 'Please select a chain' }).optional(),
  recipientId: z.string().min(1, 'Please enter a valid recipient').optional(),
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
});

export type SendMoney = z.infer<typeof sendMoneySchema>;

export default function useSendMoney() {
  const {
    data: {
      defaultRecipientCurrency,
      defaultSenderCurrency,
      supportedCurrencies,
    },
  } = useExchangeCurrency();

  const [senderCurrency, setSenderCurrency] = useState<Currency>(
    defaultSenderCurrency
  );
  const [recipientCurrency, setRecipientCurrency] = useState<Currency>(
    defaultRecipientCurrency
  );

  const {
    data: { rate: exchangeRate },
    isSuccess: pairUpdated,
  } = usePriceOracle({
    from: senderCurrency.currency,
    to: recipientCurrency.currency,
  });

  const { data: agents } = useAgents({
    isoCode: senderCurrency.countryIsoCode,
  });

  const formProps = useForm<SendMoney>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      senderAmount: '',
      recipientAmount: '',
      chainId: 0,
      recipientId: '',
      agentId: 'default',
    },
    shouldUnregister: true,
  });

  const { setValue, getValues, watch } = formProps;

  const agentId = watch('agentId');

  const conversionHandler = useCallback(
    (value: number | string | null) => {
      const result = coerce.number().safeParse(value);
      if (!result.success) return '';

      const agent = agents.find(a => a.agentId === agentId);

      const recipientAmount = calculateFees({
        amount: result.data,
        precision: recipientCurrency.decimals,
        exchangeRate,
        platformFee,
        agent,
      });

      setValue('recipientAmount', recipientAmount);
    },
    [agentId, agents, exchangeRate, recipientCurrency.decimals, setValue]
  );

  useEffect(() => {
    // re-calculates the conversion amount when the pair(exchange rate) updated
    if (pairUpdated) {
      conversionHandler(getValues('senderAmount'));
    }
  }, [conversionHandler, getValues, pairUpdated]);

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
