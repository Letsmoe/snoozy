import {
  AndroidSensors,
  AndroidSensorListener,
  SensorDelay,
} from "nativescript-android-sensors";

// Write a function that returns the motion from the phone's internal gyro sensor
export function getGyroscopeData(callback: (data: any) => void) {
  const sensors = new AndroidSensors();
  let gyroScope: android.hardware.Sensor;

  const sensorListener = new AndroidSensorListener({
    onAccuracyChanged: (sensor: android.hardware.Sensor, accuracy: number) => {
      console.log("accuracy", accuracy);
    },
    onSensorChanged: (result: string) => {
      // result is being returned as a string currently
      const parsedData = JSON.parse(result);
      const rawSensorData = parsedData.data;
      const sensor = parsedData.sensor;
      const time = parsedData.time;

			callback(parsedData);
    },
  });

  sensors.setListener(sensorListener);

  // here we are using the android const 4 which is for the TYPE_GYROSCOPE sensor
  // https://developer.android.com/reference/android/hardware/Sensor.html#TYPE_GYROSCOPE
  // we are passing the third argument to `startSensor` which is for maxReportLatency, if the sensor is able to support FIFO this will register the sensor with the reporting latency value, if not, the sensor registers on the background thread as normal
  gyroScope = sensors.startSensor(4, SensorDelay.NORMAL, 4000000);

  // maybe you wanna use a timeout and stop it after 8 seconds
  setTimeout(() => {
    sensors.stopSensor(gyroScope);
  }, 8000);
}
