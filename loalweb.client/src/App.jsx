import React, { useEffect } from "react";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import WebRoutes from "./routes";

import { message } from "antd";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/common/dashboard";
import BaseComponents from "./components/common/BaseComponents";
import CreateContext from "./components/Context/CreateContext";
import NotFoundPage from "./components/common/notFoundPage";
import { Loading } from "./utils/utils";
const App = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const base64QueryString = searchParams.get("q");

  let queryParams = "";
  const paramsObject = {};
  if (base64QueryString !== null) {
    queryParams = new URLSearchParams(window.atob(base64QueryString));
    for (const [key, value] of queryParams.entries()) {
      paramsObject[key] = value;
    }
  }
  // console.log(paramsObject?.["retrul "])
  // if (base64QueryString == null) {
  //   navigate("/notFoundPage");
  // }
  useEffect(() => {
    sessionStorage.setItem("login", true);
    sessionStorage.setItem("tk", window.btoa(paramsObject?.tk));
    sessionStorage.setItem("company", window.btoa(paramsObject?.CompanyID));
    sessionStorage.setItem("cm", window.btoa(paramsObject?.CompanyName));
    sessionStorage.setItem("mn", window.btoa(paramsObject?.mobile));
    sessionStorage.setItem("retrul", window.btoa(paramsObject?.["retrul"]));
    // if (!base64QueryString) {
    //   navigate("/notFoundPage");
    // }
  }, []);
  const success = (mes, dur) => {
    messageApi.open({
      type: "success",
      duration: dur,
      content: mes,
    });
  };

  const error = (mes, dur) => {
    messageApi.open({
      duration: dur,
      type: "error",
      content: mes,
    });
  };

  const warning = (mes, dur) => {
    messageApi.open({
      duration: dur,
      type: "warning",
      content: mes,
    });
  };

  return (
    <>
      {contextHolder}
      {/* <ScrollToTop>
        <Suspense fallback={<Loading />}> */}
      <CreateContext>
        <Routes>
          <Route path={WebRoutes.NOTFOUNDPAGE} element={<NotFoundPage />} />
          <Route
            path={WebRoutes.HOME}
            element={<ProtectedRoute Component={BaseComponents} />}
          >
            <Route
              path={WebRoutes.HOME}
              element={<ProtectedRoute Component={Dashboard} />}
            />

            {/* <Route
              path={WebRoutes.HOMELOAN}
              element={<ProtectedRoute Component={HomeLoan} />}
            />
            <Route
              path={WebRoutes.PERSONAL_LOAN}
              element={<ProtectedRoute Component={PersonalLoan} />}
            /> */}
          </Route>
        </Routes>
      </CreateContext>
      {/* </Suspense>
      </ScrollToTop> */}
    </>
  );
};

export default App;
