import "./App.css";
import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

// API KEY
const REACT_APP_PIXABAY_API_KEY = "Put your pixabay api key here";

function App() {
  const [images, setImages] = useState([]);
  const [isLOading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://pixabay.com/api/?key=${REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
        );
        const data = await res.json();
        setImages(data.hits);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [term]);

  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLOading && images.length === 0 && (
        <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      )}
      {isLOading ? (
        <h1 className="text-4xl font-bold">Loading...</h1>
      ) : (
        <div className="grid grid-cols-3 gap-4 m-4">
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
