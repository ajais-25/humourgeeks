import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <SignUp signInUrl="/login" forceResirectUrl={"/setups"} />
    </div>
  );
};

export default Register;
