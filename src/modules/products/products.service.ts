import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubCategory } from './entities/subCategories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(SubCategory)
    private categoryRepository: Repository<SubCategory>,
  ) {}

  getCategories() {
    return this.categoryRepository.find();
  }
}
