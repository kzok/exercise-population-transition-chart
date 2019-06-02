import React from "react";
import {storiesOf} from "@storybook/react";
import {action} from "@storybook/addon-actions";

import {CheckboxGroup, CheckboxOption} from "./component";

const CHECKBOX_OPTIONS: ReadonlyArray<CheckboxOption> = [
  {id: 1, text: "ああ県", isChecked: true},
  {id: 2, text: "いい県", isChecked: true},
  {id: 3, text: "うう県", isChecked: false},
  {id: 4, text: "ええ県", isChecked: false},
  {id: 5, text: "おお県", isChecked: true},
  {id: 6, text: "かか県", isChecked: true},
  {id: 7, text: "きき県", isChecked: false},
  {id: 8, text: "くく県", isChecked: true},
  {id: 9, text: "けけ県", isChecked: false},
];

storiesOf(__filename, module)
  .add("example", () => (
    <CheckboxGroup options={CHECKBOX_OPTIONS} onToggle={action("onToggle")} />
  ))
  .add("statefull", () =>
    React.createElement(() => {
      const [state, setState] = React.useState(CHECKBOX_OPTIONS);
      const onToggle = React.useCallback(
        (item: CheckboxOption) => {
          setState(s =>
            s.map(el => {
              if (el.id !== item.id) {
                return el;
              } else {
                return {...el, isChecked: !el.isChecked};
              }
            }),
          );
        },
        [setState],
      );

      return <CheckboxGroup options={state} onToggle={onToggle} />;
    }),
  );
