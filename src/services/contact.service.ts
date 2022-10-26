import { EntityRepository, Repository } from 'typeorm';
import { ContactEntity } from '@entities/Contact.entity';
import { Contact } from '@interfaces/contact.interface';
import { User } from '@/interfaces/users.interface';

@EntityRepository()
class ContactService extends Repository<ContactEntity> {
  public async findAllContact(limit: number, offset: number): Promise<Contact[]> {
    const contacts: Contact[] = await ContactEntity.find({
      where: {},
      relations: ['user'],
      order: { id: 'ASC' },
      take: limit,
      skip: offset,
    });

    return contacts;
  }

  public async getContactById(contactId: number): Promise<Contact> {
    const contact: Contact = await ContactEntity.findOne({
      where: { id: contactId },
    });

    return contact;
  }
}
export default ContactService;
