import { API } from "./common";

export default {
  verifyToken: token =>
    API.get("auths/token/verify", {}, { headers: { Authorization: token } }),
  login: (text, password) =>
    API.post("auths/admin/loginEmail", { text, password })
};
