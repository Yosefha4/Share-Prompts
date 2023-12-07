"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // const handleSearchChange = (e) => {
  //   setSearchText(e.target.value)
  //   // console.log(searchText)
  // };

  const submitSearch = (e) => {
    e.preventDefault();
    console.log("Submit enter!");

    // const filteredPosts = posts.map((post) => post.prompt.includes("test3"))

    const filteredPosts = posts.filter((post) =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase())
    );

    setPosts(filteredPosts);

    // if(filteredPosts.length > 0 ){
    //   setPosts(filteredPosts)
    //   console.log("found post ")
    // }
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag / username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={() => {}} />
      ) : (
        <PromptCardList data={posts} handleTagClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;
