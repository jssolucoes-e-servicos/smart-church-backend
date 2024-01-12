import { ApplicationsEnum } from 'src/commons/enums';

export interface IApplication {
  [key: string]: (typeof ApplicationsEnum)[keyof typeof ApplicationsEnum];
}
