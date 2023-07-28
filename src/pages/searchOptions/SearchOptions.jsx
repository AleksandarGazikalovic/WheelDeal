import React, { useState, useEffect } from "react";
import { Navbar, ElementSkeleton } from "../../components";
import "./searchOptions.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const mounted = React.useRef(true);

  const fetchNextImage = async (index) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (mounted.current) {
        setImages((prevImages) => [...prevImages, data]); // Append the new image data to the existing state
        setIsLoading(false);
        setCurrentIndex(index + 1); // Move to the next image
        console.log("Images: ", images);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (currentIndex < 20) {
      // Fetch the next image if currentIndex is less than the number of images you want to fetch
      fetchNextImage(currentIndex);
    }
  }, [currentIndex]); // Include currentIndex in the dependency array

  return (
    <div className="gradient_bg">
      <Navbar />
      <div className="wd--search section__padding">
        <div className="wd--search-content">
          <div className="wd--search-content--elements">
            {isLoading ? (
              <ElementSkeleton />
            ) : (
              images.map((image, index) => (
                <div
                  key={index}
                  className="wd--search-content--elements-element"
                >
                  <div className="wd--search-content--elements-element-image">
                    <img src={image.message} alt={index} />
                  </div>
                  <div className="wd--search-content--elements-element-text">
                    <h3>{image.message.split("/")[4]}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
