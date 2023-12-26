import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

export default function Drawer({
  isOpen,
  handleClose,
  children
}: {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md font-sans">
                  <div className="flex h-screen flex-col overflow-y-scroll shadow-xl">
                    {children}

                    {/* <div className="px-4 sm:px-6">
											<Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
												Panel title
											</Dialog.Title>
											<button
												type="button"
												className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												onClick={handleClose}
											>
												<span className="sr-only">Close panel</span>
												<XMarkIcon className="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
										<div className="relative mt-6 flex-1 px-4 sm:px-6"></div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  // return (
  // 	<main
  // 		className={
  // 			" fixed h-screen overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
  // 			(isOpen
  // 				? " transition-opacity opacity-100 duration-500 translate-x-0  "
  // 				: " transition-all delay-500 opacity-0 translate-x-full")
  // 		}
  // 	>
  // 		<section
  // 			className={
  // 				" w-[80vw] max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
  // 				(isOpen ? " translate-x-0 " : " translate-x-full ")
  // 			}
  // 		>
  // 			<article className="relative w-full max-w-lg flex flex-col space-y-2 overflow-y-scroll h-full">
  // 				<div className="flex flex-column justify-start items-center">
  // 					{children}
  // 				</div>
  // 			</article>
  // 		</section>
  // 		<section
  // 			className="w-screen h-full cursor-pointer "
  // 			onClick={() => {
  // 				handleClose();
  // 			}}
  // 		></section>
  // 	</main>
  // );
}
