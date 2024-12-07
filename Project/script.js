
const app = document.getElementById('root');

//Container for Trending
const topContainer = document.createElement('div');
topContainer.setAttribute('class', 'top-container');

//Searchbar and button
const searchButton = document.getElementById('searchButton')
const searchBar = document.getElementById('searchbar');

//Container for Search
const searchcontainer = document.createElement('div');
searchcontainer.setAttribute('class', 'container');

app.appendChild(searchcontainer);


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

  //Append "Trending" to the top container to be displayed above the videos
  const trendingText = document.createElement('h2');
  trendingText.textContent = 'Trending';
  trendingText.style = "background-color: #ff6347";
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
    //Clears all previous outputs
    topContainer.innerHTML = '';
    container.innerHTML = '';
    searchcontainer.innerHTML = '';
    //Starts attempting to fetch search results
    const result = await fetchsearchresult();
    //Logs data obtained by fetchsearchresults
    console.log(result.data);
    //If data is obtained, passes through to handleData
    if (result)
    {
      handleData(result.data);
    }
  });


      async function fetchsearchresult(){
      //Takes the input that the user typed into the search bar 
      const query = searchBar.value;
      
      //Appends 'Search results for "[query]"' to the top container
      const searchText = document.createElement('h2');
      searchText.textContent = 'Search Results for "' + query + '"';
      searchText.style = "background-color: #6a5acd;";
      topContainer.appendChild(searchText);

      //Appends the query to the API URL
      const url = `https://yt-api.p.rapidapi.com/search?query=${(query)}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'f72b99f686mshcc644b7af9002f7p1a2d65jsn440340c24708',
          'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
      };
      //If data is not obtained from the URL, throws an Error
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
//Function that filters the data so that only videos and channels are outputted
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


//Error for when the program fails to obtain data from the URL
function handleError(error) {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error: ${error.message}`;
    app.appendChild(errorMessage);
}
  

//Creates a card for each video
function createVideoCard(video) {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  
  //Video Title
  const h1 = document.createElement('h1');
  h1.textContent = video.title.length > 50 ? `${video.title.substring(0, 50)}...` : video.title; //Limited to 50 characters on the page#

  //Video Thumbnail
  const img = document.createElement('img');
  //Grabs the url of the first thumbnail in the list of thumbnails. In the data, these thumnails vary in resolution
  img.setAttribute('src', video.thumbnail[0].url); 
  
  //Channel Name
  const channel = document.createElement('h3');
  channel.textContent = video.channelTitle;
  
  //Video View Count
  const viewCount = document.createElement('h3');
  viewCount.textContent = `${video.viewCount} views`;
  
  //Text for how long ago the video was published
  const dateAgo = document.createElement('h3');
  dateAgo.textContent = video.publishedTimeText;
  
  //Video Description
  const p = document.createElement('p');
  p.textContent = video.description.length > 50 ? `${video.description.substring(0, 150)}...` : video.description;

  //Link to Watch Video on YouTube
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

  //Creates a Card for each channel.
  function createChannelCard(video) {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    //Channel Icon
    const channelIcon = document.createElement('img');
    //Grabs the URL of the first channel thumnail in the list of thumbnails.
    channelIcon.setAttribute('src', `https:${video.thumbnail[0].url}`);
    //Makes the channel icon round to make channel and video thumbnails look distinct from eachother.
    channelIcon.style = "border-radius: 50%";

    //Channel Name
    const channelName = document.createElement('h1');
    channelName.textContent = video.channelTitle;
    channelName.style.backgroundImage = "linear-gradient(120deg, rgb(158, 151, 255) 0%, #000000 100%";

    //Channel Subscriber Count
    const subCount = document.createElement('h3');
    subCount.textContent = `${video.subscriberCount} subscribers`;

    //Channel Description
    const channelDesc = document.createElement('p');
    channelDesc.textContent = video.description > 50 ? `${video.description.substring(0, 150)}...` : video.description;

    //Link to View Channel on YouTube
    const link = document.createElement('a');
    link.setAttribute('href', `http://www.youtube.com/channel/${video.channelId}`);
    link.setAttribute('target', '_blank');
    link.textContent = 'View Channel';
    link.classList.add('video-link');

    //Append Elements to Card
    container.appendChild(card);
    card.appendChild(link)
    card.appendChild(channelIcon);
    card.appendChild(channelName);
    card.appendChild(subCount);
    card.appendChild(channelDesc);

  }

//Button to send user back to top
const backToTop = document.createElement('button');
backToTop.textContent = 'Back to Top';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({top: 0, behaviour: 'smooth'})

});

backToTop.style.display = 'none';

//'Back To Top' button is hidden when at the top of the page
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
