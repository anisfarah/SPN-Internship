'use client';

import { MissionStepsProps, StepsProps } from '@/types/steps.type';
import moment from 'moment/moment';
import { usePathname, useRouter } from 'next/navigation';

import { capitalize, isEmpty } from '../../utils/inputHelpers';

function Steps(props: StepsProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="grid w-full grid-flow-col place-items-stretch overflow-hidden">
        {props.titles
          ? props.titles.map((element, idx, { length }) => (
              <div
                key={idx}
                className={`relative my-6 flex min-w-28 max-w-full flex-col items-center justify-center gap-2 ${
                  idx === 0
                    ? 'place-self-start'
                    : idx === length - 1
                      ? 'place-self-end'
                      : 'place-self-center'
                }`}
              >
                <div
                  className={`flex aspect-square size-8 items-center justify-center rounded-full bg-bgColor ${
                    props.step < idx ? 'shadow-inner outline-none' : 'cursor-pointer shadow-outer'
                  }`}
                  onClick={() => {
                    if (idx <= props.step) {
                      if (!isEmpty(props.disabledStep)) {
                        if (props.disabledStep !== idx) {
                          router.push(pathname + '?' + 'step=' + idx);
                        }
                      } else {
                        router.push(pathname + '?' + 'step=' + idx);
                      }
                    }
                  }}
                >
                  <div
                    className={`font-text text-lg font-medium ${
                      props.step >= idx ? 'text-primary' : 'text-toggleAccent'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx === 0 && (
                    <div className="absolute left-0 top-0 z-[-1] h-full w-1/2 bg-bgColor" />
                  )}
                  {idx > 0 && (
                    <div
                      className={`absolute right-1/2 top-4 flex h-px w-[27rem] -translate-y-1/2 items-center justify-center ${
                        props.step >= idx ? 'bg-primary' : 'bg-toggleAccent'
                      } ${
                        idx === 0
                          ? 'z-[-2]'
                          : idx === 1
                            ? 'z-[-3]'
                            : idx === 2
                              ? 'z-[-4]'
                              : idx === 3
                                ? 'z-[-5]'
                                : idx === 4
                                  ? 'z-[-6]'
                                  : idx === 5
                                    ? 'z-[-7]'
                                    : idx === 6
                                      ? 'z-[-8]'
                                      : idx === 7
                                        ? 'z-[-9]'
                                        : idx === 8
                                          ? '-z-10'
                                          : idx === 9
                                            ? 'z-[-11]'
                                            : '-z-20'
                      }`}
                    />
                  )}
                </div>
                <p
                  className={`overflow-hidden text-ellipsis text-center font-text text-sm ${
                    props.step >= idx ? 'text-primary' : 'text-toggleAccent'
                  }`}
                >
                  {element}
                </p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
function MissionSteps(props: MissionStepsProps) {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="mx-4 grid w-full grid-flow-col place-items-stretch gap-12 overflow-hidden">
        {props.data?.map((element, idx, { length }) => (
          <div
            key={idx}
            className={`relative flex min-w-28 max-w-full flex-col items-center justify-center gap-1 ${
              idx === 0
                ? 'place-self-start'
                : idx === length - 1
                  ? 'place-self-end'
                  : 'place-self-center'
            }`}
          >
            <div
              className={`flex aspect-square size-8 items-center justify-center rounded-full bg-bgColor ${
                !element.date
                  ? 'shadow-[inset_6px_8px_5px_rgba(174,176,214,.3),inset_-5px_-10px_7px_rgba(255,255,255,.7)] outline-none'
                  : 'shadow-[12px_12px_25px_0px_rgba(174,176,214,.5),-10px_-10px_20px_0px_rgba(255,255,255,1)]'
              }`}
            >
              <div
                className={`font-text text-lg font-medium ${
                  element.date
                    ? props.colorsList[element.value].color === 'green'
                      ? 'text-green'
                      : props.colorsList[element.value].color === 'orange'
                        ? 'text-orange'
                        : props.colorsList[element.value].color === 'red'
                          ? 'text-red'
                          : props.colorsList[element.value].color === 'yellow'
                            ? 'text-yellow'
                            : props.colorsList[element.value].color === 'blue'
                              ? 'text-blue'
                              : props.colorsList[element.value].color === 'brown'
                                ? 'text-brown'
                                : props.colorsList[element.value].color === 'gray'
                                  ? 'text-grey'
                                  : props.colorsList[element.value].color === 'grey'
                                    ? 'text-grey'
                                    : props.colorsList[element.value].color === 'pink'
                                      ? 'text-pink'
                                      : props.colorsList[element.value].color === 'purple'
                                        ? 'text-purple'
                                        : props.colorsList[element.value].color === 'turquoise'
                                          ? 'text-turquoise'
                                          : props.colorsList[element.value].color === 'teal'
                                            ? 'text-teal-600'
                                            : 'text-primary'
                    : 'text-toggleAccent/70'
                }`}
              >
                {element.order}
              </div>
              {idx === 0 && (
                <div className="absolute left-0 top-0 z-[-1] h-full w-1/2 bg-bgColor" />
              )}
              {idx > 0 && (
                <div
                  className={`absolute right-1/2 top-4 flex h-px w-[27rem] -translate-y-1/2 items-center justify-center ${
                    element.date
                      ? props.colorsList[element.value].color === 'green'
                        ? 'bg-green'
                        : props.colorsList[element.value].color === 'orange'
                          ? 'bg-orange'
                          : props.colorsList[element.value].color === 'red'
                            ? 'bg-red'
                            : props.colorsList[element.value].color === 'yellow'
                              ? 'bg-yellow'
                              : props.colorsList[element.value].color === 'blue'
                                ? 'bg-blue'
                                : props.colorsList[element.value].color === 'brown'
                                  ? 'bg-brown'
                                  : props.colorsList[element.value].color === 'gray'
                                    ? 'bg-grey'
                                    : props.colorsList[element.value].color === 'grey'
                                      ? 'bg-grey'
                                      : props.colorsList[element.value].color === 'purple'
                                        ? 'bg-purple'
                                        : props.colorsList[element.value].color === 'pink'
                                          ? 'bg-pink'
                                          : props.colorsList[element.value].color === 'turquoise'
                                            ? 'bg-turquoise'
                                            : props.colorsList[element.value].color === 'teal'
                                              ? 'bg-teal-600'
                                              : 'bg-primary'
                      : 'bg-toggleAccent/70'
                  } ${
                    idx === 0
                      ? 'z-[-2]'
                      : idx === 1
                        ? 'z-[-3]'
                        : idx === 2
                          ? 'z-[-4]'
                          : idx === 3
                            ? 'z-[-5]'
                            : idx === 4
                              ? 'z-[-6]'
                              : idx === 5
                                ? 'z-[-7]'
                                : idx === 6
                                  ? 'z-[-8]'
                                  : idx === 7
                                    ? 'z-[-9]'
                                    : idx === 8
                                      ? '-z-10'
                                      : idx === 9
                                        ? 'z-[-11]'
                                        : '-z-20'
                  }`}
                />
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <p
                className={`overflow-hidden text-ellipsis text-center font-text text-sm ${
                  element.date ? 'text-black' : 'text-toggleAccent/70'
                }`}
              >
                {capitalize(element.value)}
              </p>
              <p
                className={`overflow-hidden text-ellipsis text-center font-text text-xs ${
                  element.date ? 'text-black' : 'text-toggleAccent/70 opacity-0'
                }`}
              >
                {element.date ? (
                  moment.utc(element.date).format('DD/MM/YYYY HH:mm')
                ) : (
                  <span>&nbsp;</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Steps;
export { MissionSteps };
