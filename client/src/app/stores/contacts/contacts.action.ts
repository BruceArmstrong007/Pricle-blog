import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ContactDetails, SeenContact } from './contacts.model';

export const contactsActions = createActionGroup({
  source: 'Contacts Actions',
  events: {
    Contacts: emptyProps(),
    ContactsSuccess: props<{ contacts: ContactDetails[] }>(),
    ContactsFailure: emptyProps(),

    SeenContact: props<{ request: SeenContact }>(),
    SeenContactSuccess: props<{ contactID: string }>(),
    SeenContactFailure: emptyProps(),

    ResetState: emptyProps(),
  },
});
