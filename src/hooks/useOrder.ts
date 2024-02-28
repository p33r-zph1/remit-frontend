import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { coerce, z } from 'zod';

import { platformFee } from '../constants';
import { getIsoCode } from '../schema/currency';
import { calculateFees } from '../schema/fees';
import {
  crossBorderLiteral,
  crossBorderSelfLiteral,
  localBuyLiteral,
  localSellLiteral,
} from '../schema/order';
import useGetAgents from './api/useGetAgents';
import useGetCurrency from './api/useGetCurrency';
import useGetOracle from './api/useGetOracle';

const baseOrderFormSchema = z.object({
  senderAmount: z.string().min(1, 'Please enter a valid amount'),
  recipientAmount: z.string().min(1),
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
});

const orderFormSchema = z.discriminatedUnion('orderType', [
  baseOrderFormSchema.extend({
    orderType: crossBorderLiteral,
    recipientId: z.string().min(1, 'Please enter a valid recipient'),
  }),

  baseOrderFormSchema.extend({
    orderType: crossBorderSelfLiteral,
    estimatedArrival: z.date({ required_error: 'Enter a valid date' }),
  }),

  baseOrderFormSchema.extend({
    orderType: localBuyLiteral,
    chainId: z.number().min(1, { message: 'Please select a chain' }),
  }),

  baseOrderFormSchema.extend({
    orderType: localSellLiteral,
    chainId: z.number().min(1, { message: 'Please select a chain' }),
  }),
]);

export type OrderForm = z.infer<typeof orderFormSchema>;

export default function useOrder() {
  const formProps = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderType: 'CROSS_BORDER_REMITTANCE',
      senderAmount: '',
      recipientAmount: '',
      recipientId: '',
      agentId: 'default',
    },
    shouldUnregister: true,
  });

  const { setValue, getValues, watch } = formProps;

  const agentId = watch('agentId');
  const orderTypeKey = watch('orderType');

  const {
    data: { orderType },
  } = useGetCurrency();

  const [fromCurrency, setFromCurrency] = useState(
    orderType[orderTypeKey]?.defaultSenderCurrency
  );

  const [toCurrency, setToCurrency] = useState(
    orderType[orderTypeKey]?.defaultRecipientCurrency
  );

  const {
    data: { rate: exchangeRate },
    isSuccess: pairUpdated,
  } = useGetOracle({
    from: fromCurrency?.currency,
    to: toCurrency?.currency,
  });

  const countryIsoCode = useMemo(
    () => getIsoCode(fromCurrency, toCurrency),
    [fromCurrency, toCurrency]
  );

  const { data: agents } = useGetAgents({
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
    // restore the selected currency to default when `orderTypeKey` changes
    setFromCurrency(orderType[orderTypeKey]?.defaultSenderCurrency);
    setToCurrency(orderType[orderTypeKey]?.defaultRecipientCurrency);
  }, [orderTypeKey, orderType]);

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
    senderCurrency: fromCurrency,
    setSenderCurrency: setFromCurrency,
    recipientCurrency: toCurrency,
    setRecipientCurrency: setToCurrency,

    // callback function for calculating the conversion
    conversionHandler,

    // list of exchange currencies
    supportedCurrencies: orderType[orderTypeKey]?.supportedCurrencies || [],

    supportedTokens: orderType[orderTypeKey]?.supportedTokens || [],

    // agents list
    agents,

    // hook form props
    formProps,
  };
}
