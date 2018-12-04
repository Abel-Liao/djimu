import React from "react";

import PublicForm from "../withSubscription/publicForm";

function Register(props) {
  return (
    <PublicForm data={["email", "dynamicCode"]} pageName="forget" {...props} />
  );
}

export default Register;
