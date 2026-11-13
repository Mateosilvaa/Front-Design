export function parseDuration(duration) {
  if (duration.includes("h")) {
    const [h, m] = duration.split("h");
    return (parseInt(h, 10) || 0) * 60 + (parseInt(m, 10) || 0);
  }
  if (duration.includes("min")) {
    return parseInt(duration, 10) || 0;
  }
  return 30;
}

export function getTotalDurationMinutes(services) {
  return services.reduce((acc, s) => acc + parseDuration(s.duration), 0) || 60;
}

export function getTotalPrice(services) {
  return services.reduce((acc, s) => acc + s.price, 0);
}
