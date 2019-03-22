'use strict';

const searchURL = 'https://api.github.com/users/';


function displayResults(responseJson) {
  // if there are previous results, remove them
  $('#results-list').empty();
  responseJson.forEach( el => {
    
    $('#results-list').append(
      `<li><h3><a href="${el.html_url}">${el.name}</a></h3>
      </li>`)
  });
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) {
  const queryString = "/repos"
  const url = searchURL + query + queryString;

  fetch(url)
    .then(response => {
      console.log(response.status)
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong, try again later.");
      }
    })
    .then(responseJson => {
      displayResults(responseJson);
    })
    .catch(err => {
      console.log(err);
    });
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
};

$(watchForm);