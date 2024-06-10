export function convertMilliseconds(milliseconds) {
  // Calculate
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));

  // Calculate the number of hours
  const hours = Math.floor(
    (milliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );

  // Calculate the number of minutes
  const minutes = Math.floor(
    ((milliseconds % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)
  );

  // Calculate the number of seconds
  const seconds = Math.floor(
    (((milliseconds % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) %
      (60 * 1000)) /
      1000
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}
