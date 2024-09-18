import React from "react";
import { FaMeetup } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
const Loader = () => {
  return (
    <div className="min-h-[100vh] w-full bg-[#9ce0f0] flex justify-center items-center">
      <div>
        <div>
          <FaMeetup size={70} />
          <h2 className="mt-[20px] text-[22px] roboto-bold">Meetify</h2>
        </div>
        <p className="spinner mt-[20px]">
            <ImSpinner2 size={30}/>
        </p>
      </div>
    </div>
  );
};

export default Loader;
