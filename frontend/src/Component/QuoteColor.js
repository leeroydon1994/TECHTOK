export default function changeFontColor(input) {
  var fontStyle = {};
  if (input > 0) {
    fontStyle = { color: "green" };
  }
  if (input < 0) {
    fontStyle = { color: "red" };
  }
  return fontStyle;
}
