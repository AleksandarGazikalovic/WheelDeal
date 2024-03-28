import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Footer,
  Navbar,
  PostElementSkeleton,
  TopFilter,
} from "../../components";
import "./searchOptions.css";
import { PostElement } from "../../components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Loading } from "../../components";
import Cookies from "universal-cookie";
import { clearFilter, setFilter } from "../../redux/filterSlice";
import { clearPosts, fetchPosts } from "../../redux/postsSlice";

const SearchOptions = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const dispatch = useDispatch();
  const { posts, pending, hasMore } = useSelector((state) => state.posts);
  const cookies = new Cookies(null, { path: "/" });
  const cookieFilter = cookies.get("filter") || null;
  const filterState = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchPosts(filterState));
  }, [dispatch, filterState]);

  useEffect(() => {
    dispatch(clearPosts());
  }, []);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (pending) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          //need to set filter page to current page + 1
          dispatch(
            setFilter({
              ...filterState,
              page: filterState.page + 1,
            })
          );
        }
      });
      if (node) observer.current.observe(node);
    },
    [pending, hasMore]
  );

  return (
    <div className="gradient_bg2">
      <Navbar
        showLoginForm={showLoginForm}
        setShowLoginForm={setShowLoginForm}
      />
      <TopFilter />
      <div className="wd--search section_padding">
        <div className="wd--search-content">
          <div className="wd--search-content--elements">
            {posts.length !== 0
              ? posts.map((p, index) => (
                  <PostElement
                    post={p}
                    key={p._id}
                    setShowLoginForm={setShowLoginForm}
                    ref={index === posts.length - 1 ? lastPostElementRef : null}
                  />
                ))
              : !pending && (
                  <div className="wd--search-content--elements-title">
                    <h1>Sorry, there are no results for this search.</h1>
                  </div>
                )}
          </div>
          {pending && <Loading />}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchOptions;
