import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useUserEditDetailsMutation } from "../../../Redux/Api/UserApi/UserApi";
import { Button, Form, Input, message, Modal } from "antd";
import { useSelector } from "react-redux";


const UserEditDetail = ({ setIsEditing, isEditing }) => {
    const User = useSelector((state) => state.UserReducers.user);

    const [form] = Form.useForm()
    const [userEditDetails , {isLoading}] = useUserEditDetailsMutation()

    form.setFieldsValue({
        fullname: User.fullname,
        username: User.username,
        email: User.email
    })

    const onFinsish = async(values)=>{
        
        try {
            const res = await userEditDetails(values).unwrap()
            const data = res
            message.success(data.msg)
            setIsEditing(false)
        } catch (error) {
           message.error(error.data.msg)
            
        }
        
    }

  return (
    <div>
      <div>
        <Modal open={isEditing} closable={false} footer={null} width= "500px">
            <div>
                <div className=" flex justify-between items-center">
                    <p className="roboto-bold text-[20px]">Edit your detail</p>
                    <span className="w-fit"><IoCloseOutline size={25} className="cursor-pointer" onClick={()=> setIsEditing(false)}/></span>
                </div>
                <Form onFinish={onFinsish} form={form} layout="vertical" className="w-full" >
                    <Form.Item rules={[{required:true}]} name={"fullname"} label= "fullname" className="">
                        <Input placeholder="fullname" className="h-[44px]"/>
                    </Form.Item>
                    <Form.Item rules={[{required:true}]}  name={"username"} label= "Username" className="">
                        <Input placeholder="username" className="h-[44px]"/>
                    </Form.Item>
                    <Form.Item rules={[{required:true}]}  name={"email"} label= "email" className="">
                        <Input placeholder="email" className="h-[44px]"/>
                    </Form.Item>
                    <div className="flex justify-center gap-[13px] flex-wrap md:flex-nowrap mt-[40px]">
                        <button onClick={()=> setIsEditing(false)} className="text-[19px] roboto-medium h-[47px] w-[170px] min-w-[100px] bg-transparent outline-none rounded-[10px] border border-[black]">Cancel</button>
                        <Button  className="text-[19px] roboto-medium h-[47px] w-[170px] min-w-[100px] bg-[#9ce0f0] outline-none rounded-[10px]" htmlType="submit">Save</Button>
                    </div>
                </Form>
            </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserEditDetail;
