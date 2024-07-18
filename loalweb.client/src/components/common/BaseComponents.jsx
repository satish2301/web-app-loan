import Layout, { Content } from "antd/es/layout/layout";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { Loading } from "../../utils/utils";
import { Context } from "../Context/CreateContext";

const BaseComponents = () => {
  const [isCollapse, setIsCollapse] = useState(true);
  const { loading } = useContext(Context);

  return (
    <Layout>
      <Sidebar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <Layout>
        <Header setIsCollapse={setIsCollapse} isCollapse={isCollapse} />
        <Content className="dmt-mainWrp">
          <Outlet />
        </Content>
        {loading && <Loading />}
        <Footer />
      </Layout>
    </Layout>
  );
};

export default BaseComponents;
