import { EntityState } from '@ngrx/entity';
import { ContactStatus, ContactType } from '../../shared/utils/variables';

export interface ContactsState extends EntityState<ContactDetails> {
  state: 'init' | 'loading' | 'loaded' | 'error';
}

export interface ContactsFailure {
  message: string;
  statusCode: number;
}

export interface ContactDetails {
  _id: string;
  name: string;
  username: string;
  bio: string;
  profile: {
    url: string;
    filename: string;
  };
  createdAt: string;
  updatedAt: string;
  status: ContactStatus;
  type: ContactType;
}

export interface ContactPayload {
  contactID: string;
}

export interface SeenContact {
  contactID: string;
  type: ContactType;
  status: ContactStatus;
}
