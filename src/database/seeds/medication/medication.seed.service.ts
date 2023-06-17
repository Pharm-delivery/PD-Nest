import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from 'src/modules/products/entities/medication.entity';
import { subCategories } from '../subCategory/subCategories';

@Injectable()
export class MedicationSeedService {
  constructor(
    @InjectRepository(Medication)
    private repository: Repository<Medication>,
  ) {}

  async run() {
    const count = await this.repository.count();
    const allMedications = subCategories.reduce((acc, subCategory, index) => {
      const categoryMedications = subCategory.medications.map((medication) => ({
        ...medication,
        subCategories: [index],
      }));
      acc.push(...categoryMedications);
      return acc;
    }, [] as any);
    if (!count) {
      await this.repository.save(
        allMedications.map((medication) => this.repository.create(medication)),
      );
    }
  }
}
