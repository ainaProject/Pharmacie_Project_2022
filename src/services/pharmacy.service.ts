import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Pharmacy } from '@/interfaces/pharmacy.interface';
import { PharmacyEntity } from '@/entities/Pharmacy.entity';
import { CreatePharmacyDto } from '@/dtos/pharmacy.dto';

@EntityRepository()
class PharmacyService extends Repository<UserEntity> {
  public async findAllPharmacy(limit: number, offset: number): Promise<Pharmacy[]> {
    if (limit != null || offset != null) {
      const pharmacy: Pharmacy[] = await PharmacyEntity.find({
        where: {},
        relations: ['typePharmacy', 'contact', 'status'],
        take: limit,
        skip: offset,
      });

      return pharmacy;
    } else {
      const pharmacy: Pharmacy[] = await PharmacyEntity.find({
        where: {},
        relations: ['typePharmacy', 'contact', 'status'],
      });

      return pharmacy;
    }
  }

  public async findPharmacyById(pharmacyId: number): Promise<Pharmacy> {
    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({
      where: { id: pharmacyId },
      relations: ['typePharmacy', 'contact', 'status'],
    });

    if (!findPharmacy) throw new HttpException(409, "User doesn't exist");

    return findPharmacy;
  }

  public async createPharmacy(pharmacyData: CreatePharmacyDto): Promise<Pharmacy> {
    if (isEmpty(pharmacyData)) throw new HttpException(400, 'pharmacyData is empty');

    const createPharmacyData: Pharmacy = await PharmacyEntity.create({ ...pharmacyData }).save();

    return createPharmacyData;
  }

  public async updatePharmacy(pharmacyId: number, pharmacyData: CreatePharmacyDto): Promise<Pharmacy> {
    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'status'] });
    if (!findPharmacy) throw new HttpException(409, "Pharmacy doesn't exist");

    await PharmacyEntity.update(pharmacyId, { ...pharmacyData });

    const updatePharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'contact', 'status'] });
    return updatePharmacy;
  }

  public async deletePharmacy(pharmacyId: number): Promise<Pharmacy> {
    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'contact', 'status'] });
    if (!findPharmacy) throw new HttpException(409, "Pharmacy doesn't exist");

    await PharmacyEntity.delete({ id: pharmacyId });
    return findPharmacy;
  }
}

export default PharmacyService;
