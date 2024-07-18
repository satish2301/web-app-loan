import PropTypes from "prop-types";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { AiOutlineHome } from "react-icons/ai";
import {
  LiaPlaneSolid,
  LiaHotelSolid,
  LiaBusSolid,
  LiaTrainSolid,
  LiaMobileSolid,
  LiaSatelliteDishSolid,
} from "react-icons/lia";
import {
  MdAdminPanelSettings,
  MdAssignmentAdd,
  MdFeedback,
  MdNotificationAdd,
  MdSupervisedUserCircle,
  MdSupportAgent,
  MdVerifiedUser,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import logo from "../../../static/img/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import WebRoutes from "../../../routes";

const Sidebar = ({ isCollapse, setIsCollapse }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const base64QueryString = searchParams.get("q");
  // console.log(base64QueryString);
  const sidebarList = [
    {
      label: "Home",
      icon: <MdAdminPanelSettings />,
      key: "Home",
      onClick: () => {
        window.location.href =
          window.atob(sessionStorage.getItem("retrul")) == "undefined"
            ? ""
            : window.atob(sessionStorage.getItem("retrul"));
      },
    },
    // {
    //   label: "Home",
    //   icon: <AiOutlineHome />,
    //   key: "Home",
    // },
    // {
    //   label: "Services",
    //   icon: <LiaMobileSolid />,
    //   key: "Services",
    //   children: [
    //     {
    //       label: "Money Transfer",
    //       icon: <LiaMobileSolid />,
    //       key: "money_transfer",
    //     },
    //     {
    //       label: "Retention Portal",
    //       icon: <MdSupportAgent />,
    //       key: "retention_portal",
    //       children: [
    //         {
    //           label: "Agent Details",
    //           icon: <MdSupervisedUserCircle />,
    //           key: "agent_details",
    //           onClick: () => {
    //             navigate(`${WebRoutes.RETENTION}?q=${base64QueryString}`),
    //               setIsCollapse(!isCollapse);
    //           },
    //         },
    //         {
    //           label: "Reminder",
    //           icon: <MdNotificationAdd />,
    //           key: "reminder",
    //           onClick: () => {
    //             navigate(`${WebRoutes.REMINDER}?q=${base64QueryString}`),
    //               setIsCollapse(!isCollapse);
    //           },
    //         },
    //         {
    //           label: "FeedBack",
    //           icon: <MdFeedback />,
    //           key: "feedback",
    //           onClick: () => {
    //             navigate(`${WebRoutes.FEEDBACK}?q=${base64QueryString}`),
    //               setIsCollapse(!isCollapse);
    //           },
    //         },
    //         {
    //           label: "Assign Tab",
    //           icon: <MdAssignmentAdd />,
    //           key: "Assign Tab",
    //           onClick: () => {
    //             navigate(`${WebRoutes.ASSIGNTAB}?q=${base64QueryString}`),
    //               setIsCollapse(!isCollapse);
    //           },
    //         },
    //       ],
    //     },
    //     { label: "Another", icon: <LiaSatelliteDishSolid />, key: "another" },
    //   ],
    // },
  ];

  return (
    <Sider className={`dmt-sidebar ${isCollapse ? "" : "sideBarHideShow"}`}>
      <div className="logo ">
        <img src={logo} alt="logo" />
        <IoClose size={30} onClick={() => setIsCollapse(!isCollapse)} />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["Dashboard"]}
        defaultOpenKeys={["Dashboard"]}
        items={sidebarList}
      />
    </Sider>
  );
};

export default Sidebar;
