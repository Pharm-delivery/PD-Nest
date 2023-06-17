import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationSeedService } from './medication.seed.service';
import { Medication } from 'src/modules/products/entities/medication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medication])],
  providers: [MedicationSeedService],
  exports: [MedicationSeedService],
})
export class MedicationsSeedModule {}
