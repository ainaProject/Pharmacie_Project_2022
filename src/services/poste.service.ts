import { EntityRepository, Repository } from 'typeorm';
import { Poste } from '@/interfaces/poste.interface';
import { PosteEntity } from '@/entities/Poste.entity';

@EntityRepository()
class PosteService extends Repository<PosteEntity> {
  public async findAllPoste(limit: number, offset: number, pharmacyId: number): Promise<{ poste: Poste[]; count: number }> {
    const [poste, count]: [Poste[], number] = await PosteEntity.createQueryBuilder('qb')
      .leftJoinAndSelect('qb.pharmacy', 'ph')
      .where('ph.id = :id', { id: pharmacyId })
      .limit(limit ? limit : 0)
      .offset(offset ? offset : 0)
      .orderBy('qb.id', 'ASC')
      .getManyAndCount();

    return { poste, count };
  }
}
export default PosteService;
