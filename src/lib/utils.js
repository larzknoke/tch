export function dateFormatter(date, withTime = true) {
  if (!date) return "Datum: k.A.";
  if (!withTime) {
    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
    });
  } else {
    return new Date(date).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  }
}
