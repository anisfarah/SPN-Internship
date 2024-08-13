'use client';

import { useModal } from '@/helpers/modalHelper';

import AddIcon from '../icons/addIcon';
import EditIcon from '../icons/editIcon';

function AddButtonModal(props: any) {
  const { setIsOpen, setTitle, setContent } = useModal();
  const openModal = () => {
    setTitle(props.title);
    setContent(props.content);
    setIsOpen(true);
  };

  return (
    <button onClick={openModal}>
      {props.icon === 'edit' ? (
        <EditIcon className="size-4 cursor-pointer md:size-5" />
      ) : (
        props.icon || <AddIcon className="size-3 cursor-pointer" />
      )}
    </button>
  );
}

export default AddButtonModal;
