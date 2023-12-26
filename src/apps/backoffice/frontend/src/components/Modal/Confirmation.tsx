import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '../Button';
import Modal, { ModalProps } from './index';

export default function ConfirmationDialog({
  open,
  onClose,
  title,
  description,
  okLabel,
  cancelLabel,
  onConfirm
}: ModalProps & {
  title: string;
  description: string;
  okLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <>
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-red-600"
                aria-hidden="true"
              />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title
                as="h3"
                className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-300"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-pre-wrap">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 flex flex-col gap-2 sm:flex-row-reverse sm:px-6">
          <Button
            type="button"
            // className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={onConfirm}
          >
            {okLabel ? okLabel : 'Ok'}
          </Button>
          <Button
            variant="outlined"
            // type="button"
            // className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              onClose && onClose();
            }}
          >
            {cancelLabel ? cancelLabel : 'Cancel'}
          </Button>
        </div>
      </>
    </Modal>
  );
}
