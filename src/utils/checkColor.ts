export const checkColor = (eficiencia: number) => {
  if (eficiencia > 120) return "bg-green-400";
  if (eficiencia < 120 && eficiencia >= 100) return "bg-yellow-400";
  if (eficiencia < 100) return "bg-pink-400";
};
