export type WeekCalendarProps = {
  eventsList: any[];
  day: Date;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
};
export type FullCalendarProps = {
  selected: Date | null;
  setSelected: React.Dispatch<React.SetStateAction<Date | null>>;
  withTime?: boolean;
  initialValue?: string;
  withPast?: boolean;
  withFuture?: boolean;
  headerRef?: React.RefObject<HTMLDivElement>;
  withoutShadow?: boolean;
};
export type CalendarHeaderProps = {
  day: Date;
  setDay: React.Dispatch<Date>;
  month: number;
  year: number;
  selectedPeriod: number;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<number>>;
  prev: () => any;
  next: () => any;
};
export type EventProps = {
  title: string;
  color: string;
  backgroundColor: string;
  startDate: string;
  endDate?: string;
  date?: Date;
  fixedHeight?: boolean;
  showAll?: boolean;
  handleOnClick: any;
};
export type MonthCalendarProps = {
  eventsList: any;
  day: Date;
  month: number;
  setMonth: React.Dispatch<number>;
  year: number;
  setYear: React.Dispatch<number>;
};

export type DayCalendarProps = {
  day: Date;
  month: number;
  setMonth: React.Dispatch<number>;
  year: number;
  setYear: React.Dispatch<number>;
};
