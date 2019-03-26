export const localTimeToTaiwanTime = () => {
  // create a local time
  const local = new Date();
  /*
    getTime() returns the number of milliseconds, and it always use UTC time,
    so a client browser in one timezone, getTime() will be the same as a client browser
    in any other timezone.

    getTimeZoneOffset() returns the difference, in minutes, from local time to UTC.
    it means in Taiwan(+8) will be -480 (0 - 8 * 60)

    * 60 * 1000 => convert minutes to ms
  */

  // now currentTaiwanTimeInUTC is the tawian time but in utc form
  const currentTaiwanTimeInUTC = local.getTime() + 8 * 60 * 60 * 1000;
  return new Date(currentTaiwanTimeInUTC);
};
