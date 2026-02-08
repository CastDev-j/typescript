export const getTime = () => {
  const time = new Date();
  const seconds = time.getSeconds() + time.getMilliseconds() / 1000;
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const secondSegment = (seconds / 60) * 360;
  const minuteSegment = (minutes / 60) * 360;
  const hourSegment = (hours / 12) * 360;

  return {
    hourSegment,
    minuteSegment,
    secondSegment,
  };
};
