'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef
} from 'react';

import Modal from '@/components/ui/modal';

interface ModalContextValue {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  content: ReactNode;
  setContent: Dispatch<SetStateAction<ReactNode>>;
  mobileOnly: boolean;
  setMobileOnly: Dispatch<SetStateAction<boolean>>;
  archive: boolean;
  setArchive: Dispatch<SetStateAction<boolean>>;
  withButton: boolean;
  setWithButton: Dispatch<SetStateAction<boolean>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  handleSubmit: ((e: React.MouseEvent<HTMLButtonElement>) => void) | null;
  setHandleSubmit: Dispatch<
    SetStateAction<((e: React.MouseEvent<HTMLButtonElement>) => void) | null>
  >;
  closeManually: boolean;
  setCloseManually: Dispatch<SetStateAction<boolean>>;
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  confirm: (() => void) | null;
  setConfirm: Dispatch<SetStateAction<(() => void) | null>>;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);

  //TODO : CLEAN STATES

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<ReactNode>(null);
  const [mobileOnly, setMobileOnly] = useState(false);
  const [archive, setArchive] = useState(false);
  const [withButton, setWithButton] = useState(false);
  const [type, setType] = useState('');
  const [handleSubmit, setHandleSubmit] = useState<
    ((e: React.MouseEvent<HTMLButtonElement>) => void) | null
  >(null);
  const [closeManually, setCloseManually] = useState(false);
  const [label, setLabel] = useState('');
  const [confirm, setConfirm] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (content) setIsOpen(true);
    else setIsOpen(false);
  }, [content, setIsOpen]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setContent(null);
        setTitle('');
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        title,
        setTitle,
        content,
        setContent,
        mobileOnly,
        setMobileOnly,
        archive,
        setArchive,
        withButton,
        setWithButton,
        type,
        setType,
        handleSubmit,
        setHandleSubmit,
        closeManually,
        setCloseManually,
        label,
        setLabel,
        confirm,
        setConfirm,
        ref
      }}
    >
      {children}
      <Modal />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
