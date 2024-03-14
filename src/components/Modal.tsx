import { Dialog, Transition } from '@headlessui/react';
import { useBlocker } from '@tanstack/react-router';
import { Fragment, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export type ModalProps = {
  open: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onCloseComplete?: () => void;
};

type BaseProps = ModalProps & {
  title: string;
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  slideFrom?: 'top' | 'right' | 'bottom' | 'left';
};

type FormAction = { type: 'form' };

type ActionButton = {
  type: 'action';
  actions: {
    confirm: {
      label: string;
      action: () => void;
      disabled?: boolean;
    };
    cancel?: {
      label: string;
      action?: () => void;
    };
  };
};

type Props = BaseProps & (FormAction | ActionButton);

const sizeClasses: Record<NonNullable<Props['size']>, string> = {
  small: 'sm:max-w-sm',
  medium: 'sm:max-w-lg',
  large: 'sm:max-w-2xl',
};

const slideFromClasses: Record<
  NonNullable<Props['slideFrom']>,
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

export default function Modal(props: Props) {
  const {
    open,
    isLoading = false,
    onClose,
    onCloseComplete = () => {},
    title,
    children,
    type,
    size = 'medium',
    slideFrom = 'top',
  } = props;

  useBlocker(
    () =>
      window.confirm(
        'Are you sure you want to leave? Continuing may lead to potential loss of funds.'
      ),
    open
  );

  return (
    <Transition appear show={open} as={Fragment} afterLeave={onCloseComplete}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={isLoading ? () => {} : onClose}
      >
        {/* Background overlay */}
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
              enter="transition ease-out"
              enterFrom={twMerge('opacity-0', slideFromClasses[slideFrom].from)}
              enterTo={twMerge('opacity-100', slideFromClasses[slideFrom].to)}
              leave="transition ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className={twMerge(
                  'w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:rounded-2xl',
                  sizeClasses[size]
                )}
              >
                <div className="bg-white p-4 sm:p-6">
                  <div className="text-center sm:text-left">
                    <Dialog.Title className="mb-4 text-xl font-semibold leading-6 text-slate-900 first-letter:capitalize">
                      {title}
                    </Dialog.Title>

                    {children}
                  </div>
                </div>

                {/* Action buttons */}
                {type === 'action' &&
                  (() => {
                    const { confirm, cancel } = props.actions;

                    return (
                      <div className="flex flex-col gap-2 border-t p-4 sm:flex-row-reverse">
                        <button
                          onClick={confirm.action}
                          disabled={isLoading || confirm.disabled}
                          className="btn btn-primary rounded-lg px-6 font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
                        >
                          <span className="flex items-center gap-3">
                            {isLoading && (
                              <span className="loading loading-spinner loading-sm"></span>
                            )}

                            <span className="capitalize">{confirm.label}</span>
                          </span>
                        </button>

                        {cancel && (
                          <button
                            onClick={cancel.action ? cancel.action : onClose}
                            disabled={isLoading}
                            className="btn btn-outline btn-primary rounded-lg font-semibold shadow-sm"
                          >
                            <span className="capitalize">{cancel.label}</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
