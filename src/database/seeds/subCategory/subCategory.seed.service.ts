import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from 'src/modules/products/entities/subCategories.entity';
import { subCategories } from './subCategories';

@Injectable()
export class SubCategorySeedService {
  constructor(
    @InjectRepository(SubCategory)
    private repository: Repository<SubCategory>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (count) {
      await this.repository.delete({});
    }

    await this.repository.save(
      subCategories.map((subCategory) => this.repository.create(subCategory)),
    );
  }
}
