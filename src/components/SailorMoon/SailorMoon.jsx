import React, { useEffect, useState } from "react";
import "./SailorMoon.css";

const SailorMoon = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodesResponse = await fetch(
          "https://api.jikan.moe/v4/anime/530/episodes" // Sailor Moon's anime ID
        );
        const episodesData = await episodesResponse.json();

        const charactersResponse = await fetch(
          "https://api.jikan.moe/v4/anime/530/characters"
        );
        const charactersData = await charactersResponse.json();

        const moviesResponse = await fetch(
          "https://api.jikan.moe/v4/anime?q=sailor%20moon&type=movie"
        );
        const moviesData = await moviesResponse.json();

        setEpisodes(episodesData.data || []);
        setCharacters(charactersData.data || []);
        const filteredMovies = moviesData.data.filter((movie) =>
          new Date(movie.aired.from).getFullYear() < 2000
        );
        setMovies(filteredMovies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sailorMoon-page">
      <div className="sailorMoon-sidebar">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/06/Sailor-Moon-Logo-768x432.png"
          alt="Sailor Moon Logo"
          className="sailorMoon-logo"
        />
        <div className="sailorMoon-info">
          <h1>Sailor Moon</h1>
          <p>
            <strong>Aired:</strong> March 7, 1992 - February 8, 1997
          </p>
          <p>
            <strong>Genres:</strong> Magical Girl, Romance, Adventure, Comedy
          </p>
          <p>
            <strong>Rating:</strong> PG (Mild Violence, Fantasy Themes)
          </p>

          <div className="section theme-song">
            <h2 className="sailorMoon-sectionTitle">Theme Song</h2>
            <audio controls>
              <source src="https://ia600904.us.archive.org/31/items/tvtunes_15377/Sailor%20Moon%20-%20Moonlight%20Densetsu%20-%20Long.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>

      <div className="sailorMoon-mainContent">
        <div className="sailorMoon-section">
          <img className="sailorMoon-banner" src="https://i0.wp.com/yumetwinsblog.wpcomstaging.com/wp-content/uploads/2024/08/sailor-moon-misconceptions-thumbnail.webp?fit=1024%2C576&ssl=1" />
          <h2 className="sailorMoon-sectionTitle">Synopsis</h2>
          <p>
            Sailor Moon follows Usagi Tsukino, a clumsy teenage girl who
            discovers she's a magical warrior tasked with protecting Earth from
            evil forces. Alongside her fellow Sailor Guardians, she fights to
            restore peace and find the legendary Silver Crystal.
          </p>
        </div>

        <div className="sailorMoon-section">
          <h2 className="sailorMoon-sectionTitle">Episode List</h2>
          {loading ? (
            <p>Loading episodes...</p>
          ) : episodes.length === 0 ? (
            <p>No episodes available.</p>
          ) : (
            <table className="sailorMoon-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Aired</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((episode, index) => (
                  <tr key={episode.mal_id}>
                    <td>{index + 1}</td>
                    <td>{episode.title}</td>
                    <td>{episode.aired || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="sailorMoon-section">
          <h2 className="sailorMoon-sectionTitle">Movies Before 2000</h2>
          {loading ? (
            <p>Loading movies...</p>
          ) : movies.length === 0 ? (
            <p>No movies available.</p>
          ) : (
            <table className="sailorMoon-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Image</th>
                  <th>Release Date</th>
                  <th>Synopsis</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.mal_id}>
                    <td>{movie.title}</td>
                    <td>
                      <img
                        src={movie.images.jpg.image_url}
                        alt={movie.title}
                        width="100"
                      />
                    </td>
                    <td>{movie.aired.from.split("T")[0] || "N/A"}</td>
                    <td>{movie.synopsis || "No synopsis available."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="sailorMoon-section">
          <h2 className="sailorMoon-sectionTitle">Main Characters</h2>
          {loading ? (
            <p>Loading characters...</p>
          ) : characters.length === 0 ? (
            <p>No characters available.</p>
          ) : (
            <div className="sailorMoon-characters">
              {characters.map((character) => (
                <div
                  key={character.character.mal_id}
                  className="sailorMoon-characterCard"
                >
                  <img
                    src={character.character.images.jpg.image_url}
                    alt={character.character.name}
                    className="sailorMoon-characterImg"
                  />
                  <p>
                    <strong>{character.character.name}</strong>
                    <br />
                    {character.role}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SailorMoon;