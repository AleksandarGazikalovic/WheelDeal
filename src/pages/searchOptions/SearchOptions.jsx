import React, { useState, useEffect } from "react";
import { Navbar } from "../../components";
import picture1 from "../../assets/TestImages/picture1.jpg";
import picture2 from "../../assets/TestImages/picture2.jpg";
import picture3 from "../../assets/TestImages/picture3.jpg";
import picture4 from "../../assets/TestImages/picture4.jpg";
import "./searchOptions.css";

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchNextImage = async (index) => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      setImages((prevImages) => [...prevImages, data]); // Append the new image data to the existing state
      setCurrentIndex(index + 1); // Move to the next image
      console.log("Images: ", images);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (currentIndex < 110) {
      // Fetch the next image if currentIndex is less than the number of images you want to fetch
      fetchNextImage(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="gradient_bg">
      <Navbar />
      <div className="wd--search section__padding">
        <div className="wd--search-content">
          <div className="wd--search-content--elements">
            {images.map((image, index) => (
              <div key={index} className="wd--search-content--elements-element">
                <div className="wd--search-content--elements-element-image">
                  <img src={image.message} alt={index} />
                </div>
                <div className="wd--search-content--elements-element-text">
                  <h3>{image.message.split("/")[4]}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
