export function calculateHeartRateAverage(samples: number[]): number {
	// Calculate the sum of all the samples
	const sum = samples.reduce((a, b) => a + b, 0);

	// Calculate the average of all the samples
	const average = sum / samples.length;

	// Round the average to the nearest integer
	const roundedAverage = Math.round(average);

	return roundedAverage;
}