function getTimeFun(time) {
  /* eslint-disable */
  if (isNaN(time)) {
    /* eslint-enable */
    return new Date(time).getTime();
  }
  return time;
}

function sortingFun(arr, chooseName) {
  const temporaryArr = arr;
  for (let i = 0, arrLength = temporaryArr.length; i < arrLength; i += 1) {
    for (let j = 0; j < temporaryArr.length - 1 - i; j += 1) {
      if (chooseName === 'date') {
        if (getTimeFun(temporaryArr[j].date) < getTimeFun(temporaryArr[j + 1].date)) {
          const temp = temporaryArr[j + 1];
          temporaryArr[j + 1] = temporaryArr[j];
          temporaryArr[j] = temp;
        }
      } else if (temporaryArr[j][chooseName].number < temporaryArr[j + 1][chooseName].number) {
        const temp = temporaryArr[j + 1];
        temporaryArr[j + 1] = temporaryArr[j];
        temporaryArr[j] = temp;
      }
    }
  }
  return temporaryArr;
}

export default sortingFun;
