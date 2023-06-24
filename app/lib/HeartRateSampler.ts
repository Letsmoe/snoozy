export function generateHeartbeatData(lastSample: number): number {
  const minChange = -5;
  const maxChange = 3;

  // Generate a random number within the range of minChange and maxChange
  const change = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

  // Calculate the new sample by adding the change to the last sample
  const newSample = lastSample + change;

  return newSample;
}