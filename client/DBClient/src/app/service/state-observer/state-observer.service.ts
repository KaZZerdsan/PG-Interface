import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class StateObserverService {

  constructor() { }

  private static entity = {
    EMPLOYEE: 'employee',
    ORDERS: 'orders',
    REPAIRS: 'repair',
    ACTIONS: 'action',
    SERVICES: 'service',
    DIRECTORS: 'director',
    PARTORDER: 'partorder',
    MALFUNCTION: 'malfunction',
    CUSTOMER: 'customer',
    DEVICE: 'device',
    MOVIES: 'movie',
  };

  private stateObserver = new Subject<StateData>();
  public state$ = this.stateObserver.asObservable();
  public emit(data: string, list: any) {
    this.stateObserver.next({
      tableName: data,
      table: list
    });
  }
}

export interface StateData {
  tableName: string;
  table: any;
}
