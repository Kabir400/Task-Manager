//this is custom hook that checks the whether user is logged in or not if user logged in you can't access the login page

//base url
const base_url = import.meta.env.VITE_BASE_URL;

import { useNavigate } from "react-router-dom";
import getRequest from "../utility/getRequest.js";
import { useEffect, useState } from "react";

function useVerify() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await getRequest(`${base_url}/islogin`);
      if (result.suceess === true) {
        navigate("/");
      }
    })();
  }, []);
}

//an unexpected error happend in this approach
// function useVerify() {
//   const navigate = useNavigate();
//   const [isVerified, setIsVerified] = useState(null);

//   (async () => {
//     const result = await getRequest(`${base_url}/islogin`);
//     if (result.suceess === true) {
//       setIsVerified(true);
//       navigate("/");
//     } else {
//       setIsVerified(false);
//     }
//   })();

//   return isVerified;
// }

export default useVerify;
