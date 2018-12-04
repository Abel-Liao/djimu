const dataFun = function(timeNum, format = "YYYY-MM-DD") {
  let returnTime = null;
  const time = new Date(timeNum);
  const Year = time.getFullYear();
  const Month = time.getMonth() + 1;
  const Data = time.getDate();
  switch (format) {
    case "YYYY-MM-DD":
      returnTime =
        Year +
        "-" +
        (Month < 10 ? "0" + Month : Month) +
        "-" +
        (Data < 10 ? "0" + Data : Data);
      break;
    case "MM-DD-YYYY":
      returnTime =
        (Month < 10 ? "0" + Month : Month) +
        "-" +
        (Data < 10 ? "0" + Data : Data) +
        "-" +
        Year;
      break;
    default:
      returnTime =
        Year +
        "-" +
        (Month < 10 ? "0" + Month : Month) +
        "-" +
        (Data < 10 ? "0" + Data : Data);
  }
  return returnTime;
};
export default dataFun;
