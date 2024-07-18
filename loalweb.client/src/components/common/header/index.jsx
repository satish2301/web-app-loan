import { Col, Dropdown, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import {
  MdAccountBalance,
  MdAccountCircle,
  MdHome,
  MdLogout,
  MdOutlineAccountCircle,
  MdSupport,
  MdSupportAgent,
  MdWallet,
} from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import logo from "../../../static/img/icon/user-M.svg";
import WebRoutes from "../../../routes";
import {
  ArrayBufferToBase64,
  EncryptionData,
  LogOut,
} from "../../../utils/utils";
import { BiSupport, BiTransfer, BiWallet } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Context } from "../../Context/CreateContext";
const Header = ({ setIsCollapse, isCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [titleName, setTitleName] = useState("HOME LOAN");
  const { setIsModalOpen, setLoading, loading } = useContext(Context);
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     setTitleName("HOME LOAN");
  //   } else if (location.pathname === "/homeLoan") {
  //     setTitleName("HOME LOAN");
  //   } else if (location.pathname === "/personalLoan") {
  //     setTitleName("PERSONAL LOAN");
  //   }
  // }, [location]);

  const HandleCheckBalance = async () => {
    setLoading(true);
    try {
      const result = await fetch("EncKey");
      const EncrptToken = await result.text();
      const someData = window.btoa(EncrptToken);
      if (someData) {
        try {
          const body = {
            CompanyID: "DMT101372",
            TokenID: "Njk1MjAyNC0wMS0wMyAxMTo0NDo1Nw==",
          };
          const encryptedData = await EncryptionData(body, someData);
          const encryptedBody = ArrayBufferToBase64(encryptedData);

          const result = await fetch("CheckBalance", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedBody),
          });
          const response = await result.json();
          // console.log(response);
          // if (response.Response?.Status === "Fail") {
          //   message.error(response?.Response?.Message);

          // }
          if (response) {
            setLoading(false);
            setIsModalOpen({
              title: "Balance",
              Data: response?.Data?.balance,
              content: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleHelpDesk = async () => {
    setLoading(true);
    try {
      const result = await fetch("EncKey");
      const EncrptToken = await result.text();
      const someData = window.btoa(EncrptToken);
      if (someData) {
        try {
          const body = {
            CompanyID: "DMT101372",
            TokenID: "Njk1MjAyNC0wMS0wMyAxMTo0NDo1Nw==",
          };
          const encryptedData = await EncryptionData(body, someData);
          const encryptedBody = ArrayBufferToBase64(encryptedData);

          const result = await fetch("HelpDesh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedBody),
          });
          const response = await result.json();
          console.log(response);
          // if (response.Response?.Status === "Fail") {
          //   message.error(response?.Response?.Message);

          // }
          if (response) {
            setLoading(false);
            setIsModalOpen({
              title: "HelpDesk",
              Data: response?.Data?.data?.Agentdetails[0],
              content: true,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const items = [
    {
      key: "Profile",
      icon: <MdOutlineAccountCircle />,
      label: "View Profile",
      onClick: () => {
        setIsModalOpen({
          title: "Profile",
          content: true,
        });
      },
    },
    {
      type: "divider",
    },
    {
      key: "Home",
      icon: <MdHome />,
      label: "Home",
      onClick: () => {
        window.location.href =
          window.atob(sessionStorage.getItem("retrul")) == "undefined"
            ? ""
            : window.atob(sessionStorage.getItem("retrul"));
      },
    },
    {
      type: "divider",
    },
    {
      key: "HelpDesk",
      icon: <MdSupport />,
      label: "HelpDesk",
      onClick: () => {
        HandleHelpDesk();
      },
    },
    {
      type: "divider",
    },
    {
      key: "Balance",
      icon: <MdWallet />,
      label: "Balance",
      onClick: () => {
        HandleCheckBalance();
      },
    },
    {
      type: "divider",
    },
    {
      key: "Account",
      icon: <MdAccountCircle />,
      label: "Account",
    },
    {
      type: "divider",
    },
    {
      key: "Logout",
      icon: <MdLogout />,
      label: "Logout",
      danger: true,
      onClick: () => {
        (<LogOut />),
          (window.location.href =
            window.atob(sessionStorage.getItem("retrul")) == "undefined"
              ? ""
              : window.atob(sessionStorage.getItem("retrul")));
      },
    },
  ];

  useEffect(() => {
    const handleHashChange = () => {
      const searchParams = new URLSearchParams(window.location.hash.slice(1));
      const currentQuery = searchParams.get("q");
      setTitleName(currentQuery);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);
  //update url
  const updateURL = (newURL) => {
    const currentPath = window.location.pathname;
    const newURLObj = new URL(newURL, window.location.origin);
    newURLObj.pathname = currentPath;
    window.history.pushState({ path: newURL }, "", newURLObj.toString());
  };
  // url releated data
  useEffect(() => {
    updateURL();
  }, []);
  return (
    <header className="dmt-header">
      <div className="container-fluid">
        <Row>
          <Col span={12} className="headerLeft">
            <div className="d-flex align-items-center justify-content-between h-100">
              {/* <div className="hamberIcon">
                <CiMenuFries
                  size={20}
                  onClick={() => setIsCollapse(!isCollapse)}
                />
              </div> */}
              <Dropdown menu={{ items }} placement="bottomLeft" arrow={true}>
                <div className="d-flex  align-items-center justify-content-end gap-2 h-100">
                  <img src={logo} alt="icon" className="" width={40} />
                  <div className="d-flex flex-column align-items-center content ">
                    <b>
                      {`${window.atob(sessionStorage.getItem("cm")) == "undefined"
                          ? "SATISH(IT)"
                          : window.atob(sessionStorage.getItem("cm"))
                        } `}
                    </b>
                    <span>{`${window.atob(sessionStorage.getItem("mn")) == "undefined"
                        ? "8767545654"
                        : window.atob(sessionStorage.getItem("mn"))
                      } `}</span>
                  </div>
                </div>
              </Dropdown>
              <b className="title">{titleName}</b>
            </div>
          </Col>
          <Col span={12} className="headerRight">
            <div className="">
              <ul className="d-flex align-items-center justify-content-end">
                <li >
                  <Link  onClick={HandleCheckBalance}>

                    <BiWallet />
                    <span> Balance
                      ₹ 47,488</span>
                  </Link>
                </li>
                <li >
                  <Link onClick={HandleHelpDesk}>

                    <MdSupportAgent /> <span>HelpDesk</span>

                  </Link>
                </li>
                <li>
                  <Link >
                    {" "}
                    <MdAccountBalance /> <span>Account</span>
                  </Link>
                </li>

                <li>
                  <Link >
                    <RiLogoutCircleRLine /> <span>LogOut</span>
                  </Link>
                </li>
              </ul>

            </div>
          </Col>
        </Row>
      </div>
    </header>
  );
};

export default Header;
