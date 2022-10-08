import {EntityRepository, Repository} from "typeorm";
import {ContactEntity} from "@entities/Contact.entity";
import UserService from "@services/users.service";
import {User} from "@interfaces/users.interface";
import {UserEntity} from "@entities/users.entity";
import {Contact} from "@interfaces/contact.interface";

@EntityRepository()
class ContactService extends Repository<ContactEntity> {
  public async findAllContact(limit: number, offset: number): Promise<Contact[]> {
    const contacts: Contact[] = await ContactEntity.find({
      where: {},
      relations: ['user'],
      order:{'id':'ASC'},
      take: limit,
      skip: offset
    });

    return contacts;
  }
}
export default ContactService;
