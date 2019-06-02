import React from "react";
import {observer} from "mobx-react-lite";

import {PopulationStatChart} from "../component/population_stat_chart";
import {CheckboxGroup, CheckboxOption} from "../component/checkbox_group";

import {AppStore, Prefecture, PopulationSeries} from "./store";

/**
 * 都道府県選択
 */
const CheckboxArea: React.FC<{
  prefectures: ReadonlyArray<Prefecture>;
  datasetByPrefectureCode: ReadonlyMap<number, PopulationSeries>;
  onToggle: (option: CheckboxOption) => void;
}> = ({prefectures, datasetByPrefectureCode, onToggle}) => {
  const options = prefectures.map(
    ({code, name}): CheckboxOption => ({
      id: code,
      text: name,
      isChecked: datasetByPrefectureCode.has(code),
    }),
  );
  return (
    <>
      <h3>都道府県</h3>
      <CheckboxGroup options={options} onToggle={onToggle} />
    </>
  );
};

/**
 * コンテンツ部分
 */
const Content: React.FC<{store: Readonly<AppStore>}> = observer(({store}) => {
  if (store.prefectures == null) {
    return null;
  }
  const series = Array.from(store.datasetByPrefectureCode.values());
  return (
    <>
      <CheckboxArea
        prefectures={store.prefectures}
        datasetByPrefectureCode={store.datasetByPrefectureCode}
        onToggle={({id}) => store.togglePrefecture(id)}
      />
      <br />
      <PopulationStatChart series={series} />
    </>
  );
});

/**
 * エラー表示
 */
const Error: React.FC<{error: Error | null}> = ({error}) => {
  if (error == null) {
    return null;
  }
  return (
    <div>
      <p style={{color: "red"}}>エラー: {error.message}</p>
      <a href="#" onClick={() => window.location.reload()}>
        再読込
      </a>
    </div>
  );
};

/**
 * アプリケーションコンテナ
 */
export const App: React.FC<{store: Readonly<AppStore>}> = observer(
  ({store}) => {
    React.useEffect(() => {
      if (store.prefectures == null) {
        store.fetchPrefectures();
      }
    }, [store]);

    return (
      <div>
        <h1>都道府県別の総人口推移グラフ</h1>
        <Error error={store.error} />
        <Content store={store} />
      </div>
    );
  },
);
