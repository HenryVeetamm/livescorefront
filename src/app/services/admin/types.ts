export interface AppUserDto {
  firstName: string;
  lastName: string;
  isActive: boolean;
  email: string;
}

export interface AddUserDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface UpdatePasswordDto {
  password: string;
}