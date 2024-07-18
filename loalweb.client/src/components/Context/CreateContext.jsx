import React, { createContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
export const Context = createContext();
const CreateContext = ({ children }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const inputRef = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState({});

  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [genderValue, setGenderValue] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState(false);

  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [businessType, setBusinessType] = useState(false);
  const [review, setReview] = useState({
    review1: false,
    review2: false,
    review3: false,
  });
  const [myFormData, setMyFormData] = useState({
    loantype: "HomeLoan",
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
    PANCARD: "",
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Context.Provider
      value={{
        showModal,
        handleCancel,
        setIsModalOpen,
        isModalOpen,
        handleOk,
        myFormData,
        setMyFormData,
        windowSize,
        stateList,
        review,
        genderValue,
        submitStatus,
        currentStep,
        setReview,
        cityList,
        setBusinessType,
        setCityList,
        setStateList,
        setSubmitStatus,
        setCurrentStep,
        setGenderValue,
        setLoading,
        loading,
        inputRef,
        formRef,
        currentStep,
        businessType,
        navigate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default CreateContext;
