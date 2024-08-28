import React from "react";
import { Form, Input } from "antd";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { IoMailOpen } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { FaMeetup } from "react-icons/fa";
const SignIn = () => {
  const [form] = Form.useForm();
  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div className=" w-full md:w-[700px] bg-[rgb(255,255,255)] p-[20px] rounded-[30px]">
        <div className="flex justify-around items-center mb-[20px]">
          <FaMeetup size={50}/>
          <p className="roboto-medium text-[19px] font-semibold">Get an account</p>
        </div>
        <div className="flex w-full">
        <div className="bg-[#9ce0f0] w-[30%] flex flex-col gap-y-[30px] justify-center items-center rounded-[20px]">
          <h3 className="roboto-bold text-[white] text-[2.1rem] text-center">Are you new here?</h3>
          <Link to="/register" className="hover:underline text-[19px]">Sign Up</Link>
        </div>
        <div className="w-[65%] p-[15px]">
          <Form layout="vertical">
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
                    required: true,
                  },
                ]}
              >
                <Input
                  className="w-full h-[44px]"
                  placeholder="email"
                  prefix={<IoMailOpen />}
                />
              </Form.Item>
            </div>
            <div className="flex gap-[24px]">
              <div >
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
              <div>
                <Form.Item
                  label="confirm Password"
                  name={"cpwd"}
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                    },
                    ({getFieldValue})=>({
                      validator(_,value){
                        if(!value || getFieldValue('password') === value){
                          return Promise.resolve()
                        }
                        return Promise.reject("password do not match")
                      }
                    })
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
          </Form>
        </div>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
