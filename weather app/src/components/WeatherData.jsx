import axios from 'axios'
import React,{useState} from 'react'


function WeatherData() {

    let [city,setCity] = useState()
    let [weather,setWeather] = useState(null)
    let [error,setError] = useState('')
    const api = {
      key : import.meta.env.VITE_API_KEY
    }

    // get api
    function getWeather(city){
        
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${api.key}&q=${city}&api=no`)
        .then((response)=>{
                console.log("data ",response.data);
                setWeather(response.data)
                setError('')
            })
            .catch((error)=>{
              setError("Not found")
              setWeather(null)
            })
    }
    // handle form
    function handleForm(e){
        e.preventDefault()
        getWeather(city)
    }
    console.log(weather ? weather.location.country : '');

  return (
    <div className='weather-container'>
        <div className="weather-data">
        {/* input section  */}
        <div className="search-form-container">
            <form className='search-form' onSubmit={handleForm}>
                <input type="text"
                placeholder='Enter city'
                onChange={(e)=>{setCity(e.target.value)}}
                 />
                 <button type='submit'>Search</button>
            </form>
          </div>
        {/* end  */}

        {/* weather view  */}
          {weather ? 
            <>
          <div className="card">
            <div className="section">
              <div>
                  <img src={weather.current.condition.icon} alt="" />
                  <p>{weather.current.condition.text}</p>
              </div>

              <div>
                  <h3>{weather.location.country}</h3>
                  <h5>{weather.location.name}  <br /> Local time : {weather.location.localtime}</h5>
              </div>

              <div>
                  <h2>{weather.current.temp_c} ℃</h2>
                  <p>Wind : {weather.current.wind_kph} Kph</p>
                  <p>Humidity : {weather.current.humidity} g/m3</p>
              </div>
            </div>
          </div>
          </>
          :
            <>
             {
            error ? <div className='error-div'>{error}</div> : ''
            }
            </>
          }
          {/* end  */}
        </div>    
    </div>
  )
}

export default WeatherData