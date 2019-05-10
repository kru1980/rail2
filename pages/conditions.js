import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";

const Conditions = () => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>Conditions page</BasePage>
    </BaseLayout>
  );
};

export default Conditions;
