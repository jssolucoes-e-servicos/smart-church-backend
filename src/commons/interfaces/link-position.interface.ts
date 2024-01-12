import { LinkPositionsEnum } from 'src/commons/enums';

export interface ILinkPosition {
  [key: string]: (typeof LinkPositionsEnum)[keyof typeof LinkPositionsEnum];
}
