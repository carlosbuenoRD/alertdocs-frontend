export function dateFormat(date: Date, option: string) {
  let format = new Date(date);

  if (option === "date") {
    return `${
      format.getMonth() + 1
    }/${format.getDate()}/${format.getFullYear()}`;
  }

  if (option === "time") {
    return `${format.getHours()}:${
      format.getMinutes() < 10 ? "0" + format.getMinutes() : format.getMinutes()
    }`;
  }
}

export function formatTime(devoluciones: any[]) {
  let result = devoluciones.reduce(
    (acc, curr) => (acc += (curr?.endedAt || Date.now()) - curr.startedAt),
    0
  );

  return result || 0;
}

// const AmPm = (hour: number) => {
//     if(hour)
// }
