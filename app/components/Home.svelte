<script lang="ts">
  import { Application, Utils } from "@nativescript/core";
    import { SleepState, determineSleepState } from "~/lib/DetermineSleepState";
  import { calculateHeartRateAverage } from "~/lib/HeartRateAverage";
  import { generateHeartbeatData } from "~/lib/HeartRateSampler";
  import { androidRequestAudioFocus } from "~/lib/RequestAudioFocus";

  let message: string = "Blank Svelte Native App!";

  const activity: android.app.Activity =
    Application.android.startActivity || Application.android.foregroundActivity;

  const mSensorManager = activity.getSystemService(
    android.content.Context.SENSOR_SERVICE
  ) as android.hardware.SensorManager;

  const myHrListener = new android.hardware.SensorEventListener({
    onAccuracyChanged: (sensor, accuracy) => {},
    onSensorChanged: (event) => {
      console.log(event.values[0]);
      message = event.values[0].toString().split(".")[0];
    },
  });

  const mHeartRateSensor = mSensorManager.getDefaultSensor(
    android.hardware.Sensor.TYPE_HEART_RATE
  );

  const didRegListener = mSensorManager.registerListener(
    myHrListener,
    mHeartRateSensor,
    android.hardware.SensorManager.SENSOR_DELAY_NORMAL
  );

  message = didRegListener.toString();

  let lastSample = 60; // Initial sample

  let samples: number[] = [];

  // Generate a sample every 1 second
  setInterval(() => {
    lastSample = generateHeartbeatData(lastSample);
    message = lastSample.toString();
    samples.push(lastSample);

    // We only want to sample for one minute, so throw out everything after that.
    if (samples.length > 60) {
      samples = samples.slice(samples.length - 60, samples.length);
    }

    const average = calculateHeartRateAverage(samples);
    message = "Average: " + average.toString();

		const state = determineSleepState(lastSample);

		if (state == SleepState.LIGHT_SLEEP) {
			message = "Light Sleep";
		} else if (state == SleepState.DEEP_SLEEP) {
			androidRequestAudioFocus()
			message = "Deep Sleep";
		} else {
			message = "Awake";
		}
  }, 1000);

</script>

<page>
  <actionBar title="Home" flat="true" />
  <stackLayout orientation="vertical" class="layout">
    <label class="info">
      <formattedString>
        <span text={message} />
      </formattedString>
    </label>
    <button text="Request Audio Focus" on:tap={androidRequestAudioFocus} />
		<button text="Restart" on:tap={() => {
			samples = [];
			lastSample = 60;
		}} />
  </stackLayout>
</page>

<style>
  .layout {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .info {
    font-size: 20;
    horizontal-align: center;
    vertical-align: center;
  }
</style>
