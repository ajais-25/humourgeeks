import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <SignIn signUpUrl="/signup" forceResirectUrl={"/setups"} />
    </div>
  );
};

export default Login;
