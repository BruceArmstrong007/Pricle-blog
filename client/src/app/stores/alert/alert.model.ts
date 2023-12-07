import { EntityState } from "@ngrx/entity";

export type AlertType = 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';

export interface AlertState extends EntityState<Alerts> {
}

export interface Alerts {
    id: string,
    title: string,
    message: string,
    type: AlertType
}