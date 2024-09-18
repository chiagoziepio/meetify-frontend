import React, { useRef } from "react";
import { Button, Form, Input, message, Select, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { IoMailOpen } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaMeetup } from "react-icons/fa";
import { useAdminCreateUserMutation } from "../../../Redux/Api/UserApi/UserApi";
import { useSelector } from "react-redux";

const AdminCreateUser = () => {
  const [form] = Form.useForm();
  const [adminCreateUser, { isLoading, isSuccess, isError, error }] =
    useAdminCreateUserMutation();
  const navigate = useNavigate();
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const onFinish = async (values) => {
    const credentials = {
      fullname: values.fullname,
      username: values.username,
      password: values.password,
      email: values.email,
      phone_number: values.phone_number,
      role: values.role,
    };
    await adminCreateUser(credentials)
      .unwrap()
      .then((result) => {
        message.success(result.msg);
        form.resetFields();
      })
      .catch((error) => {
        message.error(error.data.msg);
        //console.log(error.data.msg);
      });
  };

  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div
        className=" w-full  md:w-[500px] p-[20px] rounded-[30px]"
        style={{ backgroundColor: screenMode }}
      >
        <div className="flex justify-around items-center mb-[20px]">
          <FaMeetup size={50} />
          <p className="roboto-medium text-[19px] font-semibold">Create User</p>
        </div>
        <div className="flex w-full">
          <div className=" w-full p-[15px]">
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
              <div>
                <Form.Item
                  label="Roles"
                  name={"role"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="select role" className="w-full h-[44px]">
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex gap-[24px] w-full">
                <div className="w-[50%]">
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
                <div className="w-[50%]">
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
                    hasFeedback
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
                    className="w-[8rem] h-[46px] rounded-[10px] bg-[#9ce0f0] text-white "
                  >
                    {isLoading ? (
                      <p className="text-[17px]">
                        {" "}
                        creating
                        <Spin />
                      </p>
                    ) : (
                      <p className="text-[19px]">Create</p>
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

export default AdminCreateUser;
