import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import { Pharmacy } from '@/interfaces/pharmacy.interface';
import { PharmacyEntity } from '@/entities/Pharmacy.entity';
import { CreatePharmacyDto } from '@/dtos/pharmacy.dto';

@EntityRepository()
class PharmacyService extends Repository<UserEntity> {
  public async findAllPharmacy(limit: number, offset: number, key: string): Promise<{ pharmacy: Pharmacy[]; count: number }> {
    if (key == null) {
      const [pharmacy, count]: [Pharmacy[], number] = await PharmacyEntity.createQueryBuilder('qb')
        .leftJoinAndSelect('qb.contact', 'ct')
        .leftJoinAndSelect('qb.typePharmacy', 'tp')
        .leftJoinAndSelect('qb.status', 'st')
        .limit(limit ? limit : 0)
        .offset(offset ? offset : 0)
        .orderBy('qb.id', 'ASC')
        .getManyAndCount();

      return { pharmacy, count };
    } else {
      const { pharmacy, count } = await this.searchPharmacy(limit, offset, key);

      return { pharmacy, count };
    }
  }

  public async searchPharmacy(limit: number, offset: number, key: string): Promise<{ pharmacy: Pharmacy[]; count: number }> {
    const [pharmacy, count]: [Pharmacy[], number] = await PharmacyEntity.createQueryBuilder('ph') // first argument is an alias. Alias is what you are selecting - photos. You must specify it.
      .leftJoinAndSelect('ph.contact', 'ct')
      .leftJoinAndSelect('ph.status', 'st')
      .leftJoinAndSelect('ph.typePharmacy', 'tp')
      .where('LOWER(ph.designation) LIKE :designation', { designation: `%${key.toLowerCase()}%` })
      .orWhere('LOWER(ct.location) LIKE :location', { location: `%${key.toLowerCase()}%` })
      .orWhere('LOWER(ct.country) LIKE :country', { country: `%${key.toLowerCase()}%` })
      .limit(limit ? limit : 0)
      .offset(offset ? offset : 0)
      .getManyAndCount();

    return { pharmacy, count };
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
