export class ArduinoMessage {

  public static ARDUINO_MOTOR_O: number = 0;
  public static ARDUINO_MOTOR_1: number = 1;
  public static ARDUINO_DOOR_0: number = 10;
  public static ARDUINO_DOOR_1: number = 11;
  public static ARDUINO_RELAY_0: number = 20;
  public static ARDUINO_WATER_0: number = 30;
  public static ARDUINO_WATER_1: number = 31;
  public static ARDUINO_CAMERA_0: number = 40;
  public static ARDUINO_DOOR_LED_0: number = 50;
  public static ARDUINO_DOOR_LED_1: number = 51;
  public static ARDUINO_OPEN: number = 100;
  public static ARDUINO_CLOSE: number = 101;
  public static ARDUINO_ON: number = 200;
  public static ARDUINO_OFF: number = 201;
  public static ARDUINO_EMPTY: number = 300;
  public static ARDUINO_FILL: number = 301;

  public static MOTOR_O: string = 'MOTOR_O';
  public static MOTOR_1: string = 'MOTOR_1';
  public static DOOR_0: string = 'DOOR_0';
  public static DOOR_1: string = 'DOOR_1';
  public static RELAY_0: string = 'RELAY_0';
  public static WATER_0: string = 'WATER_0';
  public static WATER_1: string = 'WATER_1';
  public static CAMERA_0: string = 'CAMERA_0';
  public static DOOR_LED_0: string = 'DOOR_LED_0';
  public static DOOR_LED_1: string = 'DOOR_LED_1';
  public static TEMP_0: string = 'TEMP_0';
  public static LIGHT_0: string = 'LIGHT_0';
  public static OPEN: string = 'OPEN';
  public static CLOSE: string = 'CLOSE';
  public static CLOSED: string = 'CLOSED';
  public static ON: string = 'ON';
  public static OFF: string = 'OFF';
  public static EMPTY: string = 'EMPTY';
  public static FILL: string = 'FILL';

  public type: number;
  public message: number;

  constructor(type: number, message: number) {
    this.type = type;
    this.message = message;
  }
}
