export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour12: true,
  });
}

// 12/2/2024, 08:35 PM
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    timeZone: "Asia/Manila",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// 08:35 PM
export function formatTime(date: Date | string): string {
  const d = new Date(date);

  return d.toLocaleTimeString("en-US", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
