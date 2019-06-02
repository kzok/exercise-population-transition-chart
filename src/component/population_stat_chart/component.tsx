import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

/** グラフの基底設定 */
const BASIC_HIGHCHARTS_OPTIONS = {
  title: {
    text: "",
  },
  xAxis: {
    title: {
      text: "年度",
      align: "middle",
    },
  },
  yAxis: {
    title: {
      text: "人口数",
      align: "high",
      rotation: 0,
    },
  },
} as const;

/** グラフデータ型 */
export type PopulationStatDatum = Readonly<{
  /** 年度 */
  year: number;
  /** 人口数 */
  value: number;
}>;

/** グラフ系列 */
export type PopulationStatSeries = Readonly<{
  /** 地域名 */
  name: string;
  /** 値 */
  data: ReadonlyArray<PopulationStatDatum>;
}>;

/**
 * @param PopulationStatSeries props用の型
 * @param Highcharts.SeriesLineOptions Highchartsの型
 */
const mapChartSeries = (
  series: PopulationStatSeries,
): Highcharts.SeriesLineOptions => ({
  type: "line",
  name: series.name,
  data: series.data.map(datum => [datum.year, datum.value]),
});

/** 人口推移グラフ */
export type PopulationStatChartProps = Readonly<{
  /** データ系列 */
  series: ReadonlyArray<PopulationStatSeries>;
}>;
export const PopulationStatChart: React.FC<
  PopulationStatChartProps
> = props => {
  const series = props.series.map(mapChartSeries);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={{...BASIC_HIGHCHARTS_OPTIONS, series}}
    />
  );
};
