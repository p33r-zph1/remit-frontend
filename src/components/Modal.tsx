import { Dialog, Transition } from '@headlessui/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
  open: boolean;
  isLoading?: boolean;
  actions: {
    cancel?: {
      label: string;
      action?: () => void;
    };
    confirm: {
      label: string;
      action: () => void;
    };
  };
  onClose: () => void;
  onCloseComplete?: () => void;
};

type Props = ModalProps & {
  title: string;
  // tone: 'default' | 'danger' | 'success';
  size: 'small' | 'medium' | 'large';
  slideFrom: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
};

const sizeClasses: Record<Props['size'], string> = {
  small: 'sm:max-w-sm',
  medium: 'sm:max-w-lg',
  large: 'sm:max-w-2xl',
};

const slideFromClasses: Record<
  Props['slideFrom'],
  { from: string; to: string }
> = {
  top: {
    from: '-translate-y-8',
    to: 'translate-y-0',
  },
  right: {
    from: 'translate-x-8',
    to: 'translate-x-0',
  },
  bottom: {
    from: 'translate-y-8',
    to: 'translate-y-0',
  },
  left: {
    from: '-translate-x-8',
    to: 'translate-x-0',
  },
};

export default function Modal({
  open,
  isLoading = false,
  onClose,
  onCloseComplete = () => {},
  title,
  children,
  actions,
  size = 'medium',
  slideFrom = 'top',
}: Props) {
  return (
    <Transition.Root show={open} afterLeave={onCloseComplete}>
      <Dialog
        onClose={isLoading ? () => {} : onClose}
        className="relative z-50"
      >
        {/* Background overlay */}
        <Transition.Child
          enter="transition ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={twMerge(
              'fixed inset-0 bg-opacity-75 transition-opacity',
              'bg-neutral'
            )}
          ></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* Modal panel */}
            <Transition.Child
              enter="transition ease-out"
              enterFrom={twMerge('opacity-0', slideFromClasses[slideFrom].from)}
              enterTo={twMerge('opacity-100', slideFromClasses[slideFrom].to)}
              leave="transition ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={twMerge(
                  'relative w-full overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8',
                  sizeClasses[size]
                )}
              >
                <div className="bg-white p-4 sm:p-6">
                  <div className="text-center sm:text-left">
                    <Dialog.Title className="text-xl font-semibold leading-6 text-slate-900">
                      {title}
                    </Dialog.Title>
                    {children}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 border-t p-4 sm:flex-row-reverse">
                  <button
                    disabled={isLoading}
                    className="btn btn-primary rounded-lg px-6 font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
                    onClick={actions.confirm.action}
                  >
                    <span className="flex items-center gap-3">
                      {isLoading && (
                        <span className="loading loading-spinner loading-sm"></span>
                      )}

                      <span>{actions.confirm.label}</span>
                    </span>
                  </button>

                  {actions.cancel && (
                    <button
                      disabled={isLoading}
                      className="btn btn-outline btn-primary rounded-lg font-semibold shadow-sm"
                      onClick={
                        actions.cancel.action ? actions.cancel.action : onClose
                      }
                    >
                      <span>{actions.cancel.label}</span>
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
