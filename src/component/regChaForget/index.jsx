import React from 'react';

import PublicForm from '../withSubscription/publicForm';

function ChangePaw(props) {
  return <PublicForm data={['email', 'password', 'newPassword']} pageName="changepaw" {...props} />;
}

function ForgetPaw(props) {
  return <PublicForm data={['email', 'dynamicCode']} pageName="forget" {...props} />;
}

function Register(props) {
  return (
    <PublicForm
      data={['email', 'password', 'againPassword', 'dynamicCode']}
      pageName="register"
      {...props}
    />
  );
}
export { Register, ChangePaw, ForgetPaw };
