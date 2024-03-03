import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";

function Success() {
  // const { boughtPromptId, user_id } = useParams();
  // useEffect(() => {
  //   const updateUserData = async () => {
  //     try {
  //       console.log(`USER: ${user_id} and PROMPT: ${boughtPromptId}`)
  //       // Make API call to update user's data
  //       await axios.post("/api/v1/users/buy", {
  //         boughtBy: user_id,
  //         promptId: boughtPromptId,
  //       });
  //     } catch (error) {
  //       console.error("Error updating user data:", error);
  //     }
  //   };

  //   // Call the function to update user data when the component mounts
  //   updateUserData();
  // }, []);

  return (
    <div className="max-h-full max-w-full bg-slate-900 pb-10">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
          Congratulations! Your payment was successful.
        </h1>
      </div>
    </div>
  );
}

export default Success;
