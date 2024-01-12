import { MaritalStatusEnum } from 'src/commons/enums';

export interface IMaritalStatus {
  [key: string]: (typeof MaritalStatusEnum)[keyof typeof MaritalStatusEnum];
}
