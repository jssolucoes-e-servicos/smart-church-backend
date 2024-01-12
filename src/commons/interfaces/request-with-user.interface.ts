import { Request } from 'express';
import { IUserResponse } from 'src/commons/interfaces';

export interface IRequestWithUser extends Request {
  user: IUserResponse;
}
