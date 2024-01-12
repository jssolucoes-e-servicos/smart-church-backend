import { WeekDayEnum } from 'src/commons/enums';

export interface IWeekDay {
  [key: string]: (typeof WeekDayEnum)[keyof typeof WeekDayEnum];
}
