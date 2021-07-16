import "./App.css";
import { getApiURL } from "./utils/utils";
import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";

function App() {
  var highlightLine = function (jsonString, searchFor) {
    var regex = new RegExp("(.*" + searchFor + ".*)", "g");
    var highlighted = '<span class="highlighted">$1</span>';
    var newJsonString = jsonString.replace(regex, highlighted);
    console.log(jsonString.match(regex));
    return newJsonString;
  };

  function setWithExpiry(key, value, ttl) {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }


  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
      return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }

  const hightlightedText = () => {
    var jsonString = JSON.stringify(weather, null, 5);
    $("#jsonCode").html(highlightLine(jsonString, "dt"));
  };

  let [weather, setWeather] = useState("");
  const weatherAPI = async () => {
    let arrayOfWeather = [];

    try {
      let axiosConfig = {
        headers: {},
      };

      const data = await axios.get(getApiURL(), axiosConfig);
      arrayOfWeather = data.data;

      //CacheDATA
      setWithExpiry("weatherData", arrayOfWeather, 50000);
    } catch (error) {
      console.log(error);
    }
    try {
      setWeather(arrayOfWeather);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    weatherAPI();
  }, []);

  return (
    <div className="App">
      <h3>Country Details</h3>
      <pre id="jsonCode">{hightlightedText()}</pre>
    </div>
  );
}

export default App;
