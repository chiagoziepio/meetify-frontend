import { Button, Form, Input, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { usePwdResetOutsideMutation } from "../../Redux/Api/UserApi/UserApi";
import { useNavigate, useParams } from "react-router-dom";
const OutsidePwdReset = () => {
  const screenMode = useSelector((state) => state.UserReducers.screenMode);
  const [form] = Form.useForm();
  const { resetToken } = useParams();
  console.log(resetToken);
  
  const [PwdResetOutside] = usePwdResetOutsideMutation();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {

      const res = await PwdResetOutside({resetToken, data: values}).unwrap();
      const data = res;
      message.success(data.msg);
      navigate("/");
    } catch (error) {
      message.success(error.data.msg);
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center w-full ">
      <div
        style={{ background: screenMode }}
        className=" w-full md:w-[600px] p-[20px] rounded-[30px]"
      >
        <h3 className="roboto-bold text-[20px]">Reset Password</h3>
        <Form
          layout="vertical"
          className={screenMode === "white" ? "white" : "black"}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password placeholder="**************" className="h-[46px]" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default OutsidePwdReset;
