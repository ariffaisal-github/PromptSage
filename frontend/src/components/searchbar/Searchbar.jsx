import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Searchbar = ({onSearch}) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    onSearch(searchValue);
    navigate(`/marketplace`);
  }

  return (
    <form className="w-[400px] relative">
      <div className="relative mr-2">
        <input
          type="search"
          placeholder="Search a prompt"
          className="w-full h-[40px] p-4 rounded-lg bg-slate-700 text-white"
          value={searchValue}
          onChange={handleInputChange}
        />
          <button className="absolute right-1 top-1/2 -translate-y-1/2 p-3 rounded-full"
          onClick={handleClick}
          >
            <AiOutlineSearch />
          </button>
      </div>
    </form>
  );
};

export default Searchbar;
