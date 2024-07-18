import { Card, Col, Row, Badge, DatePicker, Radio, Select, Segmented, Button } from 'antd'
import React, { useEffect, useState } from 'react';

import other from "../../../static/img/gender/other.svg";
import male from "../../../static/img/gender/male.svg";
import female from "../../../static/img/gender/female.svg";
import homeIcon from "../../../static/img/loan/home.svg";
import personalIcon from "../../../static/img/loan/Group 78.svg";
import businessIcon from "../../../static/img/loan/Group 79.svg";
import propertyIcon from "../../../static/img/loan/Group 80.svg";
import {
  UserOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { BiEdit } from 'react-icons/bi';
import { BsFillSendCheckFill } from 'react-icons/bs';
import { MdEdit } from 'react-icons/md';
const PreviewCompo = ({ windowSize,setMyFormData, businessType, myFormData, setPreviewStatus, setCurrentStep }) => {
  console.log(myFormData)
  const[reviewLoanType,setReviewLoanType]=useState("");
  const handleBackByIndex = (val) => {
    setPreviewStatus(false)
    setCurrentStep(val)
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    setLoading(true);
    try {
      const result = await fetch("EncKey");
      const EncrptToken = await result.text();

      const someData = window.btoa(EncrptToken);

      if (someData) {
        try {
          const body = {
            CompanyID: window.atob(sessionStorage.getItem("company")),
            TokenID: window.atob(sessionStorage.getItem("tk")),
            LoanType: myFormData.loantype,
            FullName: myFormData.fullName,
            Email: myFormData.email,
            DOB: dayjs(myFormData.dob).format("DD-MM-YYYY"),
            Mobile: myFormData.mobile.replace("+91", "").trim(),
            Gender: myFormData.gender,
            StateName: myFormData.statename,
            CityName: myFormData.cityname,
            PINCode: myFormData.pincode,
            IncomeType: myFormData.incometype,
            CompanyName: myFormData.companyname,
            Profession: myFormData.profession,
            Salary: myFormData.monthlySalary,
            LoanAmt: myFormData.loanAmount,
            CurrentEMI: myFormData.currentEmi,
            Tenure: myFormData.tenure,
            PANCARD: myFormData.PANCARD,
            ITR: myFormData.ITR
          };

          const encryptedData = await EncryptionData(body, someData);
          const encryptedBody = ArrayBufferToBase64(encryptedData);
          console.log(body);
          const result = await fetch("LoanLeadSubmit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(encryptedBody),
          });
          const response = await result.json();

          console.log(response);
          if (response.Data.MessageDB == "Success") {
            message.success(response.Data.MessageDB);
            setLoading(false);
            setSubmitStatus(true);
          } else {
            message.error(response.Data.errorMsg);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setMyFormData({
      loantype: "",
      fullName: "",
      email: "",
      dob: "",
      gender: "",
      mobile: "+91 ",
      statename: "",
      cityname: "",
      incometype: "",
      companyname: "",
      profession: "",
      monthlySalary: "",
      loanAmount: "",
      currentEmi: "",
      tenure: "",
      pincode: "",
      PANCARD: "",
      ITR: ""
    });
  };
  useEffect(()=>{
    if(myFormData.loantype=="BusinessLoan"){
      setReviewLoanType("BL")
    }else if(myFormData.loantype=="HomeLoan"){
      setReviewLoanType("HL")
    }else if(myFormData.loantype=="PersonalLoan"){
      setReviewLoanType("PL")
    }
    else if(myFormData.loantype=="LoanAgainstProperty"){
      setReviewLoanType("LAP");
    }else{
      setReviewLoanType("PL")
    }
  },[myFormData])
  return (
    <div className="">
      <Row gutter={[16, 16]}>
        <Col className='justify-content-center d-flex' span={24}>
          {/* <h2 className='preHead'>PREVIEW DETAILS</h2> */}
          <div className='preBox'>
            <div className='preIn'>
              <h2 className='preHead'>Details Preview</h2>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Badge.Ribbon placement="start" color="#09a698" text="Loan Type.....">  
            <Card className='position-relative' >
              <Segmented
              className='mt-4'
                value={reviewLoanType}
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
            </Card>
            <div className='personalEditBtn mt-1' onClick={() => handleBackByIndex(0)}><MdEdit /> Edit</div>
          </Badge.Ribbon>
        </Col>
        <Col span={24}>
          <Badge.Ribbon placement="start" color="#09a698" text="Personal Details.....">
            <Card className='position-relative'>
              <Row className="mt-5" gutter={[20, 16]}>
                <Col md={8} xs={24} className="">
                  <Radio.Group className="mb-1 d-flex justify-content-between w-100  rounded" value={myFormData.gender}>

                    <div className="d-flex">

                      <Radio value="male" className="genderRound" >
                        <div
                          className=""
                          style={{ position: "absolute", top: "-20px", left: "38px" }}
                        >
                          MALE
                        </div>
                        <span
                          style={{ marginLeft: "10px" }}


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
              </Row>
              <Row className='mt-4' gutter={[16, 16]}>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="fullName"
                      value={myFormData.fullName}

                      placeholder="Full Name"
                    />
                    <label className="labelColor" htmlFor="fullName">
                      Full Name
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"
                      autoComplete="off"

                      className="inputText inputBgColor"
                      id="EmailAddress"
                      name="email"
                      value={myFormData.email}

                      placeholder="Email Address"
                    />
                    <label className="labelColor" htmlFor="EmailAddress">
                      Email Address
                    </label>
                  </div>
                </Col>

                <Col md={8} xs={24} className="">
                  <div className="inputBox ">
                    <DatePicker
                      className="w-100 inputBgColor"

                      format="DD-MM-YYYY"
                      value={myFormData.dob ? dayjs(myFormData.dob) : null}
                    />
                    <div className="labelColor">Date Of Birth</div>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="tel"
                      className="inputText inputBgColor"
                      id="mobileNum"
                      autoComplete="off"

                      maxLength={14}
                      name="mobile"
                      value={`${myFormData.mobile}`}

                      placeholder="Mobile Number"
                    />

                    <label className="labelColor" htmlFor="mobileNum">
                      Mobile Number
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"
                      className="inputText inputBgColor"
                      id="pancard"

                      name="pancard"
                      value={myFormData.PANCARD}

                      placeholder="PAN CARD"
                    />

                    <label className="labelColor" htmlFor="pancard">
                      Pan Card
                    </label>
                  </div>
                </Col>
              </Row>
              <div className='personalEditBtn' onClick={() => handleBackByIndex(0)}><MdEdit /> Edit</div>
            </Card>
          </Badge.Ribbon>
        </Col>
        <Col span={24}>
          <Badge.Ribbon placement="start" color="#09a698" text="Address Details.....">
            <Card className='position-relative'>
              <Row className={`my-4`} gutter={[24, 24]}>

                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="fullName"
                      value={myFormData.statename}

                      placeholder="State Name"
                    />
                    <label className="labelColor" htmlFor="Statename">
                      State Name
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"
                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="CityName"
                      value={myFormData.cityname}

                      placeholder="City Name"
                    />
                    <label className="labelColor" htmlFor="CityName">
                      City Name
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"
                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="PINCode"
                      value={myFormData.pincode}

                      placeholder="PIN Code"
                    />
                    <label className="labelColor" htmlFor="PINCode">
                      PIN Code
                    </label>
                  </div>
                </Col>
              </Row>
              <div className='personalEditBtn' onClick={() => handleBackByIndex(1)}><MdEdit /> Edit</div>
            </Card>
          </Badge.Ribbon>
        </Col>
        <Col span={24}>
          <Badge.Ribbon placement="start" color="#09a698" text="Income Details.....">
            <Card className='position-relative'>
              <Row className={`mt-5`} gutter={[24, 24]}>
                <Col md={8} xs={12}>
                  <div
                    className="labelColor"
                    style={{ top: "-25px", left: "15px" }}
                  >
                    Income Type
                  </div>
                  <Segmented
                    className="income"
                    name="incometype"

                    value={myFormData.incometype}
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
              <Row className={`mt-3`} gutter={[24, 24]}>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"
                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="companyname"
                      value={myFormData.companyname}

                      placeholder={
                        businessType ? "Business Type *" : "Company Name *"
                      }
                    />
                    <label className="labelColor" htmlFor="companyname">
                      {businessType ? "Business Type *" : "Company Name *"}
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="profession"
                      value={myFormData.profession}

                      placeholder="Profession"
                    />
                    <label className="labelColor" htmlFor="Profession">
                      Profession *
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="monthlySalary"
                      value={myFormData.monthlySalary}

                      placeholder="Monthly Net Salary /Income *"
                    />
                    <label className="labelColor" htmlFor="monthlySalary">
                      Monthly Net Salary /Income *
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="loanAmount"
                      value={myFormData.loanAmount}

                      placeholder="Required Loan Amount *"
                    />
                    <label className="labelColor" htmlFor="loanAmount">
                      Required Loan Amount *
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="currentEmi"
                      value={myFormData.currentEmi}

                      placeholder="Current Monthly EMI (If Taken)"
                    />
                    <label className="labelColor" htmlFor="currentEmi">
                      Current Monthly EMI (If Taken)
                    </label>
                  </div>
                </Col>
                <Col md={8} xs={24} className="">
                  <div className="inputBox">
                    <input
                      type="text"

                      className="inputText inputBgColor"
                      autoComplete="off"
                      name="tenure"
                      value={myFormData.tenure}

                      placeholder="Tenure (Year)"
                    />
                    <label className="labelColor" htmlFor="tenure">
                      Tenure (Year)
                    </label>
                  </div>
                </Col>
                {businessType && <Col md={8} xs={24}>

                  <Radio.Group name="itr" value={myFormData.ITR} className="border px-4 py-2 w-100 rounded bg-light">
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
              <div className='personalEditBtn' onClick={() => handleBackByIndex(2)} ><MdEdit /> Edit</div>
            </Card>
          </Badge.Ribbon>
        </Col>
      </Row>

      <Row className="mt-5 justify-content-center">
        <Col span={24} className='d-flex justify-content-center'>
          {/* <Button
            type="primary"
            shape="round"
            icon={<BiEdit />}
            onClick={()=>setPreviewStatus(false)}
          >
            EDIT
          </Button> */}
          <Button
            type="primary"
            shape="round"
            icon={<BsFillSendCheckFill />}
            className='w-25'
          >
            SUBMIT
          </Button>
        </Col>

      </Row>

    </div>
  )
}

export default PreviewCompo