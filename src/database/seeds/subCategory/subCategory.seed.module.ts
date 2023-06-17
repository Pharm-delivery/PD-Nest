import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategory } from 'src/modules/products/entities/subCategories.entity';
import { SubCategorySeedService } from './subCategory.seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubCategory])],
  providers: [SubCategorySeedService],
  exports: [SubCategorySeedService],
})
export class SubCategorySeedModule {}
