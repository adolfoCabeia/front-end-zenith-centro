export function formatKz(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "0 Kz";

  return new Intl.NumberFormat("pt-AO", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num) + " Kz";
}

export const formatKzShort = (value: number | string): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "0 Kz";
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(".", ",") + "M Kz";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(".", ",") + "K Kz";
  }
  
  return num.toLocaleString("pt-AO") + " Kz";
};