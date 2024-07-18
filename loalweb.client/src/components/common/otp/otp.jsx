import { Input, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";

const Otp = ({ Open, sendData }) => {
  const [open, setOpen] = useState();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const forOtpRef = useRef([]);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);

    sendData(0);
  };

  const handleNext = (val) => {
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
  };
  useEffect(() => {
    setOpen(Open);
  }, [Open]);
  return (
    <Modal
      title="OTP VERIFICATION"
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText="OTP VERIFY"
    >
      <hr />
      <div className="otpWrapper">
        <div className="innerWrap">
          <Input
            autoFocus
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("1");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("1"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[1] = el)}
          />
          <Input
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("2");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("2"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[2] = el)}
          />
          <Input
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("3");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("3"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[3] = el)}
          />
          <Input
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("4");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("4"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[4] = el)}
          />
          <Input
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("5");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("5"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[5] = el)}
          />
          <Input
            className="otp"
            maxLength={1}
            onChange={(e) => {
              handleNext("6");
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numeric characters
              handleNext("6"); // Call your existing onChange handler
            }}
            ref={(el) => (forOtpRef.current[6] = el)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Otp;
