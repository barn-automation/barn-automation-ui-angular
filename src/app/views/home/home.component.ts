import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../../service/data.service';
import {EventStreamService} from '../../service/event-stream.service';
import {Title} from '@angular/platform-browser';
import {ArduinoMessage} from '../../model/arduino-message';
import {UIChart} from 'primeng/chart';
import {formatDate} from '@angular/common';
import {Galleria} from 'primeng/primeng';
import {environment} from '../../../environments/environment';
import {ViewModelService} from '../../service/view-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public eventSource: EventSource;
  public eventSourceConnected: boolean = false;
  public liveData: any = [];
  public temperatureArr: any = [];
  public humidityArr: any = [];
  public tempChartData: any;
  public tempLabels: any = [];
  public lightLabels: any = [];
  public lightArr: any = [];
  public water0Arr: any = [];
  public water1Arr: any = [];
  public waterLabels: any = [];
  public waterChartData: any;
  public lightChartData: any;
  public water0Enabled: boolean = false;
  public cameraArr: any = [];
  public imageBaseUrl: string = environment.objectStorageBaseUrl;
  public selectedImg: any;
  public showImgDialog: boolean = false;
  public doors: any = {door0: {status: 'UNKNOWN'}, door1: {status: 'UNKNOWN', light: 'UNKNOWN'}};
  public OPEN: string = ArduinoMessage.OPEN;
  public CLOSED: string = ArduinoMessage.CLOSED;
  public showLoadingModal: boolean = true;
  public dataSourceNotConnecting: boolean = false;
  public currentDegreesF: number = null;
  public currentDegreesC: number = null;
  public currentHumidity: number = null;
  public tempUpdatedAt: string = null;
  public viewModelSubscription: any;
  public ON: number = ArduinoMessage.ARDUINO_ON;
  public OFF: number = ArduinoMessage.ARDUINO_OFF;
  public DOOR_LED_1: number = ArduinoMessage.ARDUINO_DOOR_LED_1;
  public WATER_0: number = ArduinoMessage.ARDUINO_WATER_0;
  private changeInterval: any;


  @ViewChild('tempChart') tempChart: UIChart;
  @ViewChild('lightChart') lightChart: UIChart;
  @ViewChild('waterChart') waterChart: UIChart;
  @ViewChild('cameraGallery') cameraGallery: Galleria;

  constructor(
    private dataService: DataService,
    private eventStreamService: EventStreamService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
    private viewModelService: ViewModelService,
  ) {
    this.changeDetectorRef.detach();
    this.changeInterval = setInterval( () => { this.changeDetectorRef.detectChanges() }, 1000);
  }

  ngOnInit() {
    this.titleService.setTitle('Barn Automation: Home');

    this.viewModelSubscription = this.viewModelService.viewModelEmitter.subscribe((data) => {
      if( data.item === 'endpoint' ) {
        // new endpoint selected!
        // close the existing event source and re-open
        this.eventStreamService.close();
        this.connectEventStream();
      }
    })

    this.initLoadingDialog();

    this.connectEventStream();

    this.tempChartData = {
      labels: [],
      datasets: [
        {
          label: '° Fahrenheit',
          data: this.temperatureArr,
          fill: false,
          borderColor: '#c01d29'
        },
        {
          label: '% Humidity',
          data: this.humidityArr,
          fill: false,
          borderColor: '#0d8808'
        }
      ],
    };

    this.waterChartData = {
      labels: [],
      datasets: [
        {
          label: 'Pet Level (ml)',
          data: this.water0Arr,
          fill: false,
          borderColor: '#2126c0'
        },
        /*
        {
          label: 'Source Level',
          data: this.water1Arr,
          fill: false,
          borderColor: '#c0269a'
        },
        */
      ],
    };

    this.lightChartData = {
      labels: [],
      datasets: [
        {
          label: 'Ambient Light',
          data: this.lightArr,
          fill: false,
          borderColor: '#8c0bc0'
        },
        /*
        {
          label: 'Source Level',
          data: this.water1Arr,
          fill: false,
          borderColor: '#c0269a'
        },
        */
      ],
    };
  }
  ngOnDestroy() {
    this.eventStreamService.close();
    this.viewModelSubscription.unsubscribe();

      clearInterval(this.changeInterval);
  }

  toggleEventStream() {
    if( this.eventSourceConnected ) {
      this.disconnectEventStream();
    }
    else {
      this.connectEventStream();
    }
  }

  initLoadingDialog() {
    setTimeout( () => {
      if( !this.eventSourceConnected && this.showLoadingModal ) {
        this.dataSourceNotConnecting = true;
      }
    }, 5000);
  }

  connectEventStream() {
    this.eventSource = this.eventStreamService.connect();
    this.showLoadingModal = true;
    this.dataSourceNotConnecting = false;
    this.initLoadingDialog();
    this.eventSource.onopen = () => {
      this.eventSourceConnected = true;
      this.showLoadingModal = false;
    };
    this.initEventListener();
  }

  initEventListener() {
    this.eventSource.onmessage = (message) => {
      const event = JSON.parse(message.data);
      this.liveData = [event.message].concat(this.liveData);
      if( !event.hasOwnProperty("message") || !event.message.hasOwnProperty("type") ){ return; }

      switch (event.message.type) {
        case ArduinoMessage.TEMP_0:
          if( this.tempLabels.length >= 10 ) this.tempLabels.shift();
          if( this.temperatureArr.length >= 10 ) this.temperatureArr.shift();
          if( this.humidityArr.length >= 10 ) this.humidityArr.shift();

          this.currentDegreesF = event.message.data.fahrenheit;
          this.currentDegreesC = event.message.data.celsius;
          this.currentHumidity = event.message.data.humidity;
          this.temperatureArr = this.temperatureArr.concat([this.currentDegreesF]);
          this.humidityArr = this.humidityArr.concat([this.currentHumidity]);
          this.tempUpdatedAt = formatDate(new Date(event.message.capturedAt), 'HH:mm:ss', 'en-US');
          this.tempLabels = this.tempLabels.concat([this.tempUpdatedAt]);
          this.tempChartData.datasets[0].data = this.temperatureArr;
          this.tempChartData.datasets[1].data = this.humidityArr;
          this.tempChartData.labels = this.tempLabels;
          this.tempChart.refresh();
          break;
        case ArduinoMessage.LIGHT_0:
          if( this.lightLabels.length >= 10 ) this.lightLabels.shift();
          if( this.lightArr.length >= 10 ) this.lightArr.shift();

          this.lightArr = this.lightArr.concat([event.message.data.level]);
          const lightUpdatedAt = formatDate(new Date(event.message.capturedAt), 'HH:mm:ss', 'en-US');
          this.lightLabels = this.lightLabels.concat([lightUpdatedAt]);
          this.lightChartData.datasets[0].data = this.lightArr;
          this.lightChartData.labels = this.lightLabels;
          this.lightChart.refresh();
          break;
        case ArduinoMessage.WATER_0:
        case ArduinoMessage.WATER_1:
          if( this.waterLabels.length >= 10 ) this.waterLabels.shift();
          const waterLbl = formatDate(new Date(event.message.capturedAt), 'HH:mm:ss', 'en-US')
          if( this.waterLabels.indexOf(waterLbl) === -1 ) {
            this.waterLabels = this.waterLabels.concat([waterLbl]);
          }
          this.waterChartData.labels = this.waterLabels;

          if( event.message.type === ArduinoMessage.WATER_0 ) {
            if( this.water0Arr.length >= 10 ) this.water0Arr.shift();
            this.water0Arr = this.water0Arr.concat([event.message.data.level]);
            this.water0Enabled = event.message.data.enabled;
            this.waterChartData.datasets[0].data = this.water0Arr;
            this.waterChart.refresh();
          }
          if( event.message.type === ArduinoMessage.WATER_1 ) {
            if( this.water1Arr.length >= 10 ) this.water1Arr.shift();
            this.water1Arr = this.water1Arr.concat([event.message.data.level]);
            this.waterChartData.datasets[1].data = this.water1Arr;
            this.waterChart.refresh();
          }
          break;
        case ArduinoMessage.CAMERA_0:
          if( this.cameraArr.length >= 20 ) this.cameraArr.shift();
          this.cameraArr = this.cameraArr.concat({
            source: `${this.imageBaseUrl}/${event.message.data.key}`,
            alt: `Motion capture image`,
            title: `Captured at ${formatDate(event.message.capturedAt, 'full', 'en-US')}`,
            class: 'img-fluid'
          });
          break;
        case ArduinoMessage.DOOR_0:
          this.doors = {door0: {status: event.message.data.status}, door1: this.doors['door1']};
          //this.changeDetectorRef.detectChanges();
          break;
        case ArduinoMessage.DOOR_1:
          this.doors = {door0: this.doors['door0'], door1: {status: event.message.data.status, light: event.message.data.light}};
          //this.changeDetectorRef.detectChanges();
          break;
      }

      //this.changeDetectorRef.detectChanges();
    };
  }

  disconnectEventStream() {
    this.eventStreamService.close();
    this.eventSourceConnected = false;
  }

  selectImg(img) {
    this.selectedImg = img;
    this.showImgDialog = true;
    return false;
  }

  emptyWater(sensor) {
    this.dataService.sendControlMessage(
      new ArduinoMessage(sensor, ArduinoMessage.ARDUINO_EMPTY)
    ).subscribe( response => {
      console.log(response);
    });
  }

  toggleWater(sensor) {
    this.dataService.sendControlMessage(
      new ArduinoMessage(sensor, this.water0Enabled ? ArduinoMessage.ARDUINO_OFF : ArduinoMessage.ARDUINO_ON)
    ).subscribe( response => {
      console.log(response);
    });
  }

  controlDoor(doorNum, open=true) {
    let door;
    switch (doorNum) {
      case 0:
        door = ArduinoMessage.ARDUINO_DOOR_0;
        break;
      case 1:
        door = ArduinoMessage.ARDUINO_DOOR_1;
        break;
    }
    this.dataService.sendControlMessage(
      new ArduinoMessage(door, open ? ArduinoMessage.ARDUINO_OPEN : ArduinoMessage.ARDUINO_CLOSE)
    ).subscribe( response => {
      console.log(response);
    });
  }

  controlLight(lightNum, state) {
    this.dataService.sendControlMessage( new ArduinoMessage(lightNum, state) ).subscribe( response => {
      console.log(response);
    });
  }
}
