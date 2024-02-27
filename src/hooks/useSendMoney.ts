import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { coerce, z } from 'zod';

import { platformFee } from '../constants';
import { getIsoCode } from '../schema/currency';
import { calculateFees } from '../schema/fees';
import { orderTypeSchema } from '../schema/order';
import useAgents from './api/useAgents';
import useExchangeCurrency from './api/useExchangeCurrency';
import usePriceOracle from './api/usePriceOracle';

const sendMoneySchema = z.object({
  orderType: orderTypeSchema,
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
  const formProps = useForm<SendMoney>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: {
      orderType: 'CROSS_BORDER_REMITTANCE',
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
  const orderType = watch('orderType');

  const {
    data: { orderType: orderTypeRecord },
  } = useExchangeCurrency();

  const [senderCurrency, setSenderCurrency] = useState(
    orderTypeRecord[orderType]?.defaultSenderCurrency
  );

  const [recipientCurrency, setRecipientCurrency] = useState(
    orderTypeRecord[orderType]?.defaultRecipientCurrency
  );

  const {
    data: { rate: exchangeRate },
    isSuccess: pairUpdated,
  } = usePriceOracle({
    from: senderCurrency?.currency,
    to: recipientCurrency?.currency,
  });

  const countryIsoCode = useMemo(
    () => getIsoCode(senderCurrency, recipientCurrency),
    [senderCurrency, recipientCurrency]
  );

  const { data: agents } = useAgents({
    isoCode: countryIsoCode,
  });

  const conversionHandler = useCallback(
    (value: number | string | null) => {
      const result = coerce.number().safeParse(value);
      if (!result.success) return '';

      const agent = agents.find(a => a.agentId === agentId);

      const recipientAmount = calculateFees({
        amount: result.data,
        precision: 2,
        exchangeRate,
        platformFee,
        agent,
      });

      setValue('recipientAmount', recipientAmount);
    },
    [agentId, agents, exchangeRate, setValue]
  );

  useEffect(() => {
    // restore the selected currency to default when `orderType` changes
    setSenderCurrency(orderTypeRecord[orderType]?.defaultSenderCurrency);
    setRecipientCurrency(orderTypeRecord[orderType]?.defaultRecipientCurrency);
  }, [orderType, orderTypeRecord]);

  useEffect(() => {
    // reset the selected agent to default when sender select's a new currency
    setValue('agentId', 'default');
  }, [countryIsoCode, setValue]);

  useEffect(() => {
    // re-calculates the conversion amount when the pair(exchange rate) updated
    if (pairUpdated) {
      conversionHandler(getValues('senderAmount'));
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
    supportedCurrencies: orderTypeRecord[orderType]?.supportedCurrencies || [],

    supportedTokens: orderTypeRecord[orderType]?.supportedTokens || [],

    // agents list
    agents,

    // hook form props
    formProps,
  };
}
