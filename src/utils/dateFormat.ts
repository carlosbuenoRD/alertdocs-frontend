export function dateFormat(date: Date, option: string) {
  let format = new Date(date);

  if (option === "date") {
    return `${
      format.getMonth() + 1
    }/${format.getDate()}/${format.getFullYear()}`;
  }

  if (option === "time") {
    return `${format.getHours()}:${format.getMinutes()}`;
  }
}

// const AmPm = (hour: number) => {
//     if(hour)
// }
