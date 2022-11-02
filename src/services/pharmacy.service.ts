import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Pharmacy } from '@/interfaces/pharmacy.interface';
import { PharmacyEntity } from '@/entities/Pharmacy.entity';
import { CreatePharmacyDto } from '@/dtos/pharmacy.dto';

@EntityRepository()
class PharmacyService extends Repository<UserEntity> {
  public async findAllPharmacy(): Promise<Pharmacy[]> {
    const pharmacy: Pharmacy[] = await PharmacyEntity.find({ where: {}, relations: ['typePharmacy', 'contact', 'status'] });
    return pharmacy;
  }

  public async findPharmacyById(pharmacyId: number): Promise<Pharmacy> {
    if (isEmpty(pharmacyId)) throw new HttpException(400, 'PharmacyId is empty');

    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({
      where: { id: pharmacyId },
      relations: ['pharmacy', 'contact', 'status'],
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
    if (isEmpty(pharmacyData)) throw new HttpException(400, 'userData is empty');

    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'contact', 'status'] });
    if (!findPharmacy) throw new HttpException(409, "Pharmacy doesn't exist");

    await PharmacyEntity.update(pharmacyId, { ...pharmacyData });

    const updatePharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'contact', 'status'] });
    return updatePharmacy;
  }

  public async deletePharmacy(pharmacyId: number): Promise<Pharmacy> {
    if (isEmpty(pharmacyId)) throw new HttpException(400, 'pharmacyId is empty');

    const findPharmacy: Pharmacy = await PharmacyEntity.findOne({ where: { id: pharmacyId }, relations: ['typePharmacy', 'contact', 'status'] });
    if (!findPharmacy) throw new HttpException(409, "Pharmacy doesn't exist");

    await PharmacyEntity.delete({ id: pharmacyId });
    return findPharmacy;
  }

  public async turnActifOrInactifPharmacy(pharmacyId: number): Promise<Pharmacy> {
    return null;
  }
}

export default PharmacyService;
