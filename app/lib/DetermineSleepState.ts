export enum SleepState {
	AWAKE,
	LIGHT_SLEEP,
	DEEP_SLEEP
};

type HeartRateBPM = number;

/**
 * A function that determines the state of sleep like "light sleep", "deep sleep" or "awake"
 * by using the average heart rate of the user and other information like the time of day,
 * the light from the daylight sensor and the motion from the internal gyroscope
 */
export function determineSleepState(currentHeartRate: HeartRateBPM, averageRestingHeartRate: HeartRateBPM = 60): SleepState {
	let sleepState: SleepState = SleepState.AWAKE;

	if (currentHeartRate <= averageRestingHeartRate * 0.7) {
		sleepState = SleepState.DEEP_SLEEP;
	} else if (currentHeartRate <= averageRestingHeartRate * 0.9) {
		sleepState = SleepState.LIGHT_SLEEP;
	}

	return sleepState;
}