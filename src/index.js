import searchImages from "./search-API";
const searchForm = document.querySelector("#search-form");
const gallery = document.querySelector(".gallery");

searchForm.addEventListener("submit", onSubmit);

async function onSubmit(evt){
  evt.preventDefault();
  const query = searchForm.elements['searchQuery'].value;

  let page = 1;
  try {
    const images = await searchImages(query, page); // Получаем изображения из API
    showImages(images); // Показываем изображения
  } catch (error) {
    console.error(error);
  }
  // fetchImage()
  // .then(showImages)
  // .catch(console.log(error))
}

function showImages(images){
  const markup = images.map(image => {
    return `<a href="${image.largeImageURL}" class="photo-card">
    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${image.likes}</b>
      </p>
      <p class="info-item">
        <b>${image.views}</b>
      </p>
      <p class="info-item">
        <b>${image.comments}</b>
      </p>
      <p class="info-item">
        <b>${image.downloades}</b>
      </p>
    </div>
  </a>`
  })
  gallery.innerHTML = markup
}