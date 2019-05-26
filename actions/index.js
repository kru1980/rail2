import axios from "axios";
import Cookies from "js-cookie";
import { getCookiesFromRequestFunction } from "../helpers/utils";

// 'экшен  который получит секретные данные при условии проверки и идентификации токена

const setAuthHeader = req => {
  const token = req
    ? getCookiesFromRequestFunction(req, "jwt")
    : Cookies.getJSON("jwt");
  if (token) {
    return {
      headers: { authorization: `Bearer ${token}` }
    };
    return undefined;
  }
};

export const getSecretData = async req => {
  const url = "http://localhost:3000/api/v1/secret";

  return await axios
    .get(url, setAuthHeader(req))
    .then(response => response.data);
};

export const getPortfolios = async () => {
  return await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.data);
};

export const createPortfolio = async portfolioData => {
  return await axios
    .post("/portfolios", portfolioData, setAuthHeader())
    .then(response => response.data)
    .catch(error => rejectPromise(error));
};
