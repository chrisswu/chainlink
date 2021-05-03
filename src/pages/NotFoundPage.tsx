import React from "react";
import { Heading } from "../fonts";
import Layout from "../Layout";

export const NotFoundPage = () => {
  return (
    <Layout breadcrumbs={[{ name: "Feeds", path: "", icon: "home" }]}>
      <Heading>Page Not Found :-(</Heading>
    </Layout>
  );
};
export default NotFoundPage;
