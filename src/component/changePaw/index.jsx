import React from "react";

import PublicForm from "../withSubscription/publicForm";

function Register(props) {
  return (
    <PublicForm
      data={["email", "password", "newPassword"]}
      pageName="changepaw"
      {...props}
    />
  );
}

export default Register;
