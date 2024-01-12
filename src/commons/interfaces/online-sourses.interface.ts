import { OnlineSoursesEnum } from 'src/commons/enums';

export interface IOnlineSourses {
  [key: string]: (typeof OnlineSoursesEnum)[keyof typeof OnlineSoursesEnum];
}
