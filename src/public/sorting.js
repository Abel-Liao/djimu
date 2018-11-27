const getTimeFun = function(time) {
  if (isNaN(time)) {
    return new Date(time).getTime();
  } else {
    return time;
  }
};

const sortingFun = function(arr, chooseName) {
  let temporaryArr = arr;
  for (let i = 0, arrLength = temporaryArr.length; i < arrLength; i++) {
    for (
      let j = 0, arrLength = temporaryArr.length;
      j < arrLength - 1 - i;
      j++
    ) {
      if (chooseName === "date") {
        if (
          getTimeFun(temporaryArr[j].date) <
          getTimeFun(temporaryArr[j + 1].date)
        ) {
          let temp = temporaryArr[j + 1];
          temporaryArr[j + 1] = temporaryArr[j];
          temporaryArr[j] = temp;
        }
      } else {
        if (
          temporaryArr[j][chooseName].number <
          temporaryArr[j + 1][chooseName].number
        ) {
          let temp = temporaryArr[j + 1];
          temporaryArr[j + 1] = temporaryArr[j];
          temporaryArr[j] = temp;
        }
      }
    }
  }
  return temporaryArr;
};

export default sortingFun;
