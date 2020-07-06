import axios from "axios";
import { API_TIMEOUT } from "../constants/api";
import configs from "../constants/configs";
import _ from "lodash";

const endpoint = configs.endPoint;
const API = axios.create({
  baseURL: endpoint,
  timeout: API_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

const convertObjectToQuery = object => {
  console.log(!_.isEmpty(object))
  if (!_.isEmpty(object)) {
    return Object.keys(object)
      .map(key => {
        if (object[key][0]) {
          return key + "=" + object[key][0];
        }
      })
      .join("&");
  }
};

export { API, endpoint, convertObjectToQuery };
