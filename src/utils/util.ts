export const getTimeFormat = (time: Date) => {
  const minutesFormat =
    time?.getMinutes()?.toString()?.length === 1
      ? `0${time?.getMinutes()}`
      : time?.getMinutes();
  return {
    hours: time?.getHours(),
    minutes: minutesFormat,
    label: `${time?.getHours() || "00"}:${minutesFormat || "00"}`,
  };
};

export const getCurrentTime = (dateTime: string) => {
  if (dateTime) {
    const indexOffsetPlus = dateTime?.indexOf("+");
    const indexOffsetMinus = dateTime?.length - 6;
    const currentTime = dateTime?.substring(
      0,
      indexOffsetPlus > -1 ? indexOffsetPlus : indexOffsetMinus
    );

    return currentTime;
  }
  return "";
};

export const getAheadBehind = (dateTime: string) => {
  const indexOffsetPlus = dateTime?.indexOf("+");
  return indexOffsetPlus > -1 ? "ahead" : "behind";
};

export const getDiffTimeInLabel = (
  currentTimeOffset: string,
  targetTimeOffset: string
) => {
  const aheadOrBehind = targetTimeOffset.substring(0, 1);
  const label = aheadOrBehind === "+" ? "ahead" : "behind";

  const diffTime = Math.abs(
    +currentTimeOffset.substring(1, 3) - +targetTimeOffset.substring(1, 3)
  );
  return diffTime === 0 ? "" : `${diffTime} hours ${label}`;
};

export const getDiffTime = (currentDate: Date, targetDate: Date) => {
  let diff = (currentDate.getTime() - targetDate.getTime()) / 1000;
  diff /= 60 * 60;

  const aheadOrBehind = Math.round(diff) > 0 ? "ahead" : "behind";
  return {
    diff: Math.round(diff),
    label:
      Math.round(diff) === 0
        ? ""
        : `${Math.abs(Math.round(diff))} hours ${aheadOrBehind}`,
  };
};
