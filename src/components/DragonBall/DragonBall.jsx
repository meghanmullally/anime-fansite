import React, { useEffect, useState } from "react";
import "./DragonBall.css";

const ANILIST_URL = "https://graphql.anilist.co";

const anilistFetch = (query) =>
  fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

const DragonBall = () => {
  const [episodeCount, setEpisodeCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seriesRes, moviesRes] = await Promise.all([
          anilistFetch(`{
            Media(id: 223, type: ANIME) {
              episodes
              characters(page: 1, perPage: 20) {
                nodes { id name { full } image { medium } }
              }
            }
          }`),
          anilistFetch(`{
            Page(perPage: 10) {
              media(search: "Dragon Ball", type: ANIME, format: MOVIE) {
                id title { romaji english }
                startDate { year month day }
                coverImage { medium }
                description
              }
            }
          }`),
        ]);

        setEpisodeCount(seriesRes.data.Media.episodes || 0);
        setCharacters(seriesRes.data.Media.characters.nodes || []);
        setMovies(
          (moviesRes.data.Page.media || []).filter(
            (m) => m.startDate?.year < 2000
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = ({ year, month, day }) => {
    if (!year) return "N/A";
    if (!month) return `${year}`;
    return new Date(year, month - 1, day || 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: day ? "numeric" : undefined,
    });
  };

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
          <p><strong>Aired:</strong> February 26, 1986 - April 19, 1989</p>
          <p><strong>Genres:</strong> Action, Adventure, Comedy, Martial Arts</p>
          <p><strong>Rating:</strong> PG (Mild Violence)</p>
          <div className="section theme-song">
            <h2 className="section-title">Theme Song</h2>
            <audio controls>
              <source src="https://archive.org/download/dbz-hsc-01-ongatesen-flac/01.%20CHA-LA%20HEAD-CHA-LA.mp3" type="audio/mpeg" />
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
          ) : episodeCount === 0 ? (
            <p>No episodes available.</p>
          ) : (
            <table className="anime-table">
              <thead>
                <tr><th>#</th><th>Episode</th></tr>
              </thead>
              <tbody>
                {Array.from({ length: episodeCount }, (_, i) => (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>Episode {i + 1}</td>
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
                <tr><th>Title</th><th>Image</th><th>Release Date</th><th>Synopsis</th></tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td>{movie.title.english || movie.title.romaji}</td>
                    <td>
                      <img src={movie.coverImage.medium} alt={movie.title.romaji} width="100" />
                    </td>
                    <td>{formatDate(movie.startDate)}</td>
                    <td dangerouslySetInnerHTML={{ __html: movie.description || "No synopsis available." }} />
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
                <div key={character.id} className="character-card">
                  <img
                    src={character.image.medium}
                    alt={character.name.full}
                    className="character-img"
                  />
                  <p><strong>{character.name.full}</strong></p>
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
