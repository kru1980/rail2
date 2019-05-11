import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";
import withAuth from "../components/hoc/withAuth";

const Owner = props => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>Owner page</BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(Owner);
