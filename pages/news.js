import React from "react";
import BaseLayout from "../components/layout/BaseLayout";
import BasePage from "../components/layout/BasePage";

const News = () => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage>News page</BasePage>
    </BaseLayout>
  );
};

export default News;
