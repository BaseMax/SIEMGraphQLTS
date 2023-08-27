import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDataSourceInput } from './dto/create-data-source.input';
import { UpdateDataSourceInput } from './dto/update-data-source.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DataSourceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDataSourceInput: CreateDataSourceInput) {
    const dataSource = await this.prisma.dataSource.findFirst({
      where: { name: createDataSourceInput.name },
    });
    if (dataSource) throw new BadRequestException('data source exist!');

    return this.prisma.dataSource.create({
      data: {
        name: createDataSourceInput.name,
        type: createDataSourceInput.type,
        description: createDataSourceInput.description,
      },
    });
  }

  findAll() {
    return this.prisma.dataSource.findMany({});
  }

  findOne(id: number) {
    return this.prisma.dataSource.findUnique({ where: { id } });
  }

  update(id: number, updateDataSourceInput: UpdateDataSourceInput) {
    return this.prisma.dataSource.update({
      where: { id },
      data: {
        ...updateDataSourceInput,
      },
    });
  }

  remove(id: number) {
    return this.prisma.dataSource.delete({ where: { id } });
  }
}
