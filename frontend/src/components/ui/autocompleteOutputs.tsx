import Image from 'next/image';

import { isEmpty } from '../../utils/inputHelpers';

function customerOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {!isEmpty(option.firstname) && !isEmpty(option.lastname)
          ? `${option.firstname} ${option.lastname}`
          : `${option.email}`}
      </span>
    </div>
  );
}
function currencyOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs">
      <span className="font-light capitalize">{`${option.code} - ${option.label}`}</span>
    </div>
  );
}
function manufacturerOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs">
      <span className="font-light capitalize">{option.title}</span>
    </div>
  );
}
export function output(option: string) {
  return (
    <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs text-black">
      <span className="font-light capitalize">{option}</span>
    </div>
  );
}
function agencyOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {`${option.name} | ${option.town} - ${option.country}`}
      </span>
    </div>
  );
}
function countryOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-3 overflow-hidden text-xs">
      <span className="relative size-6">
        <Image
          src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${option?.code?.toLowerCase()}.svg`}
          alt={`${option?.name}'s flag`}
          sizes="(max-width: 768px) 40px,30px"
          fill
          className="object-contain"
        />
      </span>
      <span className="font-light capitalize">{option.name}</span>
    </div>
  );
}
function vehicleOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-between gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {`${option.options.manufacturer} ${option.options.model} ${option.options.year}`}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`size-4 ${
            option.options.exterior_color === 'WHITE'
              ? 'bg-white'
              : option.options.exterior_color === 'BLACK'
                ? 'bg-black'
                : option.options.exterior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.options.exterior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.options.exterior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.options.exterior_color === 'RED'
                        ? 'bg-red'
                        : option.options.exterior_color === 'GREEN'
                          ? 'bg-green'
                          : option.options.exterior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.options.exterior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.options.exterior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
        <div
          className={`size-4 ${
            option.options.interior_color === 'WHITE'
              ? 'bg-white'
              : option.options.interior_color === 'BLACK'
                ? 'bg-black'
                : option.options.interior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.options.interior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.options.interior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.options.interior_color === 'RED'
                        ? 'bg-red'
                        : option.options.interior_color === 'GREEN'
                          ? 'bg-green'
                          : option.options.interior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.options.interior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.options.interior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
      </div>
    </div>
  );
}
function vehicleOutput2(option: any) {
  return (
    <div className="flex w-full items-center justify-between gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {`${option.manufacturer} ${option.model} ${option.year}`}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`size-4 ${
            option.exterior_color === 'WHITE'
              ? 'bg-white'
              : option.exterior_color === 'BLACK'
                ? 'bg-black'
                : option.exterior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.exterior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.exterior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.exterior_color === 'RED'
                        ? 'bg-red'
                        : option.exterior_color === 'GREEN'
                          ? 'bg-green'
                          : option.exterior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.exterior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.exterior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
        <div
          className={`size-4 ${
            option.interior_color === 'WHITE'
              ? 'bg-white'
              : option.interior_color === 'BLACK'
                ? 'bg-black'
                : option.interior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.interior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.interior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.interior_color === 'RED'
                        ? 'bg-red'
                        : option.interior_color === 'GREEN'
                          ? 'bg-green'
                          : option.interior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.interior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.interior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
      </div>
    </div>
  );
}
function carOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-between gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {`${option.options.vehicle.manufacturer} ${option.options.vehicle.model} ${option.options.vehicle.year} | ${option.options.plate_number} `}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`size-4 ${
            option.options.vehicle.exterior_color === 'WHITE'
              ? 'bg-white'
              : option.options.vehicle.exterior_color === 'BLACK'
                ? 'bg-black'
                : option.options.vehicle.exterior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.options.vehicle.exterior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.options.vehicle.exterior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.options.vehicle.exterior_color === 'RED'
                        ? 'bg-red'
                        : option.options.vehicle.exterior_color === 'GREEN'
                          ? 'bg-green'
                          : option.options.vehicle.exterior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.options.vehicle.exterior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.options.vehicle.exterior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
        <div
          className={`size-4 ${
            option.options.vehicle.interior_color === 'WHITE'
              ? 'bg-white'
              : option.options.vehicle.interior_color === 'BLACK'
                ? 'bg-black'
                : option.options.vehicle.interior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.options.vehicle.interior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.options.vehicle.interior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.options.vehicle.interior_color === 'RED'
                        ? 'bg-red'
                        : option.options.vehicle.interior_color === 'GREEN'
                          ? 'bg-green'
                          : option.options.vehicle.interior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.options.vehicle.interior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.options.vehicle.interior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
      </div>
    </div>
  );
}
function carOutput2(option: any) {
  return (
    <div className="flex w-full items-center justify-between gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">
        {`${option.vehicle.manufacturer} ${option.vehicle.model} ${option.vehicle.year} | ${option.plate_number} `}
      </span>
      <div className="flex items-center gap-2">
        <div
          className={`size-4 ${
            option.vehicle.exterior_color === 'WHITE'
              ? 'bg-white'
              : option.vehicle.exterior_color === 'BLACK'
                ? 'bg-black'
                : option.vehicle.exterior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.vehicle.exterior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.vehicle.exterior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.vehicle.exterior_color === 'RED'
                        ? 'bg-red'
                        : option.vehicle.exterior_color === 'GREEN'
                          ? 'bg-green'
                          : option.vehicle.exterior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.vehicle.exterior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.vehicle.exterior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
        <div
          className={`size-4 ${
            option.vehicle.interior_color === 'WHITE'
              ? 'bg-white'
              : option.vehicle.interior_color === 'BLACK'
                ? 'bg-black'
                : option.vehicle.interior_color === 'GREY'
                  ? 'bg-gray-400'
                  : option.vehicle.interior_color === 'BROWN'
                    ? 'bg-brown'
                    : option.vehicle.interior_color === 'BLUE'
                      ? 'bg-cyan-600'
                      : option.vehicle.interior_color === 'RED'
                        ? 'bg-red'
                        : option.vehicle.interior_color === 'GREEN'
                          ? 'bg-green'
                          : option.vehicle.interior_color === 'ORANGE'
                            ? 'bg-orange'
                            : option.vehicle.interior_color === 'BEIGE'
                              ? 'bg-amber-800'
                              : option.vehicle.interior_color === 'CAMEL'
                                ? 'bg-amber-500'
                                : ''
          } rounded-full`}
        />
      </div>
    </div>
  );
}
function googleMapsOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">{option.description}</span>
    </div>
  );
}
function referenceOutput(option: any) {
  return (
    <div className="flex w-full items-center justify-start gap-6 overflow-hidden text-xs">
      <span className="font-light capitalize">{`Mission #${option.reference?.slice(-4)}`}</span>
    </div>
  );
}

export {
  agencyOutput,
  countryOutput,
  manufacturerOutput,
  currencyOutput,
  customerOutput,
  googleMapsOutput,
  referenceOutput,
  carOutput,
  carOutput2,
  vehicleOutput,
  vehicleOutput2
};
