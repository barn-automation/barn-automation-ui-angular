import {EventEmitter, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Endpoint} from '../model/endpoint';

@Injectable({
  providedIn: 'root'
})
export class ViewModelService {

  public viewModelEmitter: EventEmitter<any> = new EventEmitter();
  public currentEndpoint: Endpoint;

  constructor() {
    this.currentEndpoint = environment.endpoints[0];
  }

  getEndpoints() {
    return environment.endpoints;
  }

  setEndpoint(endpoint: Endpoint) {
    this.currentEndpoint = endpoint;
    this.viewModelEmitter.emit({item: 'endpoint'});
  }

}
