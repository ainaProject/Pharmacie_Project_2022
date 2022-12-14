import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';
import { TypePharmacyEntity } from '@/entities/TypePharmacy.entity';
import { TypePharmacy } from '@/interfaces/TypePharmacy.interface';

@EntityRepository()
class TypePharmacyService extends Repository<TypePharmacyEntity> {
  public async findAllTypePharmacy(): Promise<TypePharmacy[]> {
    const typePharmacy: TypePharmacy[] = await TypePharmacyEntity.find({ where: {}, order: { id: 'ASC' } });

    return typePharmacy;
  }

  public async getTypePharmacyById(typePharmacyId: number): Promise<TypePharmacy> {
    const typePharmacy: TypePharmacy = await TypePharmacyEntity.findOne({
      where: { id: typePharmacyId },
    });

    return typePharmacy;
  }
}
export default TypePharmacyService;
