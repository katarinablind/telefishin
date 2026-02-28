/**
 * One timezone per region for the Join sheet.
 * Label format: GMT+/- (City). Value is IANA for day/night.
 */
export const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: "Pacific/Auckland", label: "GMT+12 (Auckland)" },
  { value: "Australia/Sydney", label: "GMT+10 (Sydney)" },
  { value: "Asia/Tokyo", label: "GMT+9 (Tokyo)" },
  { value: "Asia/Seoul", label: "GMT+9 (Seoul)" },
  { value: "Asia/Shanghai", label: "GMT+8 (Shanghai)" },
  { value: "Asia/Singapore", label: "GMT+8 (Singapore)" },
  { value: "Asia/Dubai", label: "GMT+4 (Dubai)" },
  { value: "Europe/Moscow", label: "GMT+3 (Moscow)" },
  { value: "Europe/Helsinki", label: "GMT+2 (Helsinki)" },
  { value: "Europe/Paris", label: "GMT+1 (Paris)" },
  { value: "Europe/London", label: "GMT+0 (London)" },
  { value: "America/Sao_Paulo", label: "GMT−3 (São Paulo)" },
  { value: "America/New_York", label: "GMT−5 (New York)" },
  { value: "America/Chicago", label: "GMT−6 (Chicago)" },
  { value: "America/Denver", label: "GMT−7 (Denver)" },
  { value: "America/Los_Angeles", label: "GMT−8 (Los Angeles)" },
  { value: "America/Anchorage", label: "GMT−9 (Anchorage)" },
  { value: "Pacific/Honolulu", label: "GMT−10 (Honolulu)" },
];
