const searchapp = document.getElementById('root');

const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementById('searchbar');

const searchcontainer = document.createElement('div');
searchcontainer.setAttribute('class', 'container');

searchapp.appendChild(searchcontainer);

  // Handle search submit
  searchButton.addEventListener('click', async (i) => {
    logoContainer.innerHTML = '';
    container.innerHTML = '';
    searchcontainer.innerHTML = '';
    const result = await fetchsearchresult();
    console.log(result.data);
    if (result)
    {
      handleSearchResults(result.data);
    }
  });


      // Append the query to the API URL and fetch data
      async function fetchsearchresult(){
      const query = searchBar.value;
      const searchText = document.createElement('h2');
      searchText.textContent = 'Search Results for ' + query;
      logoContainer.appendChild(searchText);

      const url = `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(query)}`;
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
    

  // Optional: Handle the search results (display videos)
  function handleSearchResults(listings) {
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
    searchapp.appendChild(errorMessage);
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
  searchcontainer.appendChild(card);
  card.appendChild(img);
  card.appendChild(h1);
  card.appendChild(release);
  card.appendChild(viewCount);
  card.appendChild(p);
  }