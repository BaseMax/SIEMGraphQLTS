import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginInput } from '../dto/login.input';
import { UserService } from '../../user/user.service';
import { HashService } from './hash.service';
import { JwtPayload } from '../types/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordInput } from '../dto/chang-password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput) {
    const user = await this.userService.findByUsername(loginInput.username);

    if (!user) throw new BadRequestException('User credentials are not valid');

    const matchPassword = await HashService.compare(
      loginInput.password,
      user.password,
    );
    if (!matchPassword)
      throw new BadRequestException('User credentials are not valid');

    const token = this.getToken({
      id: user.id,
      role: user.role,
    });

    return { access_token: token };
  }

  async changePassword(userId: number, payload: ChangePasswordInput) {
    const hashedPassword = await HashService.hash(payload.password);

    return this.userService.updatePassword(userId, hashedPassword);
  }

  getToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
