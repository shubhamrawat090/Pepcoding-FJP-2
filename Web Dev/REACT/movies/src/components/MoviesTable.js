import React, { useEffect } from "react";

function MoviesTable(props) {
  const [isLoaded, setLoaded] = React.useState(true);
  const [content, setContent] = React.useState([]);
  //So, i will run only 1 time after first execution of return statement
  useEffect(() => {
    async function fetchData() {
      //fetch is inbuilt feature of browser that makes the request to get data -> promise based
      let response = await fetch(
        "https://react-backend101.herokuapp.com/movies"
      );
      response = await response.json();
      setLoaded(false);
      setContent(response);
    }
    fetchData();
  }, []);

  //for delete you need to make changes in the state
  const deleteMovie = (idToBeDeleted) => {
    let restOfTheMovies = content.movies.filter(
      (movie) => movie._id !== idToBeDeleted
    );
    let newContent = { movies: restOfTheMovies };
    setContent(newContent);
  };

  //cannot change state content, which is why we make a separate copy to filter it and then display it from that
  let filteredContent = [];
  //if content is fetched from api
  if (content.movies) {
    filteredContent = content.movies;
    // SEARCHING
    //if there is a request to searchText
    if (props.searchText) {
      //convert title to lowercase and filter the values which match lowercase search text
      filteredContent = content.movies.filter((movie) => {
        let lowerCaseTitle = movie.title.toLowerCase();
        let lowerCaseSearchText = props.searchText.toLowerCase();
        return lowerCaseTitle.includes(lowerCaseSearchText);
      });
    }
    //no request for searching => display entire data from api
    else {
      filteredContent = content.movies;
    }

    console.log("movies table : " + props.cGenre);
    //FILTER according to genre
    if (props.cGenre) {
      filteredContent = filteredContent.filter(function (movie) {
        return movie.genre.name.trim() === props.cGenre.trim();
      });
      console.log("movies table: ", filteredContent);
    }
    //FILTER according to movie count mentioned
    filteredContent = filteredContent.slice(0, props.moviesCount);
  }

  //data
  return (
    <div>
      {isLoaded === true ? (
        <div className="font-bold">Loading...</div>
      ) : (
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2">#</th>
              <th className="px-2">Title</th>
              <th className="px-2">Genre</th>
              <th className="px-2">Stock</th>
              <th className="px-2">Rate</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map(function (movie, idx) {
              return (
                <tr key={movie._id}>
                  <td className="px-2 text-center">{idx + 1}</td>
                  <td className="px-2 text-center">{movie.title}</td>
                  <td className="px-2 text-center">{movie.genre.name}</td>
                  <td className="px-2 text-center">{movie.numberInStock}</td>
                  <td className="px-2 text-center">{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      className="text-white bg-red-500 hover:bg-red-700 px-4 py-2 mx-2 font-bold rounded"
                      onClick={() => {
                        deleteMovie(movie._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MoviesTable;
