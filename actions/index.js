import axios from "axios";
import Cookies from "js-cookie";

// 'экшен  который получит секретные данные при условии проверки и идентификации токена

const setAuthHeader = () => {
  const token = Cookies.getJSON("jwt");
  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` }
    };
    return undefined;
  }
};

export const getSecretData = async () => {
  return await axios
    .get("/api/v1/secret", setAuthHeader())
    .then(response => response.data);
};
