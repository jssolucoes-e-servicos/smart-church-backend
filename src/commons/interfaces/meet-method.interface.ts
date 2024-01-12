import { MeetMethodEnum } from 'src/commons/enums';

export interface IMeetMethod {
  [key: string]: (typeof MeetMethodEnum)[keyof typeof MeetMethodEnum];
}
