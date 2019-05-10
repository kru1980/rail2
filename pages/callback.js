import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";

import auth0Client from "../services/auth0";
import { withRouter } from "next/router";

class Callback extends React.Component {
  async componentDidMount() {
    // до загрузки данной страницы вызывается метод класса handleAuthentication, которые есть обещание если  true то происходит перенаправление на главную страницу

    await auth0Client.handleAuthentication();
    this.props.router.push("/");
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
          {" "}
          <h1>Вы вошли на сайт</h1>
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withRouter(Callback);
