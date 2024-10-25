import { useState, useEffect } from "react";
import ImagesCard from "./components/ImagesCard";
import ImageSearch from "./components/ImageSearch";

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`)
    .then((res) => res.json())
    .then((data) => {
      setImages(data.hits);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
  }, [term]);

  return (
    <div className="mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)}/>

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mt-32">No Images Found...</h1>}
      
      {isLoading? <h1 className="text-6xl text-center mt-32">Loading...</h1> : <div className="grid grid-cols-3 place-items-center gap-4">
        {
          images.map((image, index) => (
            <ImagesCard key={index} image={image}/>
          ))
        }
      </div>}
    </div>
   
  );
}

export default App;
