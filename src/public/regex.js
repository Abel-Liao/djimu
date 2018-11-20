const regex = {
  email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
  password: /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Za-z]{1,})(?=.*[!@#$%^&*?()]).*$/,
  dynamicCode: /^\d{0,4}$/
};
function regexFun(element, content) {
  const isNull = content.match(regex[element]);
  return isNull === null ? false : true;
}
export default regexFun;
