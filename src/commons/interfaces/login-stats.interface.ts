import { LoginStatsEnum } from 'src/commons/enums';

export interface ILoginStats {
  [key: string]: (typeof LoginStatsEnum)[keyof typeof LoginStatsEnum];
}
