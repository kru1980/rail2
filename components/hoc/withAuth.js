import React from "react";
import BaseLayout from "../layout/BaseLayout";
import BasePage from "../layout/BasePage";

const namespace = "http://localhost:3000/";

export default role => Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }
    renderProtectedPage = () => {
      const { isAuthenticated, user } = this.props.auth;
      const userRole = user && user[`${namespace}role`];

      let isAuthorized = false;

      // debugger;

      if (role) {
        if (userRole && userRole === role) {
          isAuthorized = true;
        }
      } else {
        isAuthorized = true;
      }

      if (!isAuthenticated) {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              {" "}
              <span style={{ marginTop: 300 }}>
                {" "}
                Для доступа к данной странице зарегистрируйтесь
              </span>
            </BasePage>
          </BaseLayout>
        );
      } else if (!isAuthorized) {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              {" "}
              <span style={{ marginTop: 300 }}>
                {" "}
                Вы не авторизованый пользователь, авторизуйтесь
              </span>
            </BasePage>
          </BaseLayout>
        );
      } else {
        return <Component {...this.props} />;
      }
    };

    render() {
      return this.renderProtectedPage();
    }
  };
