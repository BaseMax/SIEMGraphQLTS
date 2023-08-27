import { InputType, Field } from '@nestjs/graphql';
import { Role } from '../../../common/types/role.enum';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.toLowerCase())
  username: string;

  @Field(() => String)
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => Role)
  role: Role;
}
