import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("New Delhi");
  const [query, setQuery] = useState("");
  const [similarSearches, setSimilarSearches] = useState([]);
  const [cate, setCate] = useState("places");
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setDisplay(filteredData);
  }, [search]);

  useEffect(() => {
    fetchSimilarSearches();
  }, [query]);

  const fetchSimilarSearches = () => {
    const filteredData = data.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });
    setSimilarSearches(filteredData);
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearch(query);
    setQuery("");
    setSimilarSearches([]);
  };

  return (
    <>
      {display.length > 0 && (
        <div className="App">
          <div className="background">
            <img src={display[0].backgroundUrl} className="background_image" />
          </div>
          <div className="navbar" id="weather-data">
            <img src={display[0].weather.icon} />
            <h2>{display[0].weather.temp}</h2>
            <h2>{display[0].weather.main}</h2>
          </div>
          <div className="middlecontent">
            <h4 class="city-name">{display[0].name}</h4>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                id="search-input"
                value={query}
                onChange={handleInputChange}
              />
              <button type="submit" id="btn-submit">
                Search
              </button>
              {similarSearches.length > 0 && (
                <div>
                  <ul>
                    {similarSearches?.map((search) => (
                      <li>{search.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
          <div className="img_bottom">
            <a id="places" onClick={() => setCate("places")}>
              Places
            </a>
            <a id="hotels" onClick={() => setCate("hotels")}>
              Hotels
            </a>
            <a id="resturants" onClick={() => setCate("restaurants")}>
              Restaurants
            </a>
            <a id="offices" onClick={() => setCate("offices")}>
              Offices
            </a>
          </div>
          <div className="cards">
            {display[0].categories[cate].map((item) => {
              console.log(item);
              return (
                <div className="card">
                  <div className="card_img">
                    <img src={item.imageUrl} />
                  </div>
                  <div className="textdata">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                  <div className="openat">
                    <h3>Opens at</h3>
                    <h3 className="second">{item.openAt}</h3>
                  </div>
                  <div className="closeat">
                    <h3>Closes at</h3>
                    <h3 className="second">{item.closeAt}</h3>
                  </div>
                  <div className="openat">
                    <h3>Entry Fee</h3>
                    <h3 className="second">₹ {item.entryFee}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
