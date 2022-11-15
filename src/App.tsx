import React, {ChangeEvent, useEffect, useState} from 'react';
import cl from "./App.module.scss";
import {GeolocationControl, Map, Placemark} from "@pbe/react-yandex-maps";
import axios from "axios";

function App() {
  const [promiseValue, setPromiseValue] = useState<number[]>([55.751574, 37.573856])
  const [inputValue, setInputValue] = useState("");
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const token = "b5ddbcb021afeee5701a16b0ed864d87c9399dcb";

  // const options: RequestInit = {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //     "Authorization": "Token " + token
  //   },
  //   body: JSON.stringify({query: inputValue})
  // }
  //
  // fetch(url, options)
  //   .then(response => response.text())
  //   .then(result => {
  //     setPromiseValue(JSON.parse(result).suggestions)
  //     console.log(JSON.parse(result).suggestions)
  //   })

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Token " + token
        },
        data: {
          query: inputValue
        }
      })

      setPromiseValue([+result.data.suggestions[0].data.geo_lat, +result.data.suggestions[0].data.geo_lon])
      console.log(promiseValue)
    }

    fetch();
  }, [inputValue, promiseValue])

  return (
    <div className={cl.wrapper}>
      <div className={cl.inputContainer}>
        <input className={cl.inputText} type="text" value={inputValue} onChange={changeHandler} />
        <div className={cl.inputOptions}>

        </div>
      </div>

      <div className={cl.mapContainer}>
        {promiseValue  && (
          <Map
            state={{center: promiseValue, zoom: 17, controls: ["zoomControl", "fullscreenControl"]}}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
            height={401}
            width="100%"
          >
            <Placemark geometry={promiseValue} />
            <GeolocationControl options={{ float: "left" }} />
          </Map>
        )}
      </div>
    </div>
  );
}

export default App;
