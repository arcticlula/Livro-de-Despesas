export function isTimestamp(o) {
  return o && o.constructor.name === 'Timestamp';
}

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}