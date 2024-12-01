const app = document.getElementById('root');

const logoContainer = document.createElement('div');
logoContainer.setAttribute('class', 'logo-container');
const logo = document.createElement('img');
logo.src = 'logo.png';
logoContainer.appendChild(logo);



// Create the container for video cards
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Append logo and video container to the app
app.appendChild(logoContainer);
app.appendChild(container);

showtrending.addEventListener('click', async () => {
  container.innerHTML = '';
  searchcontainer.innerHTML = '';
  const result = await fetchvideos();
  console.log(result.data);
  if (result) 
    {
      handleData(result.data);
    }
});


async function fetchvideos(){

  const trendingText = document.createElement('h2');
  trendingText.textContent = 'Trending';
  logoContainer.appendChild(trendingText);

  const url = 'https://yt-api.p.rapidapi.com/trending?geo=US';
  const options = {

  method: 'GET',
headers: {
'x-rapidapi-key': 'f72b99f686mshcc644b7af9002f7p1a2d65jsn440340c24708',
'x-rapidapi-host': 'yt-api.p.rapidapi.com'
}
};
  

  try {
const response = await fetch(url, options);
  if (!response.ok)
  {
      throw new Error(`Error Fetching: ${response.status}`)
  }    
  return await response.json();
  } 
      catch (error) {
      handleError(error);
      return null;
  }

}


function handleData(listings) {
  listings.forEach(listing => {
      // Check if the listing is of type 'video_listing' and has data
      if (listing.type === "video_listing" && Array.isArray(listing.data)) {
          // Filter videos to exclude Shorts
          const videos = listing.data.filter(video => video.lengthText !== "SHORTS").slice(0,10);
          videos.forEach(createVideoCard);
      }
  });
}


function handleError(error) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error: ${error.message}`;
    app.appendChild(errorMessage);
}
  


function createVideoCard(video) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const h1 = document.createElement('h1');
  h1.textContent = video.title;

  const img = document.createElement('img');
  img.setAttribute('src', video.thumbnail[2].url);

  const release = document.createElement('h3');
  release.textContent = video.channelTitle;

  const viewCount = document.createElement('h3');
  viewCount.textContent = `${video.viewCount} views`;

  const p = document.createElement('p');
  p.textContent = `${video.description.substring(0, 300)}...`;

  // Append elements to card
  container.appendChild(card);
  card.appendChild(img);
  card.appendChild(h1);
  card.appendChild(release);
  card.appendChild(viewCount);
  card.appendChild(p);
  }