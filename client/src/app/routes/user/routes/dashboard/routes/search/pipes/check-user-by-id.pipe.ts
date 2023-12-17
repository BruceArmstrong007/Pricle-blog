import { Pipe, PipeTransform } from '@angular/core';
import { ContactDetails } from '../../../../../../../stores/contacts/contacts.model';

@Pipe({
  name: 'checkUserByID',
  standalone: true,
})
export class CheckUserByIDPipe implements PipeTransform {
  transform(value: ContactDetails[], id: string): unknown {
    return value.find((user) => user._id === id);
  }
}
