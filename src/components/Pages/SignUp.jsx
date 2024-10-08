import React, { useRef } from "react";
import { Button, Form, Input, message, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { IoMailOpen } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaMeetup } from "react-icons/fa";
import { useUserSignupMutation } from "../../Redux/Api/UserApi/UserApi";
import Password from "antd/es/input/Password";
import { useSelector } from "react-redux";
const SignUp = () => {
  const [form] = Form.useForm();
  const [userSignup, { isLoading, isSuccess, isError, error }] =
    useUserSignupMutation();
  const navigate = useNavigate();
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const formRef = useRef();
  /* if(screenMode === "white"){
      //formRef.current.classList.add("black")
      console.log(formRef.current);
      
    }else{
      //formRef.current.classList.remove("black")
      console.log(formRef.current);
    } */

  const onFinish = async (values) => {
    const credentials = {
      fullname: values.fullname,
      username: values.username,
      password: values.password,
      email: values.email,
      phone_number: values.phone_number,
    };
    await userSignup(credentials)
      .unwrap()
      .then((result) => {
        message.success(result.msg);
        form.resetFields();
        navigate("/");
      })
      .catch((error) => {
        message.error(error.data.msg);
        //console.log(error.data.msg);
      });
  };
  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div
        className=" w-full md:w-[700px] p-[20px] rounded-[30px]"
        style={{ backgroundColor: screenMode }}
      >
        <div className="flex justify-around items-center mb-[20px]">
          <FaMeetup size={50} />
          <p className="roboto-medium text-[19px] font-semibold">
            Get an account
          </p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap w-full">
          <div className="bg-[#9ce0f0] w-full sm:w-[40%] min-w-[250px] flex flex-col gap-y-[30px] justify-center items-center rounded-[20px]">
            <h3 className="roboto-bold text-[white] text-[20px] md:text-[2.1rem] text-center">
              Has an Account?
            </h3>
            <Link to="/" className="hover:underline text-[19px]">
              Sign in
            </Link>
          </div>
          <div className=" w-full sm:w-[60%] p-[15px]">
            <Form
              layout="vertical"
              onFinish={onFinish}
              form={form}
              className={screenMode === "white" ? "white" : "black"}
            >
              <div>
                <Form.Item
                  label="Fullname"
                  name={"fullname"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="w-full h-[44px]"
                    placeholder="fullname"
                    prefix={<FaUser />}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Username"
                  name={"username"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="w-full h-[44px]"
                    placeholder="username"
                    prefix={<LuUser2 />}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Email"
                  name={"email"}
                  rules={[
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    type="email"
                    className="w-full h-[44px]"
                    placeholder="email"
                    prefix={<IoMailOpen />}
                  />
                </Form.Item>
              </div>
              <div className="flex gap-[24px]  w-full">
                <div className="w-[50%] min-w-[150px]">
                  <Form.Item
                    label="Password"
                    name={"password"}
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
                <div className="w-[50%] min-w-[150px]">
                  <Form.Item
                    label="confirm Password"
                    name={"cpwd"}
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("password do not match");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="w-full h-[44px]"
                      placeholder="*******"
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <Form.Item
                  label="Phone Number"
                  name={"phone_number"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input
                    className="w-full h-[44px]"
                    placeholder="contact"
                    prefix={<MdOutlinePhoneInTalk />}
                  />
                </Form.Item>
              </div>
              <div className="flex justify-center items-center">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    className="w-[8rem] h-[46px] rounded-[10px] bg-[#9ce0f0] text-white"
                  >
                    {isLoading ? (
                      <p>
                        {" "}
                        siginning in
                        <Spin />
                      </p>
                    ) : (
                      "SignUp"
                    )}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
