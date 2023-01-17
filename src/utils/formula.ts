const getHours = (time: number) => {
  let seconds = Math.round(time / 1000);
  let minutes = Math.round(seconds / 60);
  let hours = Number((minutes / 60).toFixed(2));

  return hours;
};

export const getEficiencia = (activities: any[]) => {
  let results: number[] = [];

  activities?.forEach((i) => {
    if (i.startedAt) {
      let time = getHours((i.endedAt || Date.now()) - i.startedAt);
      let wanted = i.hours;
      let devolucion = 0;

      let resultado = ((wanted - time - devolucion) / wanted + 1) * 100;

      results.push(resultado);
    }
  });

  return results.reduce((acc, curr) => acc + curr, 0) / results.length;
};
