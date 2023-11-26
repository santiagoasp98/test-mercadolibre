import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Item from "./Item/Item";

import "./SearchResults.css";

function SearchResults() {

  const location = useLocation();
  // gets the value of the "search" parameter from the current URL
  const searchQuery = new URLSearchParams(location.search).get('search');
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/items?query=${searchQuery}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <div className="search-results-list">
        {items.slice(0,4).map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  )

}

export default SearchResults;