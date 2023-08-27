import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRuleInput } from './dto/create-rule.input';
import { UpdateRuleInput } from './dto/update-rule.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RulesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRuleInput: CreateRuleInput) {
    const ruleExist = await this.prisma.rule.findFirst({
      where: { name: createRuleInput.name },
    });

    if (ruleExist) throw new BadRequestException('rule exist!');

    return this.prisma.rule.create({
      data: {
        name: createRuleInput.name,
        description: createRuleInput.description,
        condition: createRuleInput.condition,
        actions: createRuleInput.actions,
      },
    });
  }

  findAll() {
    return `This action returns all rules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rule`;
  }

  update(id: number, updateRuleInput: UpdateRuleInput) {
    return this.prisma.rule.update({
      where: { id },
      data: { ...updateRuleInput },
    });
  }

  remove(id: number) {
    return this.prisma.rule.delete({ where: { id } });
  }
}
