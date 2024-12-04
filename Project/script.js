const app = document.getElementById('root');

const topContainer = document.createElement('div');
topContainer.setAttribute('class', 'top-container');

//Searchbar and button
const searchapp = document.getElementById('root');

const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementById('searchbar');

const searchcontainer = document.createElement('div');
searchcontainer.setAttribute('class', 'container');

searchapp.appendChild(searchcontainer);


// Create the container for video cards
const container = document.createElement('div');
container.setAttribute('class', 'container');

// Append logo and video container to the app
app.appendChild(topContainer);
app.appendChild(container);

showtrending.addEventListener('click', async () => {
  topContainer.innerHTML = '';
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
  topContainer.appendChild(trendingText);

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


  // Handle search submit
  searchButton.addEventListener('click', async (i) => {
    topContainer.innerHTML = '';
    container.innerHTML = '';
    searchcontainer.innerHTML = '';
    const result = await fetchsearchresult();
    console.log(result.data);
    if (result)
    {
      handleData(result.data);
    }
  });


      // Append the query to the API URL and fetch data
      async function fetchsearchresult(){

      const query = searchBar.value;

      const searchText = document.createElement('h2');
      searchText.textContent = 'Search Results for "' + query + '"';
      topContainer.appendChild(searchText);

      const url = `https://yt-api.p.rapidapi.com/search?query=${(query)}`;
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
function handleData(videos) {
  videos.forEach(video => {
      if (video.type === "video") {
          createVideoCard(video)
      }
      else if (video.type === "channel") {
        createChannelCard(video)
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
  h1.textContent = video.title.length > 50 ? `${video.title.substring(0, 50)}...` : video.title;

  const img = document.createElement('img');
  img.setAttribute('src', video.thumbnail[0].url);

  const channel = document.createElement('h3');
  channel.textContent = video.channelTitle;

  const dateAgo = document.createElement('h3');
  dateAgo.textContent = video.publishedTimeText;

  const viewCount = document.createElement('h3');
  viewCount.textContent = `${video.viewCount} views`;

  const p = document.createElement('p');
  p.textContent = video.description.length > 50 ? `${video.description.substring(0, 150)}...` : video.description;

  //To Add: clickable link to video: https://www.youtube.com/watch?v=[videoId]
  const link = document.createElement('a');
  link.setAttribute('href', `https://www.youtube.com/watch?v=${video.videoId}`);
  link.setAttribute('target', '_blank');
  link.textContent = 'Watch Video';
  link.classList.add('video-link');
  // Append elements to card
  container.appendChild(card);
  card.appendChild(link);
  card.appendChild(img);
  card.appendChild(h1);
  card.appendChild(channel);
  card.appendChild(viewCount);
  card.appendChild(dateAgo);
  card.appendChild(p);
  }

  function createChannelCard(video) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const channelIcon = document.createElement('img');
    channelIcon.setAttribute('src', `https:${video.thumbnail[0].url}`);

    const channelName = document.createElement('h1');
    channelName.textContent = video.channelTitle;

    const subCount = document.createElement('h3');
    subCount.textContent = `${video.subscriberCount} subscribers`;

    const channelDesc = document.createElement('p');
    channelDesc.textContent = video.description > 50 ? `${video.description.substring(0, 150)}...` : video.description;

    const link = document.createElement('a');
    link.setAttribute('href', `https://www.youtube.com/@${video.channelTitle}`);
    link.setAttribute('target', '_blank');
    link.textContent = 'View Channel';
    link.classList.add('video-link');

    container.appendChild(card);
    card.appendChild(link)
    card.appendChild(channelIcon);
    card.appendChild(channelName);
    card.appendChild(subCount);
    card.appendChild(channelDesc);

  }

const backToTop = document.createElement('button');
backToTop.textContent = 'Back to Top';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({top: 0, behaviour: 'smooth'})

});

backToTop.style.display = 'none';

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
