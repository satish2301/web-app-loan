import {
  Badge,
  Button,
  Col,
  Empty,
  Popconfirm,
  Row,
  Select,
  Steps,
  Input,
  message,
  Card,
  Modal,
  Result,
  Watermark,
  DatePicker,
} from "antd";
import {
  UserOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";

import homeIcon from "../../../static/img/loan/home.svg";
import personalIcon from "../../../static/img/loan/Group 78.svg";
import businessIcon from "../../../static/img/loan/Group 79.svg";
import propertyIcon from "../../../static/img/loan/Group 80.svg";

import other from "../../../static/img/gender/other.svg";
import male from "../../../static/img/gender/male.svg";
import female from "../../../static/img/gender/female.svg";

import React, { useEffect, useRef, useState } from "react";

import { Segmented } from "antd";
import { BiPhoneCall } from "react-icons/bi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const HomeLoan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [genderValue, setGenderValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [titleName, setTitleName] = useState("HL");

  const inputRef = useRef([]);
  const [open, setOpen] = useState();
  const [submitStatus, setSubmitStatus] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const forOtpRef = useRef([]);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const labelFocus = (id) => {
    if (inputRef.current) {
      inputRef.current[id].focus();
    }
  };
  const handleGenderSelect = (val) => {
    setGenderValue(val);
  };
  const handleMoveNext = () => {
    // console.log(currentStep);
    setCurrentStep(currentStep + 1);
    if (currentStep == 0) {
      setOpen(true);
    } else if (currentStep == 2) {
      setSubmitStatus(true);
    }
  };
  const handleMovePrevi = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
    setCurrentStep(0);
  };

  const handleNext = (val, ev) => {
    if (ev.target.value) {
      if (val == "1") {
        forOtpRef.current[2].focus();
      } else if (val == "2") {
        forOtpRef.current[3].focus();
      } else if (val == "2") {
        forOtpRef.current[3].focus();
      } else if (val == "3") {
        forOtpRef.current[4].focus();
      } else if (val == "4") {
        forOtpRef.current[5].focus();
      } else if (val == "5") {
        forOtpRef.current[6].focus();
      }
    }
  };
  const handleChangerGetLoanType = (val) => {
    // console.log(val);
    if (val == "HL") {
      navigate("/homeLoan");
    } else if (val == "PL") {
      navigate("/personalLoan");
    }
  };
  useEffect(() => {
    if (location.pathname === "/") {
      setTitleName("HL");
    } else if (location.pathname === "/homeLoan") {
      setTitleName("HL");
    } else if (location.pathname === "/personalLoan") {
      setTitleName("PL");
    }
  }, [location]);
  return (
    <div className="widget-wrapper">
      {submitStatus ? (
        <Watermark
          style={{ height: 450 }}
          content={["success", "Congratulations"]}
        >
          <Result
            status="success"
            title="Successfully Submit Your Quiry!"
            subTitle="..."
            extra={[
              <Button type="primary" key="console">
                Go Home
              </Button>,
            ]}
          />
        </Watermark>
      ) : (
        <>
          <Row
            className="justify-content-center justify-content-md-start"
            gutter={[16, 24]}
          >
            <Col span={24} md={14}>
              <Segmented
                onChange={handleChangerGetLoanType}
                value={titleName}
                options={[
                  {
                    label: windowSize["width"] <= 654 ? "HL" : "Home Loan",
                    value: "HL",
                    icon: <img src={homeIcon} alt="" width={25} />,
                  },
                  {
                    label: windowSize["width"] <= 654 ? "PL" : "Personal Loan",
                    value: "PL",
                    icon: <img src={personalIcon} alt="" width={25} />,
                  },
                  {
                    label: windowSize["width"] <= 654 ? "BL" : "Business Loan",
                    value: "BL",
                    icon: <img src={businessIcon} alt="" width={25} />,
                  },
                  {
                    label:
                      windowSize["width"] <= 654
                        ? "LAP"
                        : "Loan Against Property",
                    value: "LAP",
                    icon: <img src={propertyIcon} alt="" width={25} />,
                  },
                ]}
                block
              />
            </Col>
            <Col md={24} sm={18}>
              <Card className="bg-light">
                <Steps
                  size="small"
                  current={currentStep}
                  items={[
                    {
                      title: "Personal",
                    },
                    {
                      title: "Property",
                    },
                    {
                      title: "Income",
                    },
                  ]}
                />
              </Card>
            </Col>
          </Row>
          {/* "personal section" */}
          {currentStep === 0 && (
            <div className={`${currentStep == 1 ? "myControl1" : ""}`}>
              <Row className={`my-4`} gutter={[24, 24]}>
                <Col md={8} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="fullName"
                      placeholder="Full Name"
                    />
                    <label class="label" for="fullName">
                      Full Name
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="EmailAddress"
                      placeholder="Email Address"
                    />
                    <label class="label" for="EmailAddress">
                      Email Address
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="mobileNum"
                      placeholder="Mobile Number"
                    />
                    <label class="label" for="mobileNum">
                      Mobile Number
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div class="inputBox">
                    <DatePicker
                      className="bg-light w-100"
                      placeholder="Select Your DOB"
                    />
                    <div className="labelColor">Date Of Birth</div>
                  </div>
                </Col>
                <Col md={8} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="mobileNum"
                      placeholder="PAN Card Number"
                    />
                    <label class="label" for="mobileNum">
                      PAN Card Number
                    </label>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12} xs={24}>
                  <label className="fw-semibold">Gender</label>
                  <div className="gender-wrap">
                    <span
                      className={`gender-card ${
                        genderValue === "male" ? "active" : ""
                      }`}
                      onClick={() => handleGenderSelect("male")}
                    >
                      <img src={male} alt="" width={30} />
                      <span>Male</span>
                    </span>
                    <span
                      className={`gender-card ${
                        genderValue === "female" ? "active" : ""
                      }`}
                      onClick={() => handleGenderSelect("female")}
                    >
                      <img src={female} alt="" width={20} />
                      <span>Female</span>
                    </span>
                    <span
                      className={`gender-card ${
                        genderValue === "other" ? "active" : ""
                      }`}
                      onClick={() => handleGenderSelect("other")}
                    >
                      <img src={other} alt="" width={30} />
                      <span>Other</span>
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col span={6}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<RightCircleOutlined />}
                    onClick={handleMoveNext}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {/* "property section" */}
          {currentStep === 1 && (
            <div className={`${currentStep === 1 ? "myControl2" : ""}`}>
              <Row className={`my-4`} gutter={[24, 24]}>
                <Col md={12} xs={24}>
                  <Select
                    className="w-100 bg-light"
                    size="large"
                    showSearch
                    placeholder="Select City Name"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    options={[
                      {
                        value: "1",
                        label: "Delhi",
                      },
                      {
                        value: "2",
                        label: "Mumbai",
                      },
                      {
                        value: "3",
                        label: "Jaipur",
                      },
                      {
                        value: "4",
                        label: "Noida",
                      },
                      {
                        value: "5",
                        label: "Gurugram",
                      },
                    ]}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="propertyAdd"
                      placeholder=""
                    />
                    <label class="label" for="propertyAdd">
                      Property Address
                    </label>
                  </div>
                </Col>
                <Col md={12} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="agreementValue"
                      placeholder="Agreement Value"
                    />
                    <label class="label" for="agreementValue">
                      Agreement Value
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5 justify-content-between">
                <Col span={6}>
                  <Button
                    type="dashed"
                    shape="round"
                    icon={<LeftCircleOutlined />}
                    onClick={handleMovePrevi}
                  >
                    Back
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<RightCircleOutlined />}
                    onClick={handleMoveNext}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </div>
          )}

          {/* "property section" */}
          {currentStep === 2 && (
            <div className={`${currentStep === 2 ? "myControl2" : ""}`}>
              <Row className={`my-4`} gutter={[24, 24]}>
                <Col md={8} xs={12}>
                  <div className="labelColor">Residance</div>
                  <Segmented
                    className="residance"
                    // onChange={get}
                    options={[
                      {
                        label: "Indian",
                        value: "IN",
                        icon: <img src={homeIcon} alt="" width={15} />,
                      },
                      {
                        label: "NRI",
                        value: "NRI",
                        icon: <img src={personalIcon} alt="" width={15} />,
                      },
                    ]}
                  />
                </Col>
                <Col md={8} xs={12}>
                  <div className="labelColor">Income Type</div>
                  <Segmented
                    className="income"
                    // onChange={get}
                    options={[
                      {
                        label: "Salary",
                        value: "Salary",
                        icon: <img src={homeIcon} alt="" width={15} />,
                      },
                      {
                        label: "Business/Profession",
                        value: "Business/Profession",
                        icon: <img src={personalIcon} alt="" width={15} />,
                      },
                    ]}
                  />
                </Col>
                <Col md={12} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="salary"
                      placeholder=""
                    />
                    <label class="label" for="salary">
                      Salary per month
                    </label>
                  </div>
                </Col>
                <Col md={12} xs={24}>
                  <div class="inputBox">
                    <input
                      type="text"
                      class="inputText"
                      id="company"
                      placeholder="Company Name"
                    />
                    <label class="label" for="company">
                      Company Name
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5 justify-content-between">
                <Col span={6}>
                  <Button
                    type="dashed"
                    shape="round"
                    icon={<LeftCircleOutlined />}
                    onClick={handleMovePrevi}
                  >
                    Back
                  </Button>
                </Col>
                <Col span={6}>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<RightCircleOutlined />}
                    onClick={handleMoveNext}
                  >
                    SUBMIT
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomeLoan;
