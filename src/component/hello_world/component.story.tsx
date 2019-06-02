import React from "react";
import {storiesOf} from "@storybook/react";

import {HelloWorld} from "./component";

storiesOf(__filename, module).add("example", () => <HelloWorld />);
