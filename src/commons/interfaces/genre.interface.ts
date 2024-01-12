import { GenresEnum } from 'src/commons/enums';

export interface IGenre {
  [key: string]: (typeof GenresEnum)[keyof typeof GenresEnum];
}
