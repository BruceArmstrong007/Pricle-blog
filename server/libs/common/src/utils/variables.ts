export enum RequestMethods {
  GET = 'GET',
  DELETE = 'DELETE',
  POST = 'POST',
  PUT = 'PUT',
}

export enum ContactStatus {
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  ACCEPTED = 'ACCEPTED',
  FRIENDS = 'FRIENDS',
  BLOCKED = 'BLOCKED',
}

export enum ContactType {
  SENDER = 'SENT',
  RECEIVER = 'RECEIVED',
}

export enum TokenType {
  RESET_PASSWORD = 'RESET_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export type UploadProfile = {
  filename: string;
  url: string;
};

export interface ContactNotification {
  status: string;
  userID: string;
  contactID: string;
}


export type EditableFieldState = 'Edit' | 'View' | 'Load';
