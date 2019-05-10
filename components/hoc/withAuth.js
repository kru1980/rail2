import React from "react";
import BaseLayout from "../layout/BaseLayout";
import BasePage from "../layout/BasePage";

export default function(Component) {
  return class withAuth extends React.Component {
    static async getInitialProps(args) {
      const pageProps =
        (await Component.getInitialProps) &&
        (await Component.getInitialProps(args));

      return { ...pageProps };
    }
    renderProtectedPage = () => {
      //   debugger;
      const { isAuthenticated } = this.props.auth;

      if (isAuthenticated) {
        return <Component {...this.props} />;
      } else {
        return (
          <BaseLayout {...this.props.auth}>
            <BasePage>
              {" "}
              <span style={{ marginTop: 300 }}>
                {" "}
                Для доступа к данной странице авторизуйтесь
              </span>
            </BasePage>
          </BaseLayout>
        );
      }
    };

    render() {
      return this.renderProtectedPage();
    }
  };
}
