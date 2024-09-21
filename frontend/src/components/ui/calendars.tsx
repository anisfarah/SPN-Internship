'use client';

import CalendarData from '@/data/calendar.json';
import {
  CalendarHeaderProps,
  DayCalendarProps,
  EventProps,
  FullCalendarProps,
  MonthCalendarProps,
  WeekCalendarProps
} from '@/types/calendars.type';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { FilledArrowIcon } from '../icons/arrowIcons';
import CalendarIcon from '../icons/calendarIcon';
import ChevronIcon from '../icons/chevronIcon';
import DoubleArrowIcon from '../icons/doubleArrowIcon';
import XIcon from '../icons/xIcon';
import { RoundedButton } from './buttons';
import { CalendarCategory, CalendarText, Category, Title } from './texts';

/**
 * Calendar component that displays a calendar with the ability to select a date
 * and optionally time. The component supports navigation through months and years.
 *
 * @param props - The properties for the calendar component
 * @returns The rendered calendar component
 */
function FullCalendar(props: FullCalendarProps) {
  // State variables to control the display of months and years
  const [isMonths, setIsMonths] = useState(false);
  const [isYears, setIsYears] = useState(false);

  // State variable to store the current date
  const [currentDate, setCurrentDate] = useState(
    props.initialValue ? new Date(props.initialValue) : new Date()
  );

  // Get the current date
  const date = new Date();

  // Array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Reference to the calendar container
  const myRef = useRef<HTMLDivElement>(null);

  // Function to get the number of days in the current month
  function daysInMonth() {
    return new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  }

  // Function to get the number of days in the previous month
  function daysInLastMonth() {
    let m = 11;
    if (currentDate.getMonth() > 0) m = currentDate.getMonth() - 1;

    return new Date(currentDate.getFullYear(), m + 1, 0).getDate();
  }

  // Function to get the starting day of the month
  function startOfMonth() {
    let test = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    if (test === 0) test = 6;
    else test -= 1;

    return test;
  }

  // Function to get a passed date
  function getPassedDate(day: number) {
    const month = currentDate.getMonth() - 1;
    let m = 11;
    let year = currentDate.getFullYear();
    if (month > 0 && month < 11) m = month - 1;
    else year -= 1;

    return new Date(year, m + 1, day);
  }

  // Function to compare two dates
  function compareDates(date1: Date | null, date2: Date | null) {
    if (!date1 || !date2) return false;

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  // Function to handle year selection
  const handleYearSelect = (year: any) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setIsYears(false);
  };

  // Render the calendar component
  return (
    <div tabIndex={-1} className={`relative mx-auto flex w-full max-w-md shrink-0 grow-0`}>
      <div
        className={`relative mx-auto w-full max-w-md rounded-md py-4 ${
          props.withTime
            ? 'pointer-events-auto h-[27rem] px-2 py-1'
            : 'pointer-events-auto h-[21rem] px-2 py-1'
        } flex flex-col gap-4 py-2 duration-200`}
      >
        {/* Calendar header that contains arrows and month */}
        <div className="flex items-center justify-between">
          {/* Month header */}
          <div
            className={`flex w-48 items-center justify-between p-2 ${
              isYears ? 'pointer-events-none' : ''
            }`}
            ref={props.headerRef}
          >
            <Category>
              <RoundedButton
                className="size-7"
                onClick={() =>
                  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
                }
                label={<ChevronIcon className="size-3 rotate-180" />} // Adjust icon size if necessary
                disabled={
                  (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) <= date &&
                    !props.withPast) ||
                  isYears
                }
              />
            </Category>
            <Category>
              <span
                className={`flex cursor-pointer items-center justify-center gap-2 text-sm uppercase ${
                  isYears ? 'text-gray-400' : ''
                }`}
                onClick={() => {
                  setIsMonths(!isMonths);
                  setIsYears(false);
                }}
              >
                {monthNames[currentDate.getMonth()]}
                <FilledArrowIcon
                  className={`${isMonths ? 'rotate-0' : 'rotate-180'} size-2 duration-300 ease-in-out ${
                    isYears ? 'pointer-events-none opacity-50' : ''
                  }`} // Possibly adjust icon size for visual balance
                />
              </span>
            </Category>
            <Category>
              <RoundedButton
                className="size-7"
                onClick={() =>
                  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
                }
                label={<ChevronIcon className="size-3" />}
                disabled={
                  (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1) > date &&
                    !props.withFuture) ||
                  isYears
                } // Ensures that navigation is disabled if the next month is not allowed
              />
            </Category>
          </div>

          {/* YEARS header */}
          <div
            className={`flex w-44 items-center justify-between gap-5 p-2 ${
              isMonths ? 'pointer-events-none' : ''
            }`}
            ref={props.headerRef}
          >
            <Category>
              <RoundedButton
                className="size-7"
                onClick={() => {
                  setCurrentDate(
                    new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1)
                  );
                  setIsYears(false); // Close years selection after selecting a year
                }}
                label={<ChevronIcon className="size-3 rotate-180" />} // Adjust icon size for a balanced look
                disabled={
                  isMonths ||
                  (new Date().getFullYear() > currentDate.getFullYear() - 1 && !props.withPast)
                }
              />
            </Category>
            <Category>
              <span
                className={`flex cursor-pointer items-center justify-center gap-2 text-sm uppercase ${
                  isMonths ? 'text-gray-400' : ''
                }`}
                onClick={() => {
                  setIsYears(!isYears);
                  setIsMonths(false); // Close months selection when opening years
                }}
              >
                {currentDate.getFullYear()} {/* Display the current year */}
                <FilledArrowIcon
                  className={`${isYears ? 'rotate-0' : 'rotate-180'} size-2 duration-300 ease-in-out ${
                    isMonths ? 'pointer-events-none opacity-50' : ''
                  }`} // Adjust icon size for visual balance
                />
              </span>
            </Category>
            <Category>
              <RoundedButton
                className="size-7"
                onClick={() => {
                  setCurrentDate(
                    new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1)
                  );
                  setIsYears(false); // Close years selection after selecting a year
                }}
                label={<ChevronIcon className="size-3" />} // Adjust icon size if necessary
                disabled={
                  isMonths ||
                  (new Date().getFullYear() < currentDate.getFullYear() + 1 && !props.withFuture)
                } // Disable the button if month selection is active
              />
            </Category>
          </div>
        </div>

        {isMonths || isYears ? (
          <div className="relative mt-4 flex size-full h-40 flex-col justify-start gap-1 overflow-auto scroll-smooth p-2">
            {isMonths &&
              monthNames.map((month, index) => (
                <div
                  key={month}
                  className={`${index === currentDate.getMonth() && 'bg-primary text-white'} cursor-pointer rounded-2xl px-4 py-1 text-sm text-black hover:bg-primary hover:text-white`}
                  ref={index === currentDate.getMonth() ? myRef : null}
                  onClick={() => {
                    setCurrentDate(new Date(currentDate.getFullYear(), index));
                    setIsMonths(false);
                    // navigateMonths(index);
                  }}
                >
                  {month}
                </div>
              ))}
            {isYears &&
              Array.from({
                length:
                  props.withFuture && props.withPast
                    ? new Date().getFullYear() - 1930 + 10
                    : props.withPast
                      ? new Date().getFullYear() - 1930 + 1
                      : props.withFuture
                        ? 25
                        : 10
              }).map((_, index) => {
                const year =
                  (props.withFuture && props.withPast) || props.withPast
                    ? 1930 + index
                    : props.withFuture
                      ? new Date().getFullYear() + index
                      : new Date().getFullYear() - 5 + index;

                return (
                  <div
                    key={year}
                    className={`${year === currentDate.getFullYear() && 'bg-primary text-white'} cursor-pointer rounded-2xl px-4 py-1 text-sm text-black hover:bg-primary hover:text-white`}
                    ref={year === currentDate.getFullYear() ? myRef : null}
                    onClick={() => handleYearSelect(year)}
                  >
                    {year}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="relative flex w-full flex-col gap-6">
            <div className="relative flex w-full flex-col items-center justify-center">
              <div className="grid w-full grid-cols-7 py-2 text-sm font-light text-primary">
                <CalendarCategory>mon</CalendarCategory>
                <CalendarCategory>tue</CalendarCategory>
                <CalendarCategory>wed</CalendarCategory>
                <CalendarCategory>thu</CalendarCategory>
                <CalendarCategory>fri</CalendarCategory>
                <CalendarCategory>sat</CalendarCategory>
                <CalendarCategory>sun</CalendarCategory>
              </div>
              <div className="grid w-full grid-cols-7 justify-items-center text-sm font-light">
                {[...Array(startOfMonth())].map((x, i) => (
                  <span
                    key={i}
                    className={`flex size-8 grow items-center justify-center ${
                      !props.withPast
                        ? date > getPassedDate(daysInLastMonth() + i - startOfMonth() + 1)
                          ? 'cursor-not-allowed text-gray-500'
                          : compareDates(
                                getPassedDate(daysInLastMonth() + i - startOfMonth() + 1),
                                props.selected
                              )
                            ? 'cursor-pointer rounded-full bg-primary text-white'
                            : 'cursor-pointer rounded-full text-textColor hover:bg-secondary hover:text-white'
                        : !props.withFuture &&
                            date < getPassedDate(daysInLastMonth() + i - startOfMonth() + 1)
                          ? 'cursor-not-allowed text-gray-500'
                          : compareDates(
                                getPassedDate(daysInLastMonth() + i - startOfMonth() + 1),
                                props.selected
                              )
                            ? 'cursor-pointer rounded-full bg-primary text-white'
                            : 'cursor-pointer rounded-full text-textColor hover:bg-secondary hover:text-white'
                    }`}
                    onClick={() => {
                      if (
                        (!props.withPast || props.withFuture) &&
                        new Date(date.getFullYear(), date.getMonth(), i + 1, 0, 0) <
                          getPassedDate(daysInLastMonth() + i - startOfMonth() + 1)
                      ) {
                        props.setSelected(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() - 1,
                            daysInLastMonth() + i - startOfMonth() + 1,
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getHours()
                              : currentDate.getHours(),
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getMinutes()
                              : currentDate.getMinutes()
                          )
                        );
                      } else if (
                        props.withPast &&
                        new Date(date.getFullYear(), date.getMonth(), i + 1, 0, 0) >
                          getPassedDate(daysInLastMonth() + i - startOfMonth() + 1)
                      ) {
                        props.setSelected(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth() - 1,
                            daysInLastMonth() + i - startOfMonth() + 1,
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getHours()
                              : currentDate.getHours(),
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getMinutes()
                              : currentDate.getMinutes()
                          )
                        );
                      }
                    }}
                  >
                    <CalendarText>{daysInLastMonth() + i - startOfMonth() + 1}</CalendarText>
                  </span>
                ))}
                {[...Array(daysInMonth())].map((x, i) => (
                  <span
                    key={i}
                    className={`flex size-8 items-center justify-center ${
                      !props.withPast
                        ? date > new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 2)
                          ? 'cursor-not-allowed text-gray-500'
                          : compareDates(
                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
                                props.selected
                              )
                            ? 'cursor-pointer rounded-full bg-primary text-white'
                            : 'cursor-pointer rounded-full text-textColor hover:bg-secondary hover:text-white'
                        : !props.withFuture &&
                            date <
                              new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
                          ? 'cursor-not-allowed text-gray-500'
                          : compareDates(
                                new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1),
                                props.selected
                              )
                            ? 'cursor-pointer rounded-full bg-primary text-white'
                            : 'cursor-pointer rounded-full text-textColor hover:bg-secondary hover:text-white'
                    }`}
                    onClick={() => {
                      if (
                        (!props.withPast || props.withFuture) &&
                        date <=
                          new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 2, 0, 0)
                      ) {
                        props.setSelected(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            i + 1,
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getHours()
                              : currentDate.getHours(),
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getMinutes()
                              : currentDate.getMinutes()
                          )
                        );
                      } else if (
                        props.withPast &&
                        date >
                          new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1, 0, 0)
                      ) {
                        props.setSelected(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            i + 1,
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getHours()
                              : currentDate.getHours(),
                            currentDate.getHours() < date.getHours() ||
                            (currentDate.getMinutes() < date.getHours() &&
                              currentDate.getHours() === date.getHours())
                              ? date.getMinutes()
                              : currentDate.getMinutes()
                          )
                        );
                      }
                    }}
                  >
                    <CalendarText> {i + 1}</CalendarText>
                  </span>
                ))}
              </div>
            </div>
            {props.withTime ? (
              <div className="flex flex-col items-center justify-center py-2">
                <Category>Time</Category>
                <div className="flex w-full items-center justify-center pt-3 text-sm">
                  <div className="relative h-12 w-20">
                    <input
                      className="flex h-12 w-full justify-center rounded-full bg-bgColor py-2 text-center font-text text-sm font-light shadow-inner outline-none md:text-base"
                      type="number"
                      placeholder="hh"
                      min={
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          currentDate.getDate(),
                          currentDate.getHours(),
                          currentDate.getMinutes()
                        ) >
                        new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          date.getHours(),
                          date.getMinutes()
                        )
                          ? 0
                          : moment(date.getHours(), 'h').format('HH')
                      }
                      max={23}
                      required
                      value={moment(props.selected?.getHours(), 'h').format('HH')}
                      onChange={(e: any) => {
                        props.setSelected(
                          () =>
                            new Date(
                              currentDate.getFullYear(),
                              currentDate.getMonth(),
                              currentDate.getDate(),
                              e.target.value,
                              currentDate.getMinutes()
                            )
                        );
                      }}
                    />
                  </div>
                  <div className="px-4">
                    <Title text=":"></Title>
                  </div>
                  <div className="relative h-12 w-20">
                    <input
                      className="flex h-12 w-full justify-center rounded-full bg-bgColor py-2 text-center font-text text-sm font-light shadow-inner outline-none md:text-base"
                      type="number"
                      placeholder="mm"
                      min={
                        new Date(
                          currentDate.getFullYear(),
                          currentDate.getMonth(),
                          currentDate.getDate(),
                          currentDate.getHours(),
                          currentDate.getMinutes()
                        ) >
                        new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate(),
                          date.getHours(),
                          date.getMinutes()
                        )
                          ? 0
                          : date.getMinutes()
                      }
                      max={59}
                      required
                      value={moment(props.selected?.getMinutes(), 'mm').format('mm')}
                      onChange={(e: any) => {
                        props.setSelected(
                          new Date(
                            currentDate.getFullYear(),
                            currentDate.getMonth(),
                            currentDate.getDate(),
                            currentDate.getHours(),
                            e.target.value
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
function CalendarHeader(props: CalendarHeaderProps) {
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  // Handle click  of the calendar to close it
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (calendarIsOpen && ref.current && !ref.current.contains(e.target)) {
        setCalendarIsOpen(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [calendarIsOpen]);

  return (
    <>
      <div className="flex w-full flex-col-reverse flex-wrap items-center justify-center gap-8 py-2 pb-10 md:flex-row md:justify-between">
        <div className="flex items-center justify-around gap-4">
          <div
            className="flex h-6 w-4 cursor-pointer items-center justify-center"
            onClick={() => props.prev()}
          >
            <ChevronIcon className="aspect-square size-3 rotate-180 fill-black/30" />
          </div>
          <div
            ref={ref}
            className="relative h-full w-52 rounded-full px-6 py-1 shadow-inner outline-none"
          >
            <div
              className="flex size-full cursor-pointer items-center justify-between"
              onClick={() => setCalendarIsOpen(!calendarIsOpen)}
            >
              <span className="select-none text-center font-text text-xs font-medium capitalize md:text-sm">
                {`${CalendarData.monthNames[props.month]} / ${props.year}`}
              </span>
              <div className="py-1">
                <CalendarIcon className="size-5" />
              </div>
            </div>
            <div className="absolute left-0 top-12 z-[25] hidden h-fit w-96 overflow-hidden rounded-3xl bg-bgColor shadow-inner md:block">
              <div
                className={`relative h-0 w-full duration-200 ${!calendarIsOpen ? 'h-0' : 'h-80'}`}
              >
                <FullCalendar
                  selected={selectedDate}
                  setSelected={setSelectedDate}
                  withPast
                  withFuture
                  withoutShadow
                />
              </div>
            </div>
          </div>
          <div
            className="flex h-6 w-4 cursor-pointer items-center justify-center"
            onClick={() => props.next()}
          >
            <ChevronIcon className="aspect-square size-3 fill-black/30" />
          </div>
        </div>
        <div className="flex flex-row-reverse items-center justify-around gap-5 rounded-full px-3 py-1 shadow-inner outline-none">
          {CalendarData.periods.map((period, idx) => (
            <div
              key={idx}
              className={`flex w-full cursor-pointer items-center justify-center ${
                props.selectedPeriod === idx
                  ? 'bg-bgColor text-black shadow-inner'
                  : 'bg-transparent text-black/30'
              } rounded-3xl p-2`}
              onClick={() => props.setSelectedPeriod(idx)}
            >
              <span className="select-none text-center font-text text-xs font-semibold capitalize md:text-base">
                {period}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 z-[49] flex size-full items-center justify-center transition-all duration-200 md:hidden ${
          calendarIsOpen ? 'visible bg-black/70' : 'invisible bg-black/0'
        } `}
      >
        <div
          className={`z-50 mx-5 flex max-h-[85vh] w-full max-w-lg flex-col items-center justify-center rounded-3xl bg-bgColor p-4 text-black sm:mx-10 lg:p-6 ${
            calendarIsOpen ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="size-full max-h-[70vh] overflow-hidden">
            <div onClick={() => setCalendarIsOpen(false)} className="cursor-pointer pl-4 pt-1">
              <XIcon className="size-3.5 fill-black" />
            </div>
            <div className="mx-auto h-80 w-full max-w-lg p-2">
              <FullCalendar
                withPast
                withFuture
                selected={selectedDate}
                setSelected={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Event(props: EventProps) {
  const calculatePeriod = () => {
    let period = 1;
    if (moment(props.endDate).week() === moment(props.startDate).week()) {
      // const periodInMilliSeconds =
      //   moment(endDate).toDate() - moment(startDate).toDate();
      // period = Math.ceil(periodInMilliSeconds / (1000 * 3600 * 24)) + 1;
      period = moment(props.endDate).diff(moment(props.startDate), 'days') + 1;
    } else if (moment(props.endDate).week() === moment(props.date, 'DD-MM-YYYY').week()) {
      period =
        moment(props.endDate).toDate().getDay() -
        moment(props.date, 'DD-MM-YYYY').toDate().getDay() +
        1;
    } else if (
      moment(props.startDate).week() < moment(props.date, 'DD-MM-YYYY').week() &&
      moment(props.endDate).week() > moment(props.date, 'DD-MM-YYYY').week()
    ) {
      period = 7;
    } else if (moment(props.startDate).week() === moment(props.date, 'DD-MM-YYYY').week()) {
      period = 7 - moment(props.startDate).toDate().getDay();
    }

    return period;
  };
  const periodInDays = useMemo(() => calculatePeriod(), []);

  return (
    <div
      style={{
        width: `${periodInDays * 100}%`,
        color: props.color,
        backgroundColor: props.backgroundColor,
        borderColor: props.color
      }}
      className={`relative z-10 ${
        (moment(props.startDate).week() === moment(props.date, 'DD-MM-YYYY').week() ||
          props.showAll) &&
        'border-l-8'
      } rounded-lg ${
        props.fixedHeight ? 'h-8' : 'h-1.5'
      } flex cursor-pointer items-center justify-between gap-4 overflow-hidden px-2 md:h-8`}
      onClick={props.handleOnClick}
    >
      <div
        className={`${props.fixedHeight ? 'block' : 'hidden'} truncate text-xs capitalize md:block`}
      >
        {props.title}
      </div>
      <div
        className={`${
          props.fixedHeight ? 'flex' : 'hidden'
        } items-center justify-end gap-2 overflow-hidden md:flex`}
      >
        <span className="truncate whitespace-nowrap text-xs">
          {moment(props.startDate).format('HH:mm')}
        </span>
        {/* {!showAll && (
          <span className="text-xs truncate whitespace-nowrap">{`${moment(
            startDate
          ).format('HH:mm')} -  ${moment(endDate).format('HH:mm')}`}</span>
        )} */}
        {(moment(props.endDate).week() === moment(props.date, 'DD-MM-YYYY').week() ||
          props.showAll) && (
          <div className="aspect-square size-4 cursor-pointer">
            <DoubleArrowIcon className="size-4" />
          </div>
        )}
      </div>
    </div>
  );
}

function EventCalendar({ eventsList }: { eventsList: any }) {
  const [selectedPeriod, setSelectedPeriod] = useState(0);
  const [day, setDay] = useState(new Date());
  const [month, setMonth] = useState(day.getMonth());
  const [year, setYear] = useState(day.getFullYear());
  const nextMonth = () => {
    const newDay = new Date(moment(day).add(1, 'month').toDate());
    setDay(newDay);
  };

  const prevMonth = () => {
    const newDay = new Date(moment(day).add(-1, 'month').toDate());
    setDay(newDay);
  };
  const nextWeek = () => {
    const newDay = new Date(moment(day).add(1, 'week').toDate());
    setDay(newDay);
  };
  const nextDay = () => {
    const newDay = new Date(moment(day).add(1, 'day').toDate());
    setDay(newDay);
  };
  const prevDay = () => {
    const newDay = new Date(moment(day).add(-1, 'day').toDate());
    setDay(newDay);
  };

  const prevWeek = () => {
    const newDay = new Date(moment(day).add(-1, 'week').toDate());
    setDay(newDay);
  };

  return (
    <div className="relative size-full overflow-auto px-6">
      <CalendarHeader
        day={day}
        setDay={setDay}
        month={month}
        year={year}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        next={selectedPeriod === 0 ? nextMonth : selectedPeriod === 1 ? nextWeek : nextDay}
        prev={selectedPeriod === 0 ? prevMonth : selectedPeriod === 1 ? prevWeek : prevDay}
      />
      <div className="relative w-full overflow-auto">
        {selectedPeriod === 0 ? (
          <MonthCalendar
            eventsList={eventsList}
            day={day}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        ) : selectedPeriod === 1 ? (
          <WeekCalendar
            eventsList={eventsList}
            day={day}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        ) : (
          <DayCalendar
            // eventsList={eventsList}
            day={day}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
          />
        )}
      </div>
    </div>
  );
}

function MonthCalendar(props: MonthCalendarProps) {
  const router = useRouter();
  const today = new Date();
  const [selectedEvent, setSelectedEvent] = useState<any>({});
  const numberOfDays = new Date(props.year, props.month + 1, 0).getDate();
  const numberOfDaysPreviousMonth = new Date(props.year, props.month, 0).getDate();
  const skipDays = new Date(props.year, props.month).getDay();

  useEffect(() => {
    props.setMonth(props.day.getMonth());
    props.setYear(props.day.getFullYear());
  }, [props.day, props.month, props.year]);

  return (
    <div className="relative w-full">
      <div className="sticky left-0 top-0 z-20 grid w-full grid-cols-7 rounded-md bg-bgColorHover">
        {CalendarData.days.map((day, idx) => (
          <div
            className="flex h-10 w-full select-none items-center justify-center p-2 font-text text-xs font-semibold xl:text-sm"
            key={idx}
          >
            <span className="hidden md:block">{day.longText}</span>
            <span className="md:hidden">{day.shortText}</span>
          </div>
        ))}
      </div>
      <div className="relative z-0 grid w-full select-none grid-cols-7 grid-rows-6 overflow-hidden pt-2">
        {[
          ...Array(skipDays).fill('*'),
          ...Array(numberOfDays).keys(),
          ...Array(42 - (skipDays + numberOfDays)).fill('*')
        ].map((day, idx) =>
          day === '*' ? (
            <div
              className={`relative border-l-0 md:border ${
                idx % 7 === 6 && 'border-r-0'
              } flex h-16 w-full flex-col items-start justify-start overflow-y-clip md:h-36`}
              key={idx}
            >
              <div className="flex w-full justify-start pb-px md:pb-1">
                <span className="flex aspect-square h-full items-center justify-center p-0.5 font-text font-semibold text-toggleAccent/25 md:p-1.5">
                  {idx > numberOfDays + skipDays - 1
                    ? idx - (numberOfDays + skipDays - 1)
                    : numberOfDaysPreviousMonth - (skipDays - 1) + idx}
                </span>
              </div>
              <div className="relative flex size-full shrink-0 grow flex-col gap-2" key={idx}>
                {props.eventsList
                  ?.sort((a: any, b: any) => (a?.from > b?.from ? 1 : -1))
                  .map((e: any) =>
                    (idx <= numberOfDays + skipDays - 1 &&
                      moment(e?.to).week() >=
                        moment(
                          `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                          'DD-MM-YYYY'
                        ).week() &&
                      moment(
                        `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() > moment(e?.from).toDate() &&
                      moment(
                        `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() <= moment(e?.to).toDate() &&
                      moment(
                        `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                        'DD-MM-YYYY'
                      )
                        .toDate()
                        .getDay() === 0) ||
                    (idx > numberOfDays + skipDays - 1 &&
                      moment(e?.to).week() >=
                        moment(
                          `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                          'DD-MM-YYYY'
                        ).week() &&
                      moment(
                        `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() > moment(e?.from).toDate() &&
                      moment(
                        `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() <= moment(e?.to).toDate() &&
                      moment(
                        `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                        'DD-MM-YYYY'
                      )
                        .toDate()
                        .getDay() === 0) ? (
                      <Event
                        key={`MONTH_${e.title}_${idx}_${props.month}_other`}
                        handleOnClick={() => {
                          setSelectedEvent(e);
                        }}
                        startDate={e?.from}
                        endDate={e?.to}
                        date={
                          idx > numberOfDays + skipDays - 1
                            ? moment(
                                `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                                'DD-MM-YYYY'
                              ).toDate()
                            : moment(
                                `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                                'DD-MM-YYYY'
                              ).toDate()
                        }
                        title={e.title}
                        color={e.text_color}
                        backgroundColor={e.background_color}
                      />
                    ) : (idx > numberOfDays + skipDays - 1 &&
                        moment(
                          `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                          'DD-MM-YYYY'
                        ).toDate() > moment(e?.from).toDate() &&
                        moment(
                          `${idx - (numberOfDays + skipDays - 1)}/${props.month + 2}/${props.year}`,
                          'DD-MM-YYYY'
                        ).toDate() <= moment(e?.to).toDate()) ||
                      (idx <= numberOfDays + skipDays - 1 &&
                        moment(
                          `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                          'DD-MM-YYYY'
                        ).toDate() > moment(e?.from).toDate() &&
                        moment(
                          `${numberOfDaysPreviousMonth - (skipDays - 1) + idx}/${props.month}/${props.year}`,
                          'DD-MM-YYYY'
                        ).toDate() <= moment(e?.to).toDate()) ? (
                      <div
                        className="invisible h-1.5 w-full md:h-8"
                        key={`${e.title}_${idx}_${props.month}_2 `}
                      />
                    ) : null
                  )}
              </div>
            </div>
          ) : (
            <div
              className={`relative border-l-0 md:border ${
                idx % 7 === 6 && 'border-r-0'
              } flex h-16 w-full flex-col items-start justify-start overflow-y-clip md:h-36`}
              key={idx}
            >
              <div className="relative z-0 flex w-full justify-start pb-px md:pb-1">
                <span
                  className={`flex aspect-square h-full items-center justify-center p-0.5 md:p-1.5 ${
                    day + 1 === today.getDate() &&
                    today.getMonth() === props.month &&
                    today.getFullYear() === props.year &&
                    'aspect-square rounded-full bg-primary text-white'
                  } font-text font-semibold text-inputLabelAccent`}
                >
                  {day + 1}
                </span>
              </div>
              <div className="relative flex size-full flex-col gap-1 md:gap-2" key={idx}>
                {props.eventsList
                  ?.sort((a: any, b: any) =>
                    moment(a?.from).toDate() > moment(b?.from).toDate() ? 1 : -1
                  )
                  .map((e: any) =>
                    (day + 1 === moment(e?.from).toDate().getDate() &&
                      props.month === moment(e?.from).toDate().getMonth() &&
                      props.year === moment(e?.from).toDate().getFullYear()) ||
                    (moment(e?.to).week() >=
                      moment(`${day + 1}/${props.month + 1}/${props.year}`, 'DD-MM-YYYY').week() &&
                      moment(`${day + 1}/${props.month + 1}/${props.year}`, 'DD-MM-YYYY').toDate() >
                        moment(e?.from).toDate() &&
                      moment(
                        `${day + 1}/${props.month + 1}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() <= moment(e?.to).toDate() &&
                      moment(`${day + 1}/${props.month + 1}/${props.year}`, 'DD-MM-YYYY')
                        .toDate()
                        .getDay() === 0) ? (
                      <Event
                        key={`MONTH_${e.title}_${idx}_${props.month}`}
                        handleOnClick={() => {
                          setSelectedEvent(e);
                        }}
                        startDate={e?.from}
                        endDate={e?.to}
                        date={moment(
                          `${day + 1}/${props.month + 1}/${props.year}`,
                          'DD-MM-YYYY'
                        ).toDate()}
                        title={e.title}
                        color={e.text_color}
                        backgroundColor={e.background_color}
                      />
                    ) : moment(
                        `${day + 1}/${props.month + 1}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() > moment(e?.from).toDate() &&
                      moment(
                        `${day + 1}/${props.month + 1}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate() <= moment(e?.to).toDate() ? (
                      <div
                        className="invisible relative h-1.5 w-full md:h-8"
                        key={`${e.title} ${idx} ${props.month}_2 `}
                      />
                    ) : null
                  )}
              </div>
            </div>
          )
        )}
      </div>
      {Object.keys(selectedEvent).length > 0 && (
        <div className="relative flex w-full flex-col items-center py-4 pb-20 md:hidden">
          <div className="h-px w-[90%] bg-toggleAccent" />
          <div className="relative w-full max-w-md pt-8">
            <Event
              showAll
              startDate={selectedEvent.from}
              title={selectedEvent.title}
              color={selectedEvent.text_color}
              backgroundColor={selectedEvent.background_color}
              fixedHeight
              handleOnClick={() =>
                router.push(`/cars-limousines/missions/${selectedEvent?.data?.mission?._id}`)
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

function WeekCalendar(props: WeekCalendarProps) {
  const router = useRouter();
  const firstDayOfTheWeekDefault = props.day.getDate() - props.day.getDay();
  const [firstDayOfTheWeek, setFirstDayOfTheWeek] = useState(firstDayOfTheWeekDefault);

  useEffect(() => {
    props.setMonth(props.day.getMonth());
    props.setYear(props.day.getFullYear());
    setFirstDayOfTheWeek(props.day.getDate() - props.day.getDay());
  }, [props.day, firstDayOfTheWeekDefault, props.month, props.year]);

  return (
    <div className="relative h-[calc(100%-130px)] w-full min-w-[50rem]">
      <div className="sticky left-0 top-0 z-[22] grid w-full min-w-[45rem] grid-cols-7 rounded-md bg-bgColorHover">
        {CalendarData.days.map((day, idx) => (
          <div
            className="flex h-10 w-full select-none items-center justify-center p-2 font-text text-xs font-semibold xl:text-sm"
            key={idx}
          >
            <span>
              {`${day.shortText} ${new Date(props.year, props.month, firstDayOfTheWeek + idx).getDate()}/${
                new Date(props.year, props.month, firstDayOfTheWeek + idx).getMonth() + 1
              }`}
            </span>
          </div>
        ))}
      </div>
      <div className="relative grid size-full select-none grid-cols-7 overflow-hidden">
        {[...Array(7)].map((value, idx) => (
          <div
            key={idx}
            className={`relative border border-l-0 ${
              idx % 7 === 6 && 'border-r-0'
            } flex size-full min-h-60 flex-col items-start justify-start overflow-y-clip`}
          >
            <div className="relative flex w-full flex-col gap-1 pt-4 md:gap-2">
              {props.eventsList
                ?.sort((a: any, b: any) =>
                  moment(a?.from).toDate() > moment(b?.from).toDate() ? 1 : -1
                )
                .map((e: any) =>
                  (firstDayOfTheWeek + idx === moment(e?.from).toDate().getDate() &&
                    props.month === moment(e?.from).toDate().getMonth() &&
                    props.year === moment(e?.from).toDate().getFullYear()) ||
                  (moment(e?.to).week() >=
                    moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    ).week() &&
                    moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    ).toDate() > moment(e?.from).toDate() &&
                    moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    ).toDate() <= moment(e?.to).toDate() &&
                    moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    )
                      .toDate()
                      .getDay() === 0) ? (
                    <Event
                      key={`WEEK_${e.title}_${idx}_${props.month}`}
                      fixedHeight
                      startDate={e?.from}
                      endDate={e?.to}
                      date={moment(
                        `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                        'DD-MM-YYYY'
                      ).toDate()}
                      title={e.title}
                      color={e.text_color}
                      backgroundColor={e.background_color}
                      handleOnClick={() =>
                        router.push(`/cars-limousines/missions/${e?.data?.mission?._id}`)
                      }
                    />
                  ) : moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    ).toDate() > moment(e?.from).toDate() &&
                    moment(
                      `${firstDayOfTheWeek + idx}/${props.month + 1}/${props.year}`,
                      'DD-MM-YYYY'
                    ).toDate() <= moment(e?.to).toDate() ? (
                    <div className="z-0 h-8 w-full" key={`${e.title} ${idx} ${props.month}_2`} />
                  ) : null
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// function DayCalendar({ eventsList, day, month, setMonth, year, setYear }) {
function DayCalendar(props: DayCalendarProps) {
  const displayHours = (hour: number) => {
    if (hour > 12) return `${hour}:00 PM`;
    if (hour === 12) return `${hour}:00 PM`;
    if ((hour < 12 && hour === 10) || hour === 11) return `${hour}:00 AM`;

    return `0${hour}:00 AM`;
  };

  // const numberOfDays = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    props.setMonth(props.day.getMonth());
    props.setYear(props.day.getFullYear());
  }, [props.day, props.month, props.year]);

  return (
    <div className="relative w-full">
      <div className="sticky left-0 top-0 z-20 grid w-full auto-rows-auto grid-cols-[7rem_auto] rounded-md bg-bgColorHover">
        <div className="flex h-10 w-full select-none items-center justify-center bg-bgColor p-2 font-text text-xs font-semibold xl:text-sm">
          <span />
        </div>
        <div className="flex h-10 w-full select-none items-center justify-center p-2 font-text text-xs font-semibold xl:text-sm">
          <span>
            {`${CalendarData.days[props.day.getDay()].longText} ${props.day.getDate()}/${props.day.getMonth() + 1}`}
          </span>
        </div>
      </div>
      <div className="relative z-0 grid size-full select-none grid-cols-[7rem_auto] overflow-hidden">
        {[...Array(48)].map((value, index) => (
          <div
            key={index}
            className="flex h-16 w-full flex-col items-center justify-center border-y p-1"
          >
            {index % 2 === 0 ? <span>{displayHours(index / 2)}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
export {
  CalendarHeader,
  DayCalendar,
  Event,
  EventCalendar,
  FullCalendar,
  MonthCalendar,
  WeekCalendar
};
