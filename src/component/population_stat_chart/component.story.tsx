import React from "react";
import {storiesOf} from "@storybook/react";

import {PopulationStatChart} from "./component";

storiesOf(__filename, module).add("example", () => (
  <PopulationStatChart
    series={[
      {
        name: "ほげ県",
        data: [
          {year: 1970, value: 100},
          {year: 1980, value: 100},
          {year: 1990, value: 100},
          {year: 2000, value: 100},
          {year: 2010, value: 100},
          {year: 2020, value: 100},
        ],
      },
      {
        name: "ふが県",
        data: [
          {year: 1970, value: 1000},
          {year: 1980, value: 1010},
          {year: 1990, value: 1020},
          {year: 2000, value: 1030},
          {year: 2010, value: 1040},
          {year: 2020, value: 1050},
        ],
      },
      {
        name: "ぴよ県",
        data: [
          {year: 1970, value: 2000},
          {year: 1980, value: 1800},
          {year: 1990, value: 1200},
          {year: 2000, value: 800},
          {year: 2010, value: 750},
          {year: 2020, value: 700},
        ],
      },
    ]}
  />
));
