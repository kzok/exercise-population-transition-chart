import React from "react";
import ReactDOM from "react-dom";

import {App, AppStore} from "./container";
import {ConcreteApi} from "./api";

const RESAS_API_KEY = process.env.RESAS_API_KEY;
if (RESAS_API_KEY == null) {
  throw new Error(`環境変数「RESAS_API_KEY」をセットしてビルドし直して下さい`);
}
const store = new AppStore(new ConcreteApi(RESAS_API_KEY));
ReactDOM.render(<App store={store} />, document.getElementById("root"));
