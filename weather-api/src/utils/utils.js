import data from "../utils/cities.json";
export const getApiURL = () => {
  const cityCode = data.List[0].CityCode;
  const API_KEY = "15436e163b6f7f3ad2eaf43b6e44fe04";
  return `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&appid=${API_KEY}&units=metric`;
};

export const getAPI_KEY = () => {
  return "15436e163b6f7f3ad2eaf43b6e44fe04";
};
