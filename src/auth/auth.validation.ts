import { __ } from '@/common/utils/i18';
import { body } from 'express-validator';

export const signinValidation = [
  body('email')
    .isEmail()
    .withMessage(__('validation.email', { field: 'email' })),
  body('password')
    .isString()
    .withMessage(__('validation.must-be-at-least', { field: 'Password', length: '6' }))
    .isLength({ min: 6 })
    .withMessage(__('validation.must-be-at-least', { field: 'Password', length: '6' })),
];
