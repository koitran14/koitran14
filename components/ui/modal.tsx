"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import { IconButton } from "@chakra-ui/react";

interface ModalProps{
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    open,
    onClose,
    children
}) => {
    return ( 
        <Transition show={open} appear as={Fragment}>
            
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black bg-opacity-50"/>

                <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                    <div className="flex max-w-[96%] items-center justify-center text-center align-middle">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100" 
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md max-h-screen h-full overflow-hidden align-middle">
                                <div className="relative rounded-lg flex w-fit items-center overflow-hidden p-1 bg-white shadow-2xl justify-center">
                                    <div className="absolute right-4 top-4 z-10 rounded-full">
                                        <IconButton 
                                            aria-label={"close"}  
                                            variant="solid"
                                            bg={"gray.400"}
                                            onClick={onClose}
                                            icon={<X size={15} color="white"/>}
                                            size="sm" 
                                            _hover={{ opacity: 0.6 }}
                                        />    
                                    </div>
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
 
export default Modal;