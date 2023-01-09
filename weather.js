import { getArgs } from "./helpers/args.js";
import { printError, printHelp, printSuccess } from "./services/log.services.js";
import { saveKeyValue } from "./services/storage.services.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue("token", token);
    printSuccess("Токен сохранен");
  } catch (error) {
    printError(error.message);
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
    return saveToken("token", args.t);
  }
};

initCLI();
