import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";
import withAuth from "../components/hoc/withAuth";
import { getSecretData } from "../actions/index";
import axios from "axios";

class Secret extends React.Component {
  state = { secretData: [] };

  static getInitialProps() {
    return {};
  }

  async componentDidMount() {
    try {
      const secretData = await getSecretData();
      this.setState({ secretData });
    } catch (error) {
      console.log(error);
    }
  }

  displaySecretData = () => {
    const { secretData } = this.state;
    if (secretData && secretData.length > 0) {
      return secretData.map((i, index) => {
        return (
          <div key={index}>
            <div>{i.title}</div>
            <div>{i.description}</div>
          </div>
        );
      });
    }
    return null;
  };

  render() {
    return (
      <BaseLayout {...this.props.auth}>
        <BasePage>
          Секретные данные:
          {this.displaySecretData()}
        </BasePage>
      </BaseLayout>
    );
  }
}

export default withAuth(Secret);
