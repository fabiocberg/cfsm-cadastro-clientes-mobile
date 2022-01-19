import Constants from "expo-constants";

const ENV = {
  dev: {
    apiUrl: "http://192.168.0.3:3001",
  },
  prod: {
    apiUrl: "https://exemplo-endereco-producao.com",
  },
};

const getEnvVars = (env = Constants?.manifest?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === "prod") {
    return ENV.prod;
  }
  return ENV.dev;
};

export default getEnvVars;
