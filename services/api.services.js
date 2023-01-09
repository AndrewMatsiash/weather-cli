import https from "https";
import { TOKEN_DICTIONARY, getKeyValue } from "./storage.services.js";

const getWeather = async (city) => {
  const token = await getKeyValue(TOKEN_DICTIONARY.token);
  console.log(token);
  if (!token) {
    throw new Error("Не задан ключ API,задайте его через команду -t [API_KEY] ");
  }
  // const url = ` https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;
  const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  url.searchParams.append("q", city);
  url.searchParams.append("appid", token);
  url.searchParams.append("lang", "ru");
  url.searchParams.append("units", "metric");

  https.get(url, (response) => {
    let res = "";
    response.on("data", (data) => (res += data));
    response.on("end", () => console.log(res));
  });
};

export { getWeather };
