import { Button, Form, Input, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useUserForgotPwdMutation } from "../../Redux/Api/UserApi/UserApi";
const ForgotPwd = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const [form] = Form.useForm();

  const [userForgotPwd] = useUserForgotPwdMutation();
  const onFinish = async (values) => {
    try {
      const res = await userForgotPwd(values).unwrap();
      const data = res;

      message.success(data.msg);
    } catch (error) {
      message.error(error.data.msg);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div
        style={{ background: screenMode }}
        className=" w-full md:w-[600px] p-[20px] rounded-[30px]"
      >
        <h3 className="roboto-bold text-[20px]">Provide a registered Email</h3>
        <Form
          layout="vertical"
          className={screenMode === "white" ? "white" : "black"}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
              {
                required: true,
                message: "Email is required!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-[46px]"
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPwd;
