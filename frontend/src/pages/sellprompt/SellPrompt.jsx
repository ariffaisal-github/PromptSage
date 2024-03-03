import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SellPrompt() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <div className="max-h-full max-w-full bg-slate-900 pb-10 h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white">
            Please{" "}
            <Link to="/signin">
              <button>
                <u>Login</u>
              </button>
            </Link>{" "}
            to Sell a Prompt
          </h1>
        </div>
      </div>
    );
  }
  const categories = [
    "Anime","Animal","Art","Building","Business","Cartoon","Celebrity","Fantasy","Fun","Games","Icons","Wallpaper","Writing",
  ];
  categories.sort();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [engine, setEngine] = useState("");
  const [tipsToUse, setTipsToUse] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");

  const navigate = useNavigate();

  const handleSellPrompt = async (e) => {
    e.preventDefault();
    try {
      // Get the file input element
      const fileInput = document.getElementById("cover_image_input");
      const coverImage = fileInput.files[0];

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("cover_image", coverImage);
      // Append other form fields
      formData.append("title", title);
      formData.append("description", description);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("prompt", prompt);
      formData.append("engine", engine);
      formData.append("tipsToUse", tipsToUse);
      formData.append("uploadedBy", uploadedBy);

      const response = await axios.post(
        "/api/v1/prompts/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success("Prompt Uploaded Successfully");
      setTitle("");
      setDescription("");
      setType("");
      setCategory("");
      setPrice(0);
      setPrompt("");
      setEngine("");
      setTipsToUse("");
      setUploadedBy("");
      navigate("/");
    } catch (error) {
      toast.error("Prompt Upload Failed");
      // console.log(error);
    }
  };

  return (
    <div className="max-h-full max-w-full bg-slate-900 pb-10">
      <Navbar />
      <div className="flex flex-col ml-40 mt-8 mx-auto max-w-5xl">
        <label
          for="Name"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Prompt Title
        </label>
        <input
          type="text"
          id="title"
          placeholder=""
          className="h-10 w-50 text-sm bg-slate-800 border-2 rounded-lg  
                    border-white border-opacity-50 outline-none focus:border-white
                    text-white transition duration-200 ease-in-out drop-shadow-2xl
                    "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label
          for="Name"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Upload Prompt Cover Image
        </label>
        <input
          id="cover_image_input"
          type="file"
          className="h-7 w-1/2 block  bg-slate-800 text-sm text-white border
                    border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white"
          // multiple accept="image/*"
        />

        <label
          for="Description"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Prompt Description
        </label>
        <textarea
          type="text"
          id="description"
          placeholder=""
          rows={4}
          className="h-22 w-50  text-sm  bg-slate-800 border-2 rounded-lg  
                    border-white border-opacity-50 outline-none focus:border-white
                    text-white transition duration-200 ease-in-out drop-shadow-2xl
                "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label
          for="type"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Prompt Type
        </label>
        <select
          id="price"
          className="w-50 bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option seleted value={null}>
            Select Prompt Type
          </option>
          <option value="DALL-E">DALL-E</option>
          <option value="GPT">GPT</option>
          <option value="Midjourney">Midjourney</option>
          <option value="Stable Diffusion">Stable Diffusion</option>
        </select>

        <label for="category" className="block mt-2 mb-2 text-sm font-medium text-white">
          Category
        </label>

        <select
          id="category"
          className="w-50 bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option seleted value={null}>
            Select Category
          </option>
          {categories.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>

        <label
          for="price"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Estimated Price
        </label>
        <select
          id="price"
          className="w-50 bg-slate-800 border border-gray-300 text-white text-sm rounded-lg focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-white"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option selected value={0}>
            Price
          </option>
          <option value={2}>$2</option>
          <option value={4}>$4</option>
          <option value={6}>$6</option>
          <option value={8}>$8</option>
        </select>

        <label
          for="Prompt"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          *Prompt
          <br />
          <i>
            <small>
              Copy and paste your prompt below. Ensure any editable parts of
              your prompt are indicated by [square brackets]
            </small>
          </i>
        </label>
        <textarea
          type="text"
          id="description"
          placeholder="Copy and paste your prompt here."
          rows={4}
          className="h-22 w-50  text-sm  bg-slate-800 border-2 rounded-lg  
                    border-white border-opacity-50 outline-none focus:border-white
                    text-white transition duration-200 ease-in-out drop-shadow-2xl
                "
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* <label
          htmlFor="file_input"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Upload Sample Images related your prompt
        </label>
        <input
          // id="file_input"
          type="file"
          className="h-7 w-1/2 block bg-black text-white text-sm border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white"
          multiple
          accept="image/*"
        /> */}

        <label
          for="Engine"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          *Engine
        </label>
        <select
          id="price"
          className=" bg-slate-800 border w-50 border-gray-300 text-white text-sm rounded-lg focus:border-white block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  dark:focus:border-white"
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
        >
          <option selected value={null}>
            Select GPT Engine
          </option>
          <option value="Chat gpt-4 turbo">Chat gpt-4 turbo</option>
          <option value="Chat gpt">Chat gpt</option>
          <option value="Chat gpt-32k">Chat gpt-32k</option>
          <option value="Chat gpt-3.5 turbo">Chat gpt-3.5 turbo</option>
        </select>

        <label
          for="tips"
          className="block mt-2 mb-2 text-sm font-medium text-white"
        >
          Tips to use
        </label>
        <textarea
          type="text"
          id="tips"
          placeholder=""
          className="h-22 w-50  text-sm  bg-slate-800 border-2 rounded-lg  
                    border-white border-opacity-50 outline-none focus:border-white
                    text-white transition duration-200 ease-in-out drop-shadow-2xl
                "
          value={tipsToUse}
          onChange={(e) => setTipsToUse(e.target.value)}
        />
      </div>

      <button
        onClick={handleSellPrompt}
        className=" flex items-center justify-center ml-40 p-0.5  mt-2 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-amber-500 to-rose-600 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-800 text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Sell Prompt
        </span>
      </button>
    </div>
  );
}

export default SellPrompt;
