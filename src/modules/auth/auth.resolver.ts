import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './services/auth.service';
import { AuthPayload } from './entities/auth.entity';
import { LoginInput } from './dto/login.input';
import { GetCurrentUserId } from '../../common/decorators/get-current-user-id.decorator';
import { ChangePasswordInput } from './dto/chang-password.input';
import { User } from '../user/entities/user.entity';
import { Public } from '../../common/decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthPayload)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => User)
  changePassword(
    @GetCurrentUserId() userId: number,
    @Args('changePasswordInput') changePasswordInput: ChangePasswordInput,
  ) {
    return this.authService.changePassword(userId, changePasswordInput);
  }
}
