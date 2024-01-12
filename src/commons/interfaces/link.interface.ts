import { ILinkPosition } from 'src/commons/interfaces/link-position.interface';
import { BooleanValidator, StringValidator } from 'src/commons/validators';

export class ILink {
  @StringValidator({ fieldName: 'id' })
  id: string;

  @StringValidator({ fieldName: 'position' })
  position: ILinkPosition;

  @StringValidator({ fieldName: 'title' })
  title: string;

  @StringValidator({ fieldName: 'url' })
  url: string;

  @StringValidator({ fieldName: 'icon' })
  icon: string;

  @BooleanValidator({ fieldName: 'openBlank' })
  openBlank: boolean;

  @BooleanValidator({ fieldName: 'active' })
  active: boolean;

  @StringValidator({ fieldName: 'createdAt' })
  createdAt: Date;

  @StringValidator({ fieldName: 'updatedAt' })
  updatedAt: Date;
}
