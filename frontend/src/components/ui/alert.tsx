import { useAlert } from '@/helpers/alertHelper';
import { useEffect } from 'react';

/**
 * Alert component displays a toast message with a close button
 *
 * @param {{alert: AlertState | null, setAlert: Dispatch<SetStateAction<AlertState | null>>}} props
 * @returns {React.JSX.Element | null}
 */
function Alert(): React.JSX.Element | null {
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 4000);
    }
  }, [alert, setAlert]);

  return alert?.message?.length ? (
    <div className="fixed bottom-20 z-50 flex w-full items-center justify-center lg:w-1/3">
      <div
        className={`flex size-fit items-center justify-center rounded-full py-3 shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)] ${alert.status === 200 || alert.status === 201 ? 'bg-green' : 'bg-red'}`}
      >
        <div className="mx-auto flex items-center justify-center px-6">
          <div className="text-bgColor">{alert.message}</div>
        </div>
        <div
          className="mr-2 size-5 cursor-pointer stroke-white px-6"
          onClick={() => setAlert(null)}
        >
          <svg className="size-5" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  ) : null;
}
export default Alert;
