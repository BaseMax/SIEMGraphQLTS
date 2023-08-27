import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomMatchPasswords } from '../../../common/utils/password.util';

@InputType()
export class ChangePasswordInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(50, { message: 'The maximum password can be 50 characters' })
  password: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirm: string;
}
