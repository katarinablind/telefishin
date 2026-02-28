/**
 * Simple hour-based day/night for a timezone (no sunrise/sunset).
 * Day = 7:00–19:00 in that timezone.
 */
export function isDayInTimezone(
  timezone: string,
  now: Date = new Date()
): boolean {
  const hour = getHourInTimezone(timezone, now);
  return hour >= 7 && hour < 19;
}

export function getHourInTimezone(
  timezone: string,
  now: Date = new Date()
): number {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    hour: "numeric",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const hourPart = parts.find((p) => p.type === "hour");
  return hourPart ? parseInt(hourPart.value, 10) : 12;
}
