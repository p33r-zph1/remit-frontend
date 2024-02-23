import { GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { type ReactNode, useState } from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import Modal from '@/src/components/Modal';
import type { SendMoney } from '@/src/hooks/useSendMoney';
import { type OrderType, orderTypeSchema } from '@/src/schema/order';

type TransactionType = {
  title: string;
  description: string;
  icon: JSX.Element;
  disabled?: true;
};

const types: Record<OrderType, TransactionType> = {
  CROSS_BORDER_REMITTANCE: {
    title: 'Cross-border Remittance',
    description:
      'Convert currencies and remit to another user. A local agent will collect your cash and another agent will deliver the cash in your selected currency to your recipient abroad.',
    icon: <GlobeAltIcon className="mr-1 inline-block h-6 w-6 flex-shrink-0" />,
  },
  CROSS_BORDER_SELF_REMITTANCE: {
    title: 'Cross-border Self Remittance',
    description:
      'Convert currencies and remit to yourself. A local agent will collect your cash and another agent will deliver cash to you in your selected currency abroad.',
    icon: <GlobeAltIcon className="mr-1 inline-block h-6 w-6 flex-shrink-0" />,
  },
  LOCAL_SELL_STABLECOINS: {
    title: 'Sell Stablecoins (Local)',
    description:
      'Cash out your stablecoins locally. An agent will deliver your cash once your stablecoins are in escrow.',
    icon: <MapPinIcon className="mr-1 inline-block h-6 w-6 flex-shrink-0" />,
    disabled: true,
  },
  LOCAL_BUY_STABLECOINS: {
    title: 'Buy Stablecoins (Local)',
    description:
      'Buy stablecoins locally with cash. An agent will collect your cash and the stablecoins will be released from escrow to your wallet upon payment to the agent.',
    icon: <MapPinIcon className="mr-1 inline-block h-6 w-6 flex-shrink-0" />,
    disabled: true,
  },
};

type Props = UseControllerProps<SendMoney> & {
  children: (orderType: OrderType | null | undefined) => ReactNode;
};

export default function OrderType({ children, ...controllerProps }: Props) {
  const {
    field: { onChange, value, ...otherFields },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController(controllerProps);

  const selected = orderTypeSchema.nullish().parse(value);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <label className="form-control" onClick={() => setModalVisible(true)}>
        <div className="label">
          <span className="label-text text-base text-zinc-400">
            Transaction Type
          </span>

          {error?.message && (
            <span className="label-text text-xs font-bold text-error">
              {error.message}
            </span>
          )}
        </div>

        <input
          inputMode="text"
          autoComplete="off"
          placeholder="Select transaction type"
          value={selected ? types[selected].title : ''}
          className={twMerge(
            'input rounded-full bg-slate-50 text-base font-bold hover:cursor-pointer',
            error ? 'input-error' : 'input-primary'
          )}
          disabled={isSubmitting}
          readOnly
          {...otherFields}
        />
      </label>

      {children(selected)}

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        type="form"
        slideFrom="bottom"
        title="Select transaction type"
        size="medium"
      >
        <ul className="space-y-2 text-left">
          {Object.entries(types).map(
            ([orderType, { icon, title, description, disabled }]) => (
              <li
                key={orderType}
                className={twMerge(
                  'rounded-md p-4 shadow-md ring-primary duration-200',
                  selected === orderType && 'ring-2',
                  disabled
                    ? 'cursor-not-allowed opacity-35'
                    : 'cursor-pointer hover:shadow-lg'
                )}
                onClick={() => {
                  if (disabled) return;

                  onChange(orderType);
                  setModalVisible(false);
                }}
              >
                <h3 className="w-full truncate text-sm font-bold md:text-base">
                  {icon} {title}
                </h3>

                <p className="line-clamp-3 text-xs md:text-sm">{description}</p>
              </li>
            )
          )}
        </ul>
      </Modal>
    </>
  );
}
