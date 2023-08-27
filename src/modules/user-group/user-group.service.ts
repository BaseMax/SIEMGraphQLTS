import { Injectable } from '@nestjs/common';
import { CreateUserGroupInput } from './dto/create-user-group.input';
import { UpdateUserGroupInput } from './dto/update-user-group.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserGroupService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserGroupInput: CreateUserGroupInput) {
    return this.prisma.userGroup.create({
      data: {
        name: createUserGroupInput.name,
        users: {
          connect: { id: createUserGroupInput.userId },
        },
        permissions: createUserGroupInput.permissions,
      },
    });
  }

  findAll() {
    return this.prisma.userGroup.findMany({});
  }

  findOne(id: number) {
    return this.prisma.userGroup.findUnique({ where: { id } });
  }

  update(id: number, updateUserGroupInput: UpdateUserGroupInput) {
    return this.prisma.userGroup.update({
      where: { id },
      data: {
        ...updateUserGroupInput,
      },
    });
  }

  remove(id: number) {
    return this.prisma.userGroup.delete({ where: { id } });
  }
}
