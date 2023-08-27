import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { AssignRoleUserInput } from './dto/assign-role.input';
import { HashService } from '../auth/services/hash.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async assignRoleUser(assignRoleUserInput: AssignRoleUserInput) {
    const user = await this.findOne(assignRoleUserInput.userId);

    if (!user) throw new NotFoundException('User not found!');

    return this.prisma.user.update({
      where: { id: user.id },
      data: {
        role: assignRoleUserInput.role,
      },
    });
  }

  revokeRole(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: {
        role: null,
      },
    });
  }

  enableOrDisableAlertsUser(id: number, receive: boolean) {
    return this.prisma.user.update({
      where: { id },
      data: {
        receiveAlerts: receive,
      },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async checkEmailAndUsernameExists(
    email: string,
    username: string,
  ): Promise<void> {
    const usernameExists = await this.prisma.user.findUnique({
      where: { username },
    });

    if (usernameExists)
      throw new BadRequestException('username is already exists!');

    const emailExists = await this.prisma.user.findUnique({ where: { email } });

    if (emailExists) throw new BadRequestException('email is already exists!');
  }

  async create(createUserInput: CreateUserInput) {
    await this.checkEmailAndUsernameExists(
      createUserInput.email,
      createUserInput.username,
    );

    const hashedPassword = await HashService.hash(createUserInput.password);

    return this.prisma.user.create({
      data: {
        username: createUserInput.username,
        email: createUserInput.email,
        password: hashedPassword,
        role: createUserInput.role,
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: updateUserInput?.email,
        username: updateUserInput?.username,
      },
    });
  }

  updatePassword(userId: number, password: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { password },
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found!');

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
