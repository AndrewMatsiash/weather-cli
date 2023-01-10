import { getArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.services.js";
import { printError, printHelp, printSuccess } from "./services/log.services.js";
import { TOKEN_DICTIONARY, saveKeyValue } from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY);
    console.log(weather);
  } catch (error) {
    if (error?.response?.status === "404") {
      printError("Неверно указан токен");
    } else if (error?.response?.status === "401") {
      printError("Неверно указан токен");
    } else {
      printError(error.message);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    return saveToken(args.t);
  }
  getForecast();
};

initCLI();
