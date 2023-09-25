import { AddressDto } from './address.dto';

export class UserDto {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
  phone: string;
  address?: AddressDto;
  createdAt: Date;
  updatedAt: Date;
}
