(function() {
   'use strict';

   const movies = [];

   const renderMovies = function() {
      $('#listings').empty();

      for (const movie of movies) {
         const $col = $('<div>').addClass('col s6');
         const $card = $('<div>').addClass('card hoverable');
         const $content = $('<div>').addClass('card-content center');
         const $title = $('<h6>').addClass('card-title truncate');

         $title.attr({
            'data-position': 'top',
            'data-tooltip': movie.title
         });

         $title.tooltip({
            delay: 50
         }).text(movie.title);

         const $poster = $('<img>').addClass('poster');

         $poster.attr({
            src: movie.poster,
            alt: `${movie.poster} Poster`
         });

         $content.append($title, $poster);
         $card.append($content);

         const $action = $('<div>').addClass('card-action center');
         const $plot = $('<a>');

         $plot.addClass('waves-effect waves-light btn modal-trigger');
         $plot.attr('href', `#${movie.id}`);
         $plot.text('Plot Synopsis');

         $action.append($plot);
         $card.append($action);

         const $modal = $('<div>').addClass('modal').attr('id', movie.id);
         const $modalContent = $('<div>').addClass('modal-content');
         const $modalHeader = $('<h4>').text(movie.title);
         const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
         const $modalText = $('<p>').text(movie.plot);

         $modalContent.append($modalHeader, $movieYear, $modalText);
         $modal.append($modalContent);

         $col.append($card, $modal);

         $('#listings').append($col);

         $('.modal-trigger').leanModal();
      }
   };

   // ADD YOUR CODE HERE


   var submitSearch = document.getElementById('submitSearch');
   var search = document.getElementById('search');
   var searchValue = '';
   //  console.log(movie, 'movie');
   //  console.log(submitSearch);
   submitSearch.addEventListener("click", function() {
      event.preventDefault();
      // console.log(search.value);
      searchValue = search.value;
      var xhr = new XMLHttpRequest();
      var movie = {
         'id': 'c',
         'poster': 'a',
         'title': 'b',
         'year': 2
      };
      xhr.addEventListener('load', function() {
         if (xhr.status !== 200) {
            return;
         }

         var data = JSON.parse(xhr.responseText);

         movie.id = data.imdbID;
         movie.poster = data.Poster;
         movie.title = data.Title;
         movie.year = data.Year;
         console.log(movie, 'movie');
         movies.push(movie);
         renderMovies();

      });

      xhr.open('GET', `http://www.omdbapi.com/?t=${searchValue}`);

      xhr.send();

      search.value = '';

   })





   // - Listen for submissions on the search form. Remember to prevent the default action.
   // - Validate the user input is not blank.
   // - Clear the previous search results.
   // - Send an HTTP request to the [OMDB API](http://omdbapi.com/) search endpoint.
   // - Handle the HTTP response by pushing a new, well-formed `movie` object into the global `movies` array.
   // - Render the `movies` array to the page by calling the `renderMovies()` function with no arguments.
   //
   // Each well-formed `movie` object in the `movies` array must have the following key-value pairs.
   //
   // | Key      | Value                               |
   // |----------|-------------------------------------|
   // | `id`     | The movie's unique imdb ID number.  |
   // | `poster` | The URL to the movie's poster image |
   // | `title`  | The title of the movie.             |
   // | `year`   | The year of the movie's release.    |
})();
