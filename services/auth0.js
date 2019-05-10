import auth0 from "auth0-js";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import axios from "axios";

class Auth0 {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "dev--8zsj3hu.auth0.com",
      clientID: "oi2I4x9KPMmdwNvzAUqU4XAiY6e0jv1w",
      redirectUri: "http://localhost:3000/callback",
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err);
        }
      });
    });
  };

  setSession(authResult) {
    // задается сессия, параметры сохр в куках
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime();

    Cookies.set("user", authResult.idTokenPayload);
    Cookies.set("jwt", authResult.idToken);
    Cookies.set("expiresAt", expiresAt);
    // navigate to the home route
  }

  logout = () => {
    Cookies.remove("user");
    Cookies.remove("jwt");
    Cookies.remove("expiresAt");
    this.auth0.logout({
      returnTo: "",
      clientID: "oi2I4x9KPMmdwNvzAUqU4XAiY6e0jv1w"
    });
  };
  login = () => {
    this.auth0.authorize();
  };

  getJWKS = async () => {
    const res = await axios.get(
      "https://dev--8zsj3hu.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  };

  // данная ф-ция больше не нужна, она получала из куков время экспирайии  токена и если время больше текущего времени значит токен не просрочен
  // isAuthenticated = () => {
  //   const expiresAt = Cookies.getJSON("expiresAt");

  //   return new Date().getTime() < expiresAt;
  // };

  // после отправки данных в компоненты о том, что  юзер авторизован или нет делаем декодирование токена из которого берут время экспирации (время когда он закончится)
  verifyToken = async token => {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });
      if (!decodedToken) return undefined;

      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];
      // BUILD CERTIFICATE
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;
          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (error) {
          return undefined;
        }
      }
    }

    return undefined;
  };

  clientAuth = async () => {
    const token = Cookies.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  };

  serverAuth = async req => {
    if (req.headers.cookie) {
      const tokenCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));

      if (!tokenCookie) {
        return undefined;
      }
      const token = tokenCookie.split("=")[1];
      const verifiedToken = await this.verifyToken(token);

      return verifiedToken;
    }
    return undefined;
  };
}

const auth0Client = new Auth0();

export default auth0Client;
