import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DataSourceService } from './data-source.service';
import { DataSource } from './entities/data-source.entity';
import { CreateDataSourceInput } from './dto/create-data-source.input';
import { UpdateDataSourceInput } from './dto/update-data-source.input';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '../../common/types/role.enum';

@Resolver(() => DataSource)
export class DataSourceResolver {
  constructor(private readonly dataSourceService: DataSourceService) {}

  @Roles(Role.Admin)
  @Mutation(() => DataSource)
  createDataSource(
    @Args('createDataSourceInput') createDataSourceInput: CreateDataSourceInput,
  ) {
    return this.dataSourceService.create(createDataSourceInput);
  }

  @Roles(Role.Admin)
  @Query(() => [DataSource], { name: 'dataSource' })
  findAll() {
    return this.dataSourceService.findAll();
  }

  @Roles(Role.Admin)
  @Query(() => DataSource, { name: 'dataSource' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dataSourceService.findOne(id);
  }

  @Roles(Role.Admin)
  @Mutation(() => DataSource)
  updateDataSource(
    @Args('updateDataSourceInput') updateDataSourceInput: UpdateDataSourceInput,
  ) {
    return this.dataSourceService.update(
      updateDataSourceInput.id,
      updateDataSourceInput,
    );
  }

  @Roles(Role.Admin)
  @Mutation(() => DataSource)
  removeDataSource(@Args('id', { type: () => Int }) id: number) {
    return this.dataSourceService.remove(id);
  }
}
