import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const types = [
    "All",
    "DALL-E",
    "GPT-3",
    "Midjourney",
    "Stable Diffusion",
    "Leonardo Ai",
    "Llama",
  ];
  const categories = [
    "All",
    "Anime",
    "Animal",
    "Art",
    "Building",
    "Business",
    "Cartoon",
    "Celebrity",
    "Fantasy",
    "Fun",
    "Games",
    "Icons",
    "Wallpaper",
    "Writing",
  ];
  const sortByOptions = ["Top", "Newest", "Oldest"];

  // const priceRangeOptions = ["All", "1-4", "5-9"];
  const priceRangeOptions = ["All", "2-3", "4-5", "6-7", "8-9"];
  const [priceRange, setPriceRange] = useState("All");

  const handlePriceRangeChange = (event) => {
    const index = parseInt(event.target.value);
    setPriceRange(priceRangeOptions[index]);
    onFilterChange("priceRange", priceRangeOptions[index]);
  };
  

  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className="ml-3 h-auto w-[12%] bg-gradient-to-r from-slate-900 to-slate-800 absolute p-6">
      <div className="mb-4">
        <h1 className="text-white mb-2">Type</h1>
        {types.map((type) => (
          <label key={type} className="flex items-center text-white">
            <input
              type="checkbox"
              name="Type"
              value={type}
              onChange={() => handleFilterChange("type", type)}
            />{" "}
            <span className="ml-2">{type}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h1 className="text-white mb-2">Sort By</h1>
        {sortByOptions.map((option) => (
          <label key={option} className="flex items-center text-white">
            <input
              type="radio"
              name="SortBy"
              value={option}
              onChange={() => handleFilterChange("sort", option)}
            />{" "}
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <h1 className="text-white mb-2">Price Range($)</h1>
        <input
          type="range"
          min="0"
          max={priceRangeOptions.length - 1}
          value={priceRangeOptions.indexOf(priceRange)}
          onChange={handlePriceRangeChange}
          className="slider appearance-none bg-gray-300 h-1 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex justify-between text-white">
          {priceRangeOptions.map((option) => (
            <span key={option}>{option}</span>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-white mb-2">Category</h1>
        {categories.map((category) => (
          <label key={category} className="flex items-center text-white">
            <input
              type="checkbox"
              name="Category"
              value={category}
              onChange={() => handleFilterChange("category", category)}
            />{" "}
            <span className="ml-2">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
