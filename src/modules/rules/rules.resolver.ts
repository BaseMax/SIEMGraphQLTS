import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RulesService } from './rules.service';
import { Rule } from './entities/rule.entity';
import { CreateRuleInput } from './dto/create-rule.input';
import { UpdateRuleInput } from './dto/update-rule.input';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/types/role.enum';

@Resolver(() => Rule)
export class RulesResolver {
  constructor(private readonly rulesService: RulesService) {}

  @Roles(Role.Admin)
  @Mutation(() => Rule)
  createRule(@Args('createRuleInput') createRuleInput: CreateRuleInput) {
    return this.rulesService.create(createRuleInput);
  }

  @Roles(Role.Admin)
  @Query(() => [Rule], { name: 'rules' })
  findAll() {
    return this.rulesService.findAll();
  }

  @Roles(Role.Admin)
  @Query(() => Rule, { name: 'rule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.rulesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => Rule)
  updateRule(@Args('updateRuleInput') updateRuleInput: UpdateRuleInput) {
    return this.rulesService.update(updateRuleInput.id, updateRuleInput);
  }

  @Roles(Role.Admin)
  @Mutation(() => Rule)
  removeRule(@Args('id', { type: () => Int }) id: number) {
    return this.rulesService.remove(id);
  }
}
