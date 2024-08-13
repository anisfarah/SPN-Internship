export type ModalProps = {
  title: string;
  mandatory: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<boolean>;
  scroll: boolean;
};
