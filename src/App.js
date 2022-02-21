import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  key: "57f4918222124bb6bb6234236221502",
  base: "http://api.weatherapi.com/v1/"
}
function App() {
  /* Hooks */
  const [query, setQuery] = useState('');
  const [cal, setCal] = useState('');
  const [weather, setWeather] = useState(null);

  /* Hook da Pesquisa */
  const search = () => {
      fetch(`${api.base}history.json?key=${api.key}&q=${query}&dt=${cal}&lang=en`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setCal('');
        });
  }
  return (
    <div className="w-app">
      <main>
        {/* Barra superior com os elementos */}
        <nav className="nav navbar bg-white d-flex justify-content-center w-100 shadow-lg">
          <div className="search-box px-2 d-flex container justify-content-center">
             {/* Entrada da data */}
            <input type="date" className="search-bar mx-2 p-3 nav-item "
            onChange={a => setCal(a.target.value)} 
            value={cal}
            />
             {/* Entrada da localidade */}
            <input type="text" className="search-bar mx-2 p-3 nav-item"
              placeholder="Search for..."
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          <button onClick={search} className="btn btn-dark mx-3 p-2 w-100 nav-item"> Search</button>
          </div>
        </nav>
         {/* Fim da Barra superior com os elementos */}
        { weather ? (
        <div className="bg-light rounded container-sm">
           {/* Returno dos dados da API */}
          <div className="box-info">
            <h2 className="local fs-6">{weather.location.name}, {weather.location.region}, {weather.location.country}</h2>
            <small><b>{weather.forecast.forecastday[0].date}</b></small>
            <div>
              <p><small>Min: <b>{weather.forecast.forecastday[0].day.mintemp_c}º</b></small></p>
              <p className="graus fw-bold">{weather.forecast.forecastday[0].day.avgtemp_c}°c</p>
              <p><small>Max: <b>{weather.forecast.forecastday[0].day.maxtemp_c}º</b></small></p>
            </div>
            <img className="figure w-25" src={weather.forecast.forecastday[0].day.condition.icon} />
            <p>{weather.forecast.forecastday[0].day.condition.text}</p>
          </div>
          <hr></hr>
          {/* Returno dos dados da API - Segundo bloco de informações */}
          <div className="box-info row">
            <div className="col border-bottom">
              <p>Sunrise<br></br></p>
              <b className="">{weather.forecast.forecastday[0].astro.sunrise}</b>
            </div>
            <div className="col border-bottom">
            <p>Sunset<br></br></p>
              <b>{weather.forecast.forecastday[0].astro.sunset}</b>
            </div>
            <div className="col border-bottom">
            <p>Moonrise<br></br></p>
              <b>{weather.forecast.forecastday[0].astro.moonrise}</b>
            </div>
            <div className="col border-bottom">
            <p>Moon phase<br></br></p>
              <b>{weather.forecast.forecastday[0].astro.moon_phase}</b>
            </div>
          </div>
        </div>
        ) : (<div className='box-info bg-white rounded-pill shadow-lg'>Select the date and the location to see the Weather informations  (Verify the informations and check if the date that you choosed are into the API Date range)</div>) }
      </main>
    </div>
  );
}

export default App;
