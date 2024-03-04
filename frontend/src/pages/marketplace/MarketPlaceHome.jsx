import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import Searchbar from "../../components/searchbar/Searchbar";

function MarketPlaceHome() {
  const [prompts, setPrompts] = useState([]);
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [engine, setEngine] = useState("All");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("All");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const url = `https://delightful-bull-lab-coat.cyclic.app/api/v1/prompts/all-prompts/?type=${type}&sort=${sort}&engine=${engine}&category=${category}&search=${search}&priceRange=${priceRange}`;
        const response = await axios.get(url);
        setPrompts(response.data.prompts);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };

    fetchPrompts();
  }, [type, sort, engine, category, search, priceRange]);

  const navigateToPromptDetails = (promptId) => {
    navigate(`/marketplace/${promptId}`);
  };

  const handleFilterChange = (filterType, value) => {
    // Update the corresponding state based on the filterType
    switch (filterType) {
      case "type":
        setType(value);
        break;
      case "sort":
        setSort(value);
        break;
      case "engine":
        setEngine(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "priceRange":
        setPriceRange(value);
        break;
      // Add other cases if needed
      default:
        break;
    }
  };

  return (
    <div className="bg-slate-900 min-h-[150vh]">
      <Navbar />
      <Filter onFilterChange={handleFilterChange} />
      <div className="flex flex-col items-center mt-5">
        {/* Introduction Section */}
        <Searchbar onSearch={setSearch} />
        <section className="text-center text-white mb-2 mt-6">
          <h3 className="text-xl font-bold mb-4">Explore Prompts</h3>
        </section>

        {/* Marketplace Grid */}
        <div className="ml-24 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {prompts.map((prompt) => (
            <div key={prompt._id} className="relative group">
              <div
                style={{
                  backgroundImage: `url(${prompt.cover_image.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "220px",
                  height: "120px",
                }}
                className="bg-gradient-to-b rounded-lg  from-slate-600 to-slate-900 p-4 h-32 flex flex-col justify-end cursor-pointer transform transition duration-300 group-hover:scale-105 relative"
                onClick={() => navigateToPromptDetails(prompt.id)}
              >
                <p className="text-white font-semibold">{prompt.title}</p>
                <p className="text-gray-300 text-sm">{prompt.engine}</p>
              </div>
              <div
                className="absolute inset-0 rounded-lg bg-transparent group-hover:bg-opacity-10 transition duration-300"
                onClick={() => navigateToPromptDetails(prompt._id)}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarketPlaceHome;
