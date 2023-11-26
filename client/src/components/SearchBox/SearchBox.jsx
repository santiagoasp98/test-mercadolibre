import { Link } from "react-router-dom";
import logo from "../../assets/meli-logo.png"

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBox.css";

function SearchBox() {
  
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
  
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchQuery.trim() !== '') {
        navigate(`/items?search=${searchQuery}`);
      }
    }
  
    return (
      <div className="search-box-container">
        <div className="search-box-subcontainer">
          <div className="search-box-logo">
            <Link to="/">
              <img src={logo} alt="Mercado Libre" />
            </Link>
          </div>
          <div className="search-box-input">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                value={searchQuery} 
                placeholder="Nunca dejes de buscar" 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          <div className="search-box-button">
            <button 
              type="submit"
              onClick={handleSearch}>
            </button>
          </div>
        </div>
      </div>
    )
  
  }

export default SearchBox;