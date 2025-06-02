import Axios from "./caller.sevice";

  const resquestResetPassword =(credential) => {
    return Axios.post("/password/request",credential);
  };
const resetPassword =(credential) => {
    return Axios.post("/password/reset",credential);
  };
  export const forgetPassword = { resquestResetPassword, resetPassword  };