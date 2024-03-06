import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { coerce, z } from 'zod';

import { platformFee } from '../constants';
import { getIsoCodeFromCurrency } from '../schema/currency';
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

const agentSchema = z
  .string()
  .min(1)
  .refine(value => value !== 'default', {
    message: 'Please select an agent',
  });

const baseOrderFormSchema = z.object({
  fromAmount: z.string().min(1, 'Please enter a valid amount'),
  toAmount: z.string().min(1),
  fromAgentId: agentSchema,
});

const orderFormSchema = z.discriminatedUnion('orderType', [
  baseOrderFormSchema.extend({
    orderType: crossBorderLiteral,
    recipientId: z.string().min(1, 'Please enter a valid recipient'),
  }),

  baseOrderFormSchema.extend({
    orderType: crossBorderSelfLiteral,
    estimatedArrival: z.date({ required_error: 'Enter a valid date' }),
    toAgentId: agentSchema,
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

export default function useOrderForm() {
  const formProps = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      orderType: 'CROSS_BORDER_REMITTANCE',
      fromAmount: '',
      toAmount: '',
      recipientId: '',
      fromAgentId: 'default',
    },
    shouldUnregister: true,
  });

  const { setValue, getValues, watch } = formProps;

  const fromAgentId = watch('fromAgentId');
  const toAgentId = watch('toAgentId');
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

  const fromCountryIsoCode = useMemo(() => {
    switch (getValues('orderType')) {
      case 'CROSS_BORDER_REMITTANCE':
      case 'CROSS_BORDER_SELF_REMITTANCE':
      case 'LOCAL_BUY_STABLECOINS':
        return getIsoCodeFromCurrency(fromCurrency);

      case 'LOCAL_SELL_STABLECOINS':
        return undefined;
    }
  }, [fromCurrency, getValues]);

  const toCountryIsoCode = useMemo(() => {
    switch (getValues('orderType')) {
      case 'CROSS_BORDER_SELF_REMITTANCE':
      case 'LOCAL_SELL_STABLECOINS':
        return getIsoCodeFromCurrency(toCurrency);

      case 'CROSS_BORDER_REMITTANCE':
      case 'LOCAL_BUY_STABLECOINS':
        return undefined;
    }
  }, [getValues, toCurrency]);

  const { data: fromAgents } = useGetAgents({
    isoCode: fromCountryIsoCode,
  });

  const { data: toAgents } = useGetAgents({
    isoCode: toCountryIsoCode,
  });

  const conversionHandler = useCallback(
    (value: number | string | null) => {
      const result = coerce.number().safeParse(value);
      if (!result.success) return '';

      const fromAgent = fromAgents?.find(a => a.agentId === fromAgentId);
      const toAgent = toAgents?.find(a => a.agentId === toAgentId);

      const toAmount = calculateFees({
        amount: result.data,
        precision: 2,
        exchangeRate,
        platformFee,
        fromAgent,
        toAgent,
      });

      setValue('toAmount', toAmount);
    },
    [exchangeRate, fromAgentId, fromAgents, setValue, toAgentId, toAgents]
  );

  useEffect(() => {
    // restore the selected currency to default when `orderTypeKey` changes
    setFromCurrency(orderType[orderTypeKey]?.defaultSenderCurrency);
    setToCurrency(orderType[orderTypeKey]?.defaultRecipientCurrency);
  }, [orderTypeKey, orderType]);

  useEffect(() => {
    // reset the selected agent to default when user select's a new currency
    setValue('fromAgentId', 'default');
    setValue('toAgentId', 'default');
  }, [fromCountryIsoCode, toCountryIsoCode, setValue]);

  useEffect(() => {
    // re-calculates the conversion amount when the pair(exchange rate) updated
    if (pairUpdated) {
      conversionHandler(getValues('fromAmount'));
    }
  }, [conversionHandler, getValues, pairUpdated]);

  return {
    // currency dropdown controlled state
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,

    // list of currencies
    fiatCurrencies: orderType[orderTypeKey]?.supportedCurrencies || [],
    tokenCurrencies: orderType[orderTypeKey]?.supportedTokens || [],

    // list of agents
    fromAgents: fromAgents || [],
    toAgents: toAgents || [],

    // hook form props
    formProps,

    // callback function for calculating the conversion
    conversionHandler,
  };
}
