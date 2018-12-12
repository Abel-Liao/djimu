const regex = {
  email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  password: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]{1,})(?=.*[!@#$%^&*?()]).*$/,
  dynamicCode: /^\d{4}$/,
  number: /^[0-9]*$/
};
function regexFun(element, content) {
  const temporary =
    element === "againPassword" || element === "newPassword"
      ? "password"
      : element;
  const isNull = content.match(regex[temporary]);
  return isNull === null ? false : true;
}
export default regexFun;
