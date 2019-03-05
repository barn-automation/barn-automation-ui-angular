import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ViewModelService} from './view-model.service';
import {ArduinoMessage} from '../model/arduino-message';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
    private viewModel: ViewModelService,
  ) { }

  getEvents() {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events` );
  }

  countEvents() {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events/count`);
  }

  getPaginatedEvents(offset, max) {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events/${offset}/${max}`);
  }

  getEventsByType(type) {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events/${type}` );
  }

  countEventsByType(type) {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events/count/${type}`);
  }

  getPaginatedEventsByType(type, offset, max) {
    return this.http.get( `${this.viewModel.currentEndpoint.url}/barn/events/${type}/${offset}/${max}`);
  }

  sendControlMessage(message: ArduinoMessage) {
    return this.http.post( `${this.viewModel.currentEndpoint.url}/barn/control`, message );
  }
}
