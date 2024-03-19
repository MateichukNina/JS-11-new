import axios from "axios";
import Notiflix from "notiflix";

const apiKey = "38015405-7546e421a34b4b2277fcb8cdc";

export default async function searchImages(query,page){
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&per_page=40&page=${page}`;


try {
  const response = await axios.get(url);
  const data = response;
  console.log(data)
  const images = data.hits;
  return images;
 
} catch (error) {
  Notiflix.Notify.failure(error)
}
}