import React, { useEffect, useState } from "react";
import "./DragonBall.css";

const DragonBall = () => {
  const [episodes, setEpisodes] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const episodesResponse = await fetch(
          "https://api.jikan.moe/v4/anime/223/episodes"
        );
        const episodesData = await episodesResponse.json();

        const charactersResponse = await fetch(
          "https://api.jikan.moe/v4/anime/223/characters"
        );
        const charactersData = await charactersResponse.json();

        const moviesResponse = await fetch(
          "https://api.jikan.moe/v4/anime?q=dragon%20ball&type=movie"
        );
        const moviesData = await moviesResponse.json();

        setEpisodes(episodesData.data || []);
        setCharacters(charactersData.data || []);

        const filteredMovies = moviesData.data.filter(
          (movie) => new Date(movie.aired.from).getFullYear() < 2000
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
    <div className="dragonBall-page">
      <div className="sidebar">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIQTnALonHu1dDr_E-wiLglKgkJnG5EkppGg&s"
          alt="Dragon Ball Logo"
          className="anime-logo"
        />
        <div className="dragonBall-info">
          <h1>Dragon Ball</h1>
          <p>
            <strong>Aired:</strong> February 26, 1986 - April 19, 1989
          </p>
          <p>
            <strong>Genres:</strong> Action, Adventure, Comedy, Martial Arts
          </p>
          <p>
            <strong>Rating:</strong> PG (Mild Violence)
          </p>

          <div className="section theme-song">
            <h2 className="section-title">Theme Song</h2>
            <audio controls>
              <source src="https://ia801700.us.archive.org/21/items/dbz-hsc-01-ongatesen-flac/01.%20CHA-LA%20HEAD-CHA-LA.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="section">
          <img
            className="banner"
            src="https://staticdelivery.nexusmods.com/mods/6892/images/headers/329_1731656317.jpg"
            alt="Dragon Ball Banner"
          />
          <h2 className="section-title">Synopsis</h2>
          <p>
            Dragon Ball follows Goku's journey from childhood to adulthood as he
            trains in martial arts and explores the world in search of the seven
            orbs known as Dragon Balls, which summon a wish-granting dragon when
            gathered.
          </p>
        </div>

        <div className="section">
          <h2 className="section-title">Episode List</h2>
          {loading ? (
            <p>Loading episodes...</p>
          ) : episodes.length === 0 ? (
            <p>No episodes available.</p>
          ) : (
            <table className="anime-table">
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

        <div className="section">
          <h2 className="section-title">Movies Before 2000</h2>
          {loading ? (
            <p>Loading movies...</p>
          ) : movies.length === 0 ? (
            <p>No movies available.</p>
          ) : (
            <table className="anime-table">
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

        <div className="section">
          <h2 className="section-title">Main Characters</h2>
          {loading ? (
            <p>Loading characters...</p>
          ) : characters.length === 0 ? (
            <p>No characters available.</p>
          ) : (
            <div className="characters">
              {characters.map((character) => (
                <div
                  key={character.character.mal_id}
                  className="character-card"
                >
                  <img
                    src={character.character.images.jpg.image_url}
                    alt={character.character.name}
                    className="character-img"
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

export default DragonBall;