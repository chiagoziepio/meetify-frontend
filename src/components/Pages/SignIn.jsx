import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaMeetup } from "react-icons/fa";
import { useUserSignupMutation } from "../../Redux/Api/UserApi/UserApi";
const SignIn = () => {
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    
  };
  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div className="  w-full md:w-[700px] bg-[rgb(255,255,255)] p-[20px] rounded-[30px]">
        <div className="flex justify-around items-center mb-[20px]">
          <FaMeetup size={50} />
          <p className="roboto-medium text-[19px] font-semibold">
            Welcome back
          </p>
        </div>
        <div className="flex flex-row-reverse w-full">
          <div className="bg-[#9ce0f0] w-[30%] flex flex-col gap-y-[30px] justify-center items-center rounded-[20px]">
            <h3 className="roboto-bold text-[white] text-[20px] md:text-[2.1rem] text-center">
              Are you new here?
            </h3>
            <Link to="/" className="hover:underline text-[19px]">
              Sign Up
            </Link>
          </div>
          <div className="w-[65%] p-[15px]">
            <Form layout="vertical" onFinish={onFinish}>
              <div>
                <Form.Item
                  className=""
                  label="Email"
                  name={"email"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input className="w-full h-[44px]" placeholder="email" />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Password"
                  name={"Password"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.Password
                    className="w-full h-[44px]"
                    placeholder="*******"
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Button>Sign-IN</Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
