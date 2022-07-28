/* eslint-disable max-len */
import { HttpException } from '@nestjs/common';

export const errors = {
  '1000': {
    code: 1000,
    msg: 'The username or password is empty.',
    level: 'error',
    key: 'user',
  },
  '1001': {
    code: 1001,
    msg: 'The password length may not less than six.',
    level: 'error',
    key: 'user',
  },
  '1002': {
    code: 1002,
    msg: 'login required',
    level: 'info',
    key: 'user',
  },
  '1003': {
    code: 1003,
    msg: 'Password is invalid',
    level: 'info',
    key: 'user',
    status: 401,
  },
  '1005': {
    code: 1005,
    msg: 'User with this email/username does not exist.',
    level: 'info',
    key: 'user',
  },
  '1008': {
    code: 1008,
    msg: 'signup failed',
    level: 'warning',
    key: 'user',
  },
  '1011': {
    code: 1011,
    msg: 'The old password is wrong',
    level: 'info',
    key: 'user',
  },
  '1016': {
    code: 1016,
    msg: 'The username/email for registering has been used, please change another one.',
    level: 'info',
    key: 'user',
  },
  '1020': {
    code: 1020,
    msg: 'Cannot access the sheet, please grant the access or change the sheet key',
    level: 'warning',
    key: 'user',
  },
  '1021': {
    code: 1021,
    msg: 'Credential is invlaid',
    level: 'warning',
    key: 'user',
  },
  '1032': {
    code: 1032,
    msg: 'Invalid token',
    level: 'error',
    key: 'user',
    status: 401,
  },
};

export class CustomException extends HttpException {
  constructor(errorCode: number) {
    super(
      {
        code: errors[errorCode].code,
        message: errors[errorCode].msg,
      },
      errors[errorCode].status ? errors[errorCode].status : 400,
    );
  }
}
