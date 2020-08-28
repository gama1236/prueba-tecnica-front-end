import {Rol} from './Rol';

export interface User{
  userId: number;
  userName: string;
  userState: boolean;
  rol: Rol ;
}
