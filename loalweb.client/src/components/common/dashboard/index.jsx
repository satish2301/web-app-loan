import {
  Button,
  Col,
  Row,
  Select,
  Steps,
  message,
  Card,
  Modal,
  DatePicker,
  Radio
} from "antd";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import logo from "../../../static/img/icon/user-M.svg";
import myLoan from "../../../static/img/Landing page.gif";
import homeIcon from "../../../static/img/loan/home.svg";
import PersonalLoanImg from "../../../static/img/loan/Illustration.png";
import HomeLoanImg from "../../../static/img/loan/Frame.png";
import personalIcon from "../../../static/img/loan/Group 78.svg";
import businessIcon from "../../../static/img/loan/Group 79.svg";
import propertyIcon from "../../../static/img/loan/Group 80.svg";

import other from "../../../static/img/gender/other.svg";
import male from "../../../static/img/gender/male.svg";
import female from "../../../static/img/gender/female.svg";

import React, { useContext, useEffect, useRef, useState } from "react";

import { Segmented } from "antd";
import {
  ArrayBufferToBase64,
  EncryptionData,
  Loading,
} from "../../../utils/utils";
import { Context } from "../../Context/CreateContext";
import { useNavigate } from "react-router-dom";
import {
  MdCall,
  MdEmail,
  MdHail,
  MdMobileFriendly,
  MdSupport,
} from "react-icons/md";
import PreviewCompo from "../preview/PreviewCompo";

