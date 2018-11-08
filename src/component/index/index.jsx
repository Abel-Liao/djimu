import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <h2>This is index page!</h2>
      <Link to="/login">Go to login page!</Link>
    </div>
  );
};
export default Index;
