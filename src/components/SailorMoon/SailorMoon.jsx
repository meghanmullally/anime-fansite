import React, { useEffect, useState } from "react";
import "./SailorMoon.css";

const ANILIST_URL = "https://graphql.anilist.co";

const anilistFetch = (query) =>
  fetch(ANILIST_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }).then((res) => res.json());

const SailorMoon = () => {
  const [episodeCount, setEpisodeCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [seriesRes, moviesRes] = await Promise.all([
          anilistFetch(`{
            Media(id: 530, type: ANIME) {
              episodes
              characters(page: 1, perPage: 20) {
                nodes { id name { full } image { medium } }
              }
            }
          }`),
          anilistFetch(`{
            Page(perPage: 10) {
              media(search: "Sailor Moon", type: ANIME, format: MOVIE) {
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
    <div className="sailorMoon-page">
      <div className="sailorMoon-sidebar">
        <img
          src="https://1000logos.net/wp-content/uploads/2023/06/Sailor-Moon-Logo-768x432.png"
          alt="Sailor Moon Logo"
          className="sailorMoon-logo"
        />
        <div className="sailorMoon-info">
          <h1>Sailor Moon</h1>
          <p><strong>Aired:</strong> March 7, 1992 - February 8, 1997</p>
          <p><strong>Genres:</strong> Magical Girl, Romance, Adventure, Comedy</p>
          <p><strong>Rating:</strong> PG (Mild Violence, Fantasy Themes)</p>
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
          <img
            className="sailorMoon-banner"
            src="https://i0.wp.com/yumetwinsblog.wpcomstaging.com/wp-content/uploads/2024/08/sailor-moon-misconceptions-thumbnail.webp?fit=1024%2C576&ssl=1"
            alt="Sailor Moon Banner"
          />
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
          ) : episodeCount === 0 ? (
            <p>No episodes available.</p>
          ) : (
            <table className="sailorMoon-table">
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

        <div className="sailorMoon-section">
          <h2 className="sailorMoon-sectionTitle">Movies Before 2000</h2>
          {loading ? (
            <p>Loading movies...</p>
          ) : movies.length === 0 ? (
            <p>No movies available.</p>
          ) : (
            <table className="sailorMoon-table">
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

        <div className="sailorMoon-section">
          <h2 className="sailorMoon-sectionTitle">Main Characters</h2>
          {loading ? (
            <p>Loading characters...</p>
          ) : characters.length === 0 ? (
            <p>No characters available.</p>
          ) : (
            <div className="sailorMoon-characters">
              {characters.map((character) => (
                <div key={character.id} className="sailorMoon-characterCard">
                  <img
                    src={character.image.medium}
                    alt={character.name.full}
                    className="sailorMoon-characterImg"
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

export default SailorMoon;
