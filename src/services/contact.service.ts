import { EntityRepository, Repository } from 'typeorm';
import { ContactEntity } from '@entities/Contact.entity';
import { Contact } from '@interfaces/contact.interface';
import { CreateContactDto } from '@/dtos/contact.dto';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from 'class-validator';

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

  public async updateContact(contactId: number, contactData: CreateContactDto): Promise<Contact> {
    const findContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    if (!findContact) throw new HttpException(409, 'contact not found');

    await ContactEntity.update(contactId, { ...contactData });

    const updateContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });
    return updateContact;
  }

  public async deleteContact(contactId: number): Promise<Object> {
    if (isEmpty(contactId)) throw new HttpException(400, 'contactId not found');

    const findContact: Contact = await ContactEntity.findOne({ where: { id: contactId } });

    if (!findContact) throw new HttpException(409, 'produitId not found');

    await ContactEntity.delete({ id: contactId });
    return { success: true };
  }

  public async createContact(contactData: CreateContactDto): Promise<Contact> {
    if (isEmpty(contactData)) throw new HttpException(400, 'userData is empty');

    const createContacte: Contact = await ContactEntity.create({ ...contactData }).save();

    return createContacte;
  }
}
export default ContactService;
