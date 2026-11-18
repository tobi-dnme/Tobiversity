import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./comp-styles/SearchBar.css";

function SearchBar() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  function handleSearch() {      {/* Copied from Ultimate Courses Tutorial 'Navigate to a URL with Query Strings (Search Params) in React Router by Todd Motto'*/}
    const inputText = searchText.trim();

    if (inputText === "") {
      navigate("/courses");
      return;
    }

    navigate({
      pathname: "/courses",
      search: `?${createSearchParams({ search: inputText })}`,
    });
  }

  return (
    <form
      className="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <input
        className="search-input"
        type="text"
        placeholder="What you looking for?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;