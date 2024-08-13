import { useModal } from '@/helpers/modalHelper';

import ArrowIcon from '../icons/arrowIcons';
import Button from './buttons';
import { Subtitle } from './texts';

function Modal() {
  const {
    isOpen,
    setIsOpen,
    title,
    content,
    mobileOnly,
    archive,
    withButton,
    type,
    handleSubmit,
    closeManually,
    label,
    ref,
    confirm
  } = useModal();

  //TODO: Replace open (isOpen , setIsOpen) logic with content (conent,  setConent)

  return (
    <div
      className={`fixed left-0 top-0 z-[49] flex size-full items-center justify-center transition-all duration-200 ${
        isOpen ? 'visible bg-black/50' : 'invisible bg-black/0'
      }`}
    >
      <div
        ref={ref}
        className={`z-50 mx-5 flex max-h-[85vh] w-full max-w-3xl flex-col items-center justify-center rounded-3xl bg-bgColor text-black sm:mx-10 ${
          mobileOnly ? 'lg:hidden' : 'lg:pt-10'
        } p-4 lg:p-10 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex w-full flex-col items-start justify-start gap-2 overflow-hidden">
          <div className="flex size-full items-center justify-between px-10 py-4">
            <div onClick={() => setIsOpen(false)} className="cursor-pointer">
              <ArrowIcon className="size-4 fill-black" />
            </div>
            <div>
              <Subtitle>{title}</Subtitle>
            </div>
            <div />
          </div>
          <div className="size-full max-h-[70vh] overflow-auto">
            <div className="mx-auto w-full p-2">{content}</div>
          </div>
        </div>
        <div className="w-full py-10">
          {archive ? (
            <div className="flex items-center justify-center gap-12">
              <div className="w-32">
                <Button type="button" onClick={confirm} label="Yes" />
              </div>
              <div className="w-32">
                <Button type="button" onClick={() => setIsOpen(false)} label="No" />
              </div>
            </div>
          ) : (
            withButton && (
              <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
                <div className="w-52">
                  <Button
                    type={type}
                    withArrow
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      if (handleSubmit) {
                        if (closeManually) handleSubmit(e);
                        else {
                          handleSubmit(e);
                          setIsOpen(false);
                        }
                      }
                    }}
                    label={label}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default Modal;
