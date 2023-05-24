export const averagePercentage = (average: number): string => {
  if (average) {
    if (typeof average === "number")
      return (
        Math.round(
          Number(
            average?.toString()?.replace(".", "").slice(0, 2) +
              "." +
              average?.toString()?.replace(".", "")?.slice(3)
          )
        ) + "%"
      );
    else return "0%";
  } else {
    return "NR";
  }
};

export const toHoursAndMinutes = (totalMinutes: number | undefined) => {
  if (totalMinutes) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    return `${hours}h ${minutes}m`;
  } else return "0h 0m";
};
