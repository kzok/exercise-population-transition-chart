import React from "react";

import "./style.css";

/** 選択肢 */
export type CheckboxOption = Readonly<{
  /** ID */
  id: number;
  /** 名前 */
  text: string;
  /** チェックされているかどうか */
  isChecked: boolean;
}>;

const Checkbox: React.FC<{
  text: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
}> = ({text, onChange, checked}) => (
  <label className="c_checkbox_group__checkbox">
    <input type="checkbox" onChange={onChange} checked={checked} />
    {text}
  </label>
);

/** チェックボックスのグループ */
export type CheckboxGroupProps = Readonly<{
  /** 選択肢 */
  options: ReadonlyArray<CheckboxOption>;
  /** チェックが変更されたとき */
  onToggle: (item: CheckboxOption) => void;
}>;
export const CheckboxGroup: React.FC<CheckboxGroupProps> = React.memo(props => {
  const checkboxes = props.options.map(option => (
    <Checkbox
      key={option.id}
      text={option.text}
      onChange={() => props.onToggle(option)}
      checked={option.isChecked}
    />
  ));
  return <div className="c_checkbox_group">{checkboxes}</div>;
});
