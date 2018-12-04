import React from "react";

import PublicForm from "../withSubscription/publicForm";

function Register(props) {
  return (
    <PublicForm
      data={["email", "password", "againPassword", "dynamicCode"]}
      pageName="register"
      {...props}
    />
  );
}

export default Register;
