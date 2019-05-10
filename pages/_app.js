import React from "react";
import App, { Container } from "next/app";
import auth0 from "../services/auth0";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.scss";

// Данный компонент проводит работу на сервере, получает запрос от клиента, обрабатывает его. Полученные данные пробрасывает в компонениты в виде props и рендерит на всех страницах
class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    const user = process.browser
      ? await auth0.clientAuth()
      : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const auth = { user, isAuthenticated: !!user }; // в эту конст передают объект юзера если он есть, и переменную isAuthenticated, значение которой true/false неоюходимое для правильного рендеринга компонентов

    return { pageProps, auth };
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return (
      <Container>
        <Component {...pageProps} auth={auth} />
      </Container>
    );
  }
}

export default MyApp;