const Dashboard = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const inputRef = useRef([]);

  const { isModalOpen, handleCancel, handleOk } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [genderValue, setGenderValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [previewStatus, setPreviewStatus] = useState(false);

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [businessType, setBusinessType] = useState(false);

  const [myFormData, setMyFormData] = useState({
    loantype: "PersonalLoan",
    fullName: "",
    email: "",
    dob: null,
    gender: "",
    mobile: "+91 ",
    statename: "",
    cityname: "",
    incometype: "Salaried",
    companyname: "",
    profession: "",
    monthlySalary: "",
    loanAmount: "",
    currentEmi: "",
    tenure: "",
    PANCARD: "",
    ITR: "",
  });

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
  const handleGenderSelect = (ev) => {

    setMyFormData({ ...myFormData, ["gender"]: ev.target.value });
    setGenderValue(ev.target.value);
  };
  const handleMoveNext = () => {
    if (myFormData.fullName == "") {
      message.warning("Please Enter Full Name");
      labelFocus(0);
      return false;
    }
    if (myFormData.email == "") {
      message.warning("Please Enter Email");
      labelFocus(1);
      return false;
    }
    const email = myFormData.email;
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      message.warning("Please Enter Correct Email");
      labelFocus(1);
      return false;
    }
    if (myFormData.dob == "") {
      message.warning("Select DOB");
      labelFocus(2);
      return false;
    }

    if (myFormData.mobile == "") {
      message.warning("Enter Mobile Number");
      labelFocus(3);
      return false;
    }
    if (myFormData.gender == "") {
      message.warning("Select gender");

      return false;
    }
    if (myFormData.PANCARD == "") {
      message.warning("Enter PANCARD Number");
      labelFocus(4);
      return false;
    }

    setCurrentStep(currentStep + 1);
    // if (currentStep == 0) {
    //   setOpen(true);
    //   setOtpCount(1);
    // } else if (currentStep == 2) {
    //   setSubmitStatus(true);
    // }
  };
  const handleMoveNextSecond = () => {
    if (myFormData.statename == "") {
      message.warning("Select State Name");
      labelFocus(5);
      return false;
    }
    if (myFormData.cityname == "") {
      message.warning("Select State Name");
      labelFocus(5);
      return false;
    }
    if (!myFormData.pincode) {
      message.warning("Enter Pincode");
      labelFocus(7);
      return false;
    }

    setCurrentStep(currentStep + 1);
    // if (currentStep == 0) {
    //   setOpen(true);
    //   setOtpCount(1);
    // } else if (currentStep == 2) {
    //   setSubmitStatus(true);
    // }
  };
  const handleMovePrevi = () => {
    setCurrentStep(currentStep - 1);
    // if (otpCount <= 0) {
    //   setOpen(false);
    // }
  };
  const handleChangeGetValue = (key, val) => {
    setMyFormData({ ...myFormData, [key]: val });
  };
  const handleChangerGetLoanType = (val) => {
    switch (val) {
      case "HL":
        window.location.hash = `q=HOME LOAN`;
        setMyFormData({ ...myFormData, ["loantype"]: "HomeLoan" });
        break;
      case "PL":
        window.location.hash = `q=PERSONAL LOAN`;
        setMyFormData({ ...myFormData, ["loantype"]: "PersonalLoan" });
        break;

      case "BL":
        window.location.hash = `q=BUSINESS LOAN`;
        setMyFormData({ ...myFormData, ["loantype"]: "BusinessLoan" });
        break;

      case "LAP":
        window.location.hash = `q=LOAN AGAINST PROPERTY`;
        setMyFormData({ ...myFormData, ["loantype"]: "LoanAgainstProperty" });
        break;
      default:
        window.location.hash = `q=PERSONAL LOAN`;
        setMyFormData({ ...myFormData, ["loantype"]: "PersonalLoan" });
    }
  };
  const handleStateName = (val) => {
    setMyFormData({
      ...myFormData,
      ["statename"]: val.label,
    });
    if (val) {
      handleGetCityName(val);
    }
  };
  const handleGetIncomeType = (Ictype) => {
    setMyFormData({ ...myFormData, ["incometype"]: Ictype });
    if (Ictype == "Business/Profession") {
      setBusinessType(true);
    } else {
      setBusinessType(false);
    }
  };
  const handleReview = (ev) => {
    ev.preventDefault();

    if (myFormData.incometype == "") {
      message.warning("Select Income Type");
      labelFocus(8);
      return false;
    }
    if (myFormData.companyname == "") {
      message.warning("Enter Company Name");
      labelFocus(9);
      return false;
    }
    if (!businessType && myFormData.profession == "") {
      message.warning("Enter Profession");
      labelFocus(10);
      return false;
    }
    if (myFormData.monthlySalary == "") {
      message.warning("Enter Monthly Salary");
      labelFocus(11);
      return false;
    }
    if (myFormData.loanAmount == "") {
      message.warning("Enter Loan Amount");
      labelFocus(12);
      return false;
    }
    if (myFormData.currentEmi == "") {
      message.warning("Enter Current EMI");
      labelFocus(13);
      return false;
    }
    if (myFormData.tenure == "") {
      message.warning("Enter Tenure");
      labelFocus(14);
      return false;
    }
    if (businessType && myFormData.ITR == "") {
      message.warning("Select ITR");
      return false;
    }
    setCurrentStep(currentStep + 1);
    setPreviewStatus(true);
  };
  const handleGetStateName = async () => {
    setLoading(true);
    try {
      const result = await fetch("EncKey");
      const EncrptToken = await result.text();
      const someData = window.btoa(EncrptToken);

      if (someData) {
        try {
          const body = {
            CompanyID: window.btoa(sessionStorage.getItem("company")),
            TokenID: window.btoa(sessionStorage.getItem("tk")),
          };
          const encryptedData = await EncryptionData(body, someData);
          const encryptedBody = ArrayBufferToBase64(encryptedData);

          const result = await fetch("StateName", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedBody),
          });
          const response = await result.json();
          // console.log(response);
          if (response) {
            const STATE = response.Data?.state;
            const uniqueObjects = {};
            const filteredData = STATE.filter((obj) => {
              if (obj !== null) {
                // Create a unique key based on the properties you want to consider
                const key = `${obj.StateName}-${obj.StateCode}`;

                // Check if the key already exists in the temporary object
                // If not, add the object to the temporary object and return true to keep it in the filtered array
                if (!uniqueObjects[key] && uniqueObjects[key] !== null) {
                  uniqueObjects[key] = true;
                  return true;
                }
              }
              // If the key already exists, return false to exclude the duplicate object
              return false;
            });

            setStateList(filteredData);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleGetCityName = async (state) => {
    try {
      const result = await fetch("EncKey");
      const EncrptToken = await result.text();
      const someData = window.btoa(EncrptToken);

      if (someData) {
        try {
          const body = {
            CompanyID: window.btoa(sessionStorage.getItem("company")),
            TokenID: window.btoa(sessionStorage.getItem("tk")),
            StateId: state?.value,
            StateName: state?.label,
          };
          const encryptedData = await EncryptionData(body, someData);
          const encryptedBody = ArrayBufferToBase64(encryptedData);

          const result = await fetch("CityName", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedBody),
          });
          const response = await result.json();
          // console.log(response);
          const CITY = response.Data?.city;
          const uniqueObjects = {};
          const filteredData = CITY.filter((obj) => {
            if (obj !== null) {
              // Create a unique key based on the properties you want to consider
              const key = `${obj.city_name}-${obj.city_id}`;
              if (!uniqueObjects[key] && uniqueObjects[key] !== null) {
                uniqueObjects[key] = true;
                return true;
              }
            }
            return false;
          });

          setCityList(filteredData);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getDateOfBirth = (date, dateString) => {

    setMyFormData({ ...myFormData, ["dob"]: date ? date.valueOf() : null });
  };

  const getITRValue = (ev) => {
    setMyFormData({ ...myFormData, ["ITR"]: ev.target.value })
  }

  return (
    <div className="widget-wrapper">
      {/* <Otp Open={open} sendData={(ev) => setCurrentStep(ev)} /> */}
      <Modal
        width={400}
        title={isModalOpen.title}
        open={isModalOpen.content}
        onCancel={handleCancel}
      >
        <hr />
        {isModalOpen.title == "Profile" && (
          <div className="profileCard">
            <div className="left">
              <img src={logo} alt="icon" className="" width={80} />
            </div>
            <div className="right">
              <b>
                {`${window.atob(sessionStorage.getItem("cm")) == "undefined"
                  ? "SATISH(IT)"
                  : window.atob(sessionStorage.getItem("cm"))
                  } `}
              </b>
              <br />
              <span>{`${window.atob(sessionStorage.getItem("mn")) == "undefined"
                ? "8767545654"
                : window.atob(sessionStorage.getItem("mn"))
                } `}</span>
            </div>
          </div>
        )}

        {isModalOpen.title == "Balance" && (
          <div className="wallet">
            <div className="first">
              <small>Wallet Balance</small>
              <small>₹ {!isModalOpen.Data ? "0.00" : isModalOpen.Data}</small>
            </div>
            <div className="second">
              <small>Lien Balance</small>
              <small>₹ {!isModalOpen.Data ? "0.00" : isModalOpen.Data}</small>
            </div>
          </div>
        )}
        {isModalOpen.title == "HelpDesk" && (
          <div>
            <div className="helpDesk">
              <ul>
                <li>
                  <MdSupport /> HelpDesk
                </li>
                <li>
                  <MdCall /> 0120-4151488
                </li>
                <li>
                  <MdMobileFriendly /> 9818734488
                </li>
                <li>
                  <MdEmail /> help@dialmytrip.com
                </li>
              </ul>
            </div>
            <div className="helpDesk ">
              <ul>
                <li>
                  <MdSupport /> Contact Partner
                </li>
                <li>
                  <MdPerson /> RANBIR KUMAR
                </li>
                <li>
                  <MdMobileFriendly /> 9818734488
                </li>
                <li>
                  <MdEmail /> bookingstc@gmail.com
                </li>
              </ul>
            </div>
            <div className="helpDesk">
              <ul>
                <li>
                  <MdSupport /> My Sales Manager
                </li>
                <li>
                  <MdPerson />{" "}
                  {isModalOpen.title == "HelpDesk"
                    ? isModalOpen?.Data?.Name
                    : ""}
                </li>
                <li>
                  <MdMobileFriendly />{" "}
                  {isModalOpen.title == "HelpDesk"
                    ? isModalOpen?.Data?.Mobile
                    : ""}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
      {previewStatus ? (
        <>
          {/* <Watermark
          style={{ height: 450 }}
          content={["success", "Congratulations"]}
        >
          <Result
            status="success"
            title="Thank you for submitting the request. We have received your request for the loan. We'll call you back for documentation within 24 hours.!"
            subTitle="..."
            extra={[
              <Button
                onClick={() => navigate("/")}
                type="primary"
                key="console"
              >
                Go Home
              </Button>,
            ]}
          />
        </Watermark> */}

          <PreviewCompo
            setMyFormData={setMyFormData}
            myFormData={myFormData}
            setPreviewStatus={setPreviewStatus}
            setCurrentStep={setCurrentStep}
            businessType={businessType}
            windowSize={windowSize}
          />
        </>
      ) : (
        <>
          <form ref={formRef}>
            <Row
              className="justify-content-center justify-content-md-start"
              gutter={[16, 24]}
            >
              <Col span={24} md={16} sm={20}>
                <Segmented
                  onChange={handleChangerGetLoanType}
                  options={[
                    {
                      label:
                        windowSize["width"] <= 654 ? "PL" : "Personal Loan",
                      value: "PL",
                      icon: <img src={personalIcon} alt="" width={25} />,
                    },
                    {
                      label:
                        windowSize["width"] <= 654 ? "BL" : "Business Loan",
                      value: "BL",
                      icon: <img src={businessIcon} alt="" width={25} />,
                    },
                    {
                      label: windowSize["width"] <= 654 ? "HL" : "Home Loan",
                      value: "HL",
                      icon: <img src={homeIcon} alt="" width={25} />,
                    },
                    {
                      label:
                        windowSize["width"] <= 654
                          ? "LAP"
                          : "Loan Against Property",
                      value: "LAP",
                      icon: <img src={propertyIcon} alt="" width={25} />
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
                        title: "Address",
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
            {(currentStep === 0) && (
              <Row className="mt-4 justify-content-center" gutter={[20, 16]}>
                <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 2 }} className="personalLeft">
                  <div className={`${currentStep == 1 ? "myControl1" : ""}`}>
                    <Row className={`my-4`} gutter={[24, 24]}>

                      <Col md={22} xs={24} className="m-auto">
                        <Radio.Group className="mb-1 d-flex justify-content-between w-100  rounded" value={myFormData.gender} onChange={handleGenderSelect}>

                          <div className="d-flex">

                            <Radio buttonStyle="#000" value="male" className="genderRound" >
                              <div
                                className=""
                                style={{ position: "absolute", top: "-20px", left: "38px" }}
                              >
                                MALE
                              </div>
                              <span
                                style={{ marginLeft: "10px" }}
                                className={`gender-card ${genderValue === "male" ? "active" : ""
                                  }`}

                              >
                                <img src={male} alt="" width={25} />

                              </span>
                            </Radio>
                          </div>
                          <Radio value="female" className="genderRound" >
                            <div
                              className=""
                              style={{ position: "absolute", top: "-20px", left: "43%" }}
                            >
                              FEMALE
                            </div>
                            <span
                              style={{ marginLeft: "10px" }}
                              className={`gender-card ${genderValue === "female" ? "active" : ""
                                }`}

                            >
                              <img src={female} alt="" width={20} />

                            </span>
                          </Radio>
                          <Radio value="other" className="genderRound" >
                            <div
                              className=""
                              style={{ position: "absolute", top: "-20px", right: "9%" }}
                            >
                              OTHERS
                            </div>
                            <span
                              style={{ marginLeft: "10px" }}
                              className={`gender-card ${genderValue === "other" ? "active" : ""
                                }`}

                            >
                              <img src={other} alt="" width={28} />

                            </span>
                          </Radio>
                        </Radio.Group>
                        {/* <div
                          className="labelColor"
                          style={{ top: "-25px", left: "20px" }}
                        >
                          Gender
                        </div> */}
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <input
                            type="text"
                            ref={(el) => (inputRef.current[0] = el)}
                            className="inputText"
                            autoComplete="off"
                            name="fullName"
                            value={myFormData.fullName}
                            onChange={(e) => {
                              const onlyLetters = /^[a-z A-Z]+$/;
                              if (
                                e.target.value === "" ||
                                e.target.value.match(onlyLetters)
                              ) {
                                handleChangeGetValue(
                                  "fullName",
                                  e.target.value.toLocaleUpperCase()
                                );
                              }
                            }}
                            placeholder="Full Name"
                          />
                          <label className="label" htmlFor="fullName">
                            Full Name
                          </label>
                        </div>
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <input
                            type="text"
                            autoComplete="off"
                            ref={(el) => (inputRef.current[1] = el)}
                            className="inputText"
                            id="EmailAddress"
                            name="email"
                            value={myFormData.email}
                            onChange={(e) =>
                              handleChangeGetValue("email", e.target.value)
                            }
                            placeholder="Email Address"
                          />
                          <label className="label" htmlFor="EmailAddress">
                            Email Address
                          </label>
                        </div>
                      </Col>

                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <DatePicker
                            className="w-100 "
                            onChange={getDateOfBirth}
                            format="DD-MM-YYYY"
                            value={myFormData.dob ? dayjs(myFormData.dob) : null}
                          />
                          <div className="labelColor">Date Of Birth</div>
                        </div>
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <input
                            type="tel"
                            className="inputText"
                            id="mobileNum"
                            autoComplete="off"
                            ref={(el) => (inputRef.current[3] = el)}
                            maxLength={14}
                            name="mobile"
                            value={`${myFormData.mobile}`}
                            onChange={(e) => {
                              const onlyNum = /^[+ \d]+$/; // Updated regular expression without quotes
                              if (
                                e.target.value.length > 3 &&
                                e.target.value.match(onlyNum)
                              ) {
                                handleChangeGetValue("mobile", e.target.value);
                              }
                            }}
                            placeholder="Mobile Number"
                          />

                          <label className="label" htmlFor="mobileNum">
                            Mobile Number
                          </label>
                        </div>
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <input
                            type="text"
                            className="inputText"
                            id="pancard"
                            ref={(el) => (inputRef.current[4] = el)}
                            name="pancard"
                            value={myFormData.PANCARD}
                            onChange={(e) => {
                              const inputVal = e.target.value.toUpperCase();
                              let regexp =
                                /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
                              if (regexp.test(inputVal)) {
                                handleChangeGetValue("PANCARD", inputVal);
                                return true;
                              }
                            }}
                            placeholder="PAN CARD"
                          />

                          <label className="label" htmlFor="pancard">
                            Pan Card
                          </label>
                        </div>
                      </Col>
                    </Row>
                    {/* <Row>
                    <Col md={12} xs={24}>
                      <label className="fw-semibold">Gender</label>
                      <div className="gender-wrap">
                        <span
                          className={`gender-card ${genderValue === "male" ? "active" : ""
                            }`}
                          onClick={() => handleGenderSelect("male")}
                        >
                          <img src={male} alt="" width={30} />
                          <span>Male</span>
                        </span>
                        <span
                          className={`gender-card ${genderValue === "female" ? "active" : ""
                            }`}
                          onClick={() => handleGenderSelect("female")}
                        >
                          <img src={female} alt="" width={20} />
                          <span>Female</span>
                        </span>
                        <span
                          className={`gender-card ${genderValue === "other" ? "active" : ""
                            }`}
                          onClick={() => handleGenderSelect("other")}
                        >
                          <img src={other} alt="" width={30} />
                          <span>Other</span>
                        </span>
                      </div>
                    </Col>
                  </Row> */}

                    <Row className="mt-3 mx-4 justify-content-end">
                      <Col span={6}>
                        <Button
                          className="w-100"
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
                </Col>
                <Col md={{ span: 12, order: 2 }} xs={{ span: 24, order: 1 }} className="d-flex align-items-center justify-content-center ">
                  {/* <div className="personalRight"> */}

                  {
                    myFormData.loantype == "PersonalLoan"
                      ?
                      <img src={PersonalLoanImg} className="img-fluid" alt="" />
                      :
                      myFormData.loantype == "HomeLoan"
                        ?
                        <img src={HomeLoanImg} className="img-fluid" alt="" />
                        :
                        myFormData.loantype == "BusinessLoan"
                          ?
                          <div className='preTest'>
                            <div className='preTestIn'>

                              {/* <img src={BusinessLoanImg} className="img-fluid" alt="" /> */}
                            </div>
                          </div>

                          :
                          <div className='preTest'>
                            <div className='preTestIn'>

                              {/* <img src={BusinessLoanImg} className="img-fluid" alt="" /> */}
                            </div>
                          </div>

                  }

                  {/* </div> */}
                  {/* <div className='preTest'>
                    <div className='preTestIn'>
                     
                      <img src={BusinessLoanImg} className="img-fluid" alt="" />
                    </div>
                  </div> */}
                </Col>
              </Row>
            )}

            {/* "address section" */}
            {(currentStep === 1) && (
              <Row gutter={[16, 16]} className="align-items-center">
                <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 2 }} >
                  <div className={`${currentStep === 1 ? "myControl2" : ""}`}>
                    <Row className={`my-4`} gutter={[24, 24]}>
                      <Col md={22} xs={24} className="m-auto">
                        <Select
                          className="w-100 "
                          size="large"
                          name="statename"
                          showSearch
                          ref={(el) => (inputRef.current[5] = el)}
                          value={myFormData.statename || "Choose State Name"}
                          onChange={(value, option) => handleStateName(option)}
                          optionFilterProp="children"
                          filterOption={(input, option) => {
                            const inputValue = input.toLowerCase();
                            const optionLabel = (option?.label ?? "").toLowerCase();
                            return optionLabel.includes(inputValue);
                          }}
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.label ?? "").toLowerCase())
                          }
                          options={
                            stateList &&
                            stateList.map((item, index) => ({
                              value: item.StateCode,
                              label: item.StateName,
                            }))
                          }
                          onClick={handleGetStateName}
                        />
                        <div
                          className="labelColor"
                          style={{ top: "-12px", left: "20px" }}
                        >
                          State Name
                        </div>
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <Select
                          className="w-100 "
                          size="large"
                          name="cityname"
                          showSearch
                          ref={(ele) => (inputRef.current[6] = ele)}
                          value={myFormData.cityname || "Choose City Name"}
                          onChange={(e) => handleChangeGetValue("cityname", e)}
                          placeholder="Choose City Name"
                          optionFilterProp="children"
                          filterOption={(input, option) => {
                            const inputValue = input.toLowerCase();
                            const optionLabel = (option?.label ?? "").toLowerCase();
                            return optionLabel.includes(inputValue);
                          }}
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare((optionB?.label ?? "").toLowerCase())
                          }
                          options={
                            cityList &&
                            cityList.map((item, index) => ({
                              value: item.city_name,
                              label: item.city_name,
                            }))
                          }
                        />
                        <div
                          className="labelColor"
                          style={{ top: "-12px", left: "20px" }}
                        >
                          City Name
                        </div>
                      </Col>
                      <Col md={22} xs={24} className="m-auto">
                        <div className="inputBox">
                          <input
                            type="text"
                            className="inputText"
                            id="propertyAdd"
                            ref={(ele) => (inputRef.current[7] = ele)}
                            value={myFormData.pincode}
                            name="pincode"
                            maxLength={6}
                            autoComplete="off"
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/\D+/g, ''); // remove non-numeric characters
                              if (numericValue.length >= 0) {
                                handleChangeGetValue("pincode", numericValue);
                              }
                            }}
                            placeholder="PIN Code"
                          />
                          <label className="label" htmlFor="propertyAdd">
                            PIN Code
                          </label>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-5 justify-content-between">
                      <Col span={6}>
                        <Button
                          className="mx-4"
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
                          onClick={handleMoveNextSecond}
                        >
                          Next
                        </Button>
                      </Col>
                    </Row>

                  </div>
                </Col>
                <Col md={{ span: 12, order: 1 }} xs={{ span: 24, order: 1 }} className="d-flex align-items-center justify-content-center ">
                  {/* <div className="personalRight"> */}
                  <img src={myLoan} className="img-fluid" alt="" />
                  {/* </div> */}
                </Col>
              </Row>
            )}

            {/* "income section" */}
            {(currentStep === 2) && (
              <div className={` mt-5 ${currentStep === 2 ? "myControl2" : ""}`}>
                <Row className={`my-4 `} gutter={[24, 24]}>
                  <Col md={8} xs={12}>
                    <div
                      className="labelColor"
                      style={{ top: "-25px", left: "15px" }}
                    >
                      Select Income Type
                    </div>
                    <Segmented
                      className="income"
                      name="incometype"
                      ref={(el) => (inputRef.current[8] = el)}
                      value={myFormData.incometype}
                      onChange={(ev) => handleGetIncomeType(ev)}
                      options={[
                        {
                          label: "Salaried",
                          value: "Salaried",
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
                </Row>
                <Row gutter={[16, 16]}>
                  <Col md={8} xs={24}>
                    <div className="inputBox">
                      <input
                        type="text"
                        className="inputText"
                        ref={(el) => (inputRef.current[9] = el)}
                        name="companyname"
                        autoComplete="off"
                        value={myFormData.companyname}
                        onChange={(e) => {
                          handleChangeGetValue("companyname", e.target.value);
                        }}
                        placeholder={
                          businessType ? "Business Type *" : "Company Name *"
                        }
                      />
                      <label className="label">
                        {businessType ? "Business Type *" : "Company Name *"}
                      </label>
                    </div>
                  </Col>
                  {!businessType && (
                    <Col md={8} xs={24}>
                      <div className="inputBox">
                        <input
                          type="text"
                          ref={(el) => (inputRef.current[10] = el)}
                          className="inputText"
                          name="companyname"
                          autoComplete="off"
                          value={myFormData.profession}
                          onChange={(e) => {
                            handleChangeGetValue("profession", e.target.value);
                          }}
                          placeholder="Profession *"
                        />

                        <label className="label">Profession *</label>
                      </div>
                    </Col>
                  )}
                  <Col md={8} xs={24}>
                    <div className="inputBox">
                      <input
                        type="text"
                        className="inputText"
                        ref={(el) => (inputRef.current[11] = el)}
                        name="monthlySalary"
                        autoComplete="off"
                        value={myFormData.monthlySalary}
                        onChange={(e) => {
                          const onlyNum = /^\d*$/; // Updated regular expression without quotes
                          if (
                            e.target.value === "" ||
                            e.target.value.match(onlyNum)
                          ) {
                            handleChangeGetValue(
                              "monthlySalary",
                              e.target.value
                            );
                          }
                        }}
                        placeholder="Monthly Net Salary /Income *"
                      />
                      <label className="label" htmlFor="monthlySalary">
                        Monthly Net Salary /Income *
                      </label>
                    </div>
                  </Col>
                  <Col md={8} xs={24}>
                    <div className="inputBox">
                      <input
                        type="text"
                        className="inputText"
                        name="loanAmount"
                        autoComplete="off"
                        ref={(el) => (inputRef.current[12] = el)}
                        value={myFormData.loanAmount}
                        onChange={(e) => {
                          const onlyNum = /^\d*$/; // Updated regular expression without quotes
                          if (
                            e.target.value === "" ||
                            e.target.value.match(onlyNum)
                          ) {
                            handleChangeGetValue("loanAmount", e.target.value);
                          }
                        }}
                        placeholder="Required Loan Amount *"
                      />
                      <label className="label">Required Loan Amount *</label>
                    </div>
                  </Col>
                  <Col md={8} xs={24}>
                    <div className="inputBox">
                      <input
                        type="text"
                        className="inputText"
                        name="currentEmi"
                        autoComplete="off"
                        ref={(el) => (inputRef.current[13] = el)}
                        value={myFormData.currentEmi}
                        onChange={(e) => {
                          const onlyNum = /^\d*$/; // Updated regular expression without quotes
                          if (
                            e.target.value === "" ||
                            e.target.value.match(onlyNum)
                          ) {
                            handleChangeGetValue("currentEmi", e.target.value);
                          }
                        }}
                        placeholder="Current Monthly EMI (If Taken)"
                      />
                      <label className="label">
                        Current Monthly EMI (If Taken)
                      </label>
                    </div>
                  </Col>
                  <Col md={8} xs={24}>
                    <div className="inputBox">
                      <input
                        type="text"
                        className="inputText"
                        name="tenure"
                        autoComplete="off"
                        maxLength={2}
                        ref={(el) => (inputRef.current[14] = el)}
                        value={myFormData.tenure}
                        onChange={(e) => {
                          const onlyNum = /^\d*$/; // Updated regular expression without quotes
                          if (
                            e.target.value === "" ||
                            e.target.value.match(onlyNum)
                          ) {
                            if (e.target.value === "" || parseInt(e.target.value) <= 20) {
                              handleChangeGetValue("tenure", e.target.value);
                            }
                          }
                        }}
                        placeholder="Tenure (Year)"
                      />
                      <label className="label">Tenure (Year)</label>
                    </div>
                  </Col>
                  {businessType && <Col md={8} xs={24}>

                    <Radio.Group name="ITR" onChange={getITRValue} value={myFormData.ITR} className="border px-4 py-2 rounded bg-light">
                      <Radio value="YES">YES</Radio>
                      <Radio value="NO">NO</Radio>
                    </Radio.Group>
                    <div
                      className="labelColor"
                      style={{ top: "-12px", left: "20px" }}
                    >
                      Do You File ITR*
                    </div>
                  </Col>}
                </Row>
                {/* 
                {review.review3 ? (
                  <Row className="mt-3">
                    <Col span={4} className="m-auto">
                      <Button
                        type="primary"
                        shape="round"
                        icon={<RightCircleOutlined />}
                        onClick={handleSubmit}
                      >
                        SUBMIT
                      </Button>
                    </Col>
                  </Row>
                ) : ( */}
                <Row className="mt-5">
                  <Col span={24} className="justify-content-between d-flex">
                    <Button
                      type="dashed"
                      shape="round"
                      icon={<LeftCircleOutlined />}
                      onClick={handleMovePrevi}
                    >
                      Back
                    </Button>
                    <Button
                      type="primary"
                      shape="round"
                      icon={<RightCircleOutlined />}
                      onClick={handleReview}
                    >
                      PREVIEW
                    </Button>
                  </Col>

                </Row>
                {/* )} */}
              </div>
            )}
          </form>
        </>
      )}

      {loading && <Loading />}
    </div>
  );
};

export default Dashboard;
