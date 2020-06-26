export function isTimestamp(o) {
  return o && o.constructor.name === 'Timestamp';
}

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && !isNaN(n - 0)
}

export const saveData = (function () {
  let a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    let blob = new Blob([data], { type: "octet/stream" }), url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();
