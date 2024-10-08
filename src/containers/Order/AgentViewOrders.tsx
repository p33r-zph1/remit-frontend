import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import CommissionCard from '@/src/components/Card/CommissionCard';
import HeaderTitle from '@/src/components/Header/HeaderTitle';
import Modal from '@/src/components/Modal';
import useAgentCommission from '@/src/hooks/api/useAgentCommission';
import useAgentStatus from '@/src/hooks/api/useAgentStatus';
import useGetAgent from '@/src/hooks/api/useGetAgent';

import PaginatedOrderList from './PaginatedOrderList';

type Props = {
  agentId: string;
};

export default function AgentViewOrders({ agentId }: Props) {
  const { data: agent } = useGetAgent({ agentId });

  const {
    mutateAsync: setCommissionAsync,
    isPending: isUpdatingCommission,
    error: commisionError,
  } = useAgentCommission();

  const {
    mutateAsync: setStatusAsync,
    isPending: isUpdatingStatus,
    error: statusError,
  } = useAgentStatus();

  const [commissionModalVisible, setCommissionModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [commissionAmount, setCommissionAmount] = useState('');
  const [checked, setChecked] = useState(agent.isActive);

  return (
    <div className="mt-8 flex flex-col space-y-8 divide-y-2  sm:mt-16">
      <CommissionCard
        commission={agent.commission}
        checked={agent.isActive}
        onSwitch={checked => {
          setChecked(checked);
          setStatusModalVisible(true);
        }}
        onEdit={() => setCommissionModalVisible(true)}
      />

      <section className="flex flex-col">
        <PaginatedOrderList
          renderTitle={
            <HeaderTitle className="text-xl md:text-2xl">
              My Active Orders
            </HeaderTitle>
          }
          pageSize={5}
          status="active"
        />

        <div className="divider"></div>

        <PaginatedOrderList
          renderTitle={
            <HeaderTitle className="text-xl md:text-2xl">
              Open Orders
            </HeaderTitle>
          }
          pageSize={5}
          status="open"
        />
      </section>

      <Modal
        open={commissionModalVisible}
        isLoading={isUpdatingCommission}
        onClose={() => setCommissionModalVisible(false)}
        onCloseComplete={() => setCommissionAmount('')}
        type="action"
        title="Confirm commission update"
        actions={{
          confirm: {
            label: 'Update',
            action: async () => {
              await setCommissionAsync({
                agentId,
                body: { commission: Number(commissionAmount) },
              });

              setCommissionModalVisible(false);
            },
            disabled: Number(commissionAmount) <= 0,
          },
          cancel: {
            label: 'Cancel',
          },
        }}
      >
        <div className="space-y-2">
          <label className="input input-bordered flex items-center gap-2">
            <NumericFormat
              inputMode="numeric"
              className="grow placeholder:text-sm"
              placeholder="Commission percentage"
              value={commissionAmount}
              onValueChange={({ value }) => setCommissionAmount(value)}
            />

            <span className="badge">%</span>
          </label>

          <div
            role="alert"
            className="alert bg-white text-sm text-accent shadow-md"
          >
            <ExclamationTriangleIcon className="h-6 w-6" />

            <div>
              Please enter the percentage as a{' '}
              <span className="font-bold">numeric value</span>.
            </div>
          </div>

          {commisionError && <ErrorAlert message={commisionError.message} />}
        </div>
      </Modal>

      <Modal
        open={statusModalVisible}
        isLoading={isUpdatingStatus}
        onClose={() => setStatusModalVisible(false)}
        type="action"
        title="Confirm status update"
        actions={{
          confirm: {
            label: checked ? 'enable' : 'disable',
            action: async () => {
              await setStatusAsync({
                agentId,
                body: { isActive: checked },
              });

              setStatusModalVisible(false);
            },
          },
          cancel: {
            label: 'Cancel',
          },
        }}
      >
        <div className="space-y-2">
          <p className="text-balance text-slate-500">
            Are you sure you want to{' '}
            <span className="font-bold">{checked ? 'enable' : 'disable'}</span>{' '}
            your status?
          </p>

          {statusError && <ErrorAlert message={statusError.message} />}
        </div>
      </Modal>
    </div>
  );
}
