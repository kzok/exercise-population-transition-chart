# 都道府県別の総人口推移グラフ 演習課題

## 概要

[RESAS(地域経済分析システム)](https://opendata.resas-portal.go.jp/)から都道府県別の総人口推移グラフを表示する React.js SPA の演習課題です。

## 起動方法

1.  事前に[RESAS](https://opendata.resas-portal.go.jp/)に登録をして API キーを取得します
1.  `.env`ファイルを作成し`RESAS_API_KEY=<your api key>`を記述します
    または、環境変数`RESAS_API_KEY`を設定します
1.  `npm install`を実行し、ビルド環境を構築します
1.  `npm run start`を実行し、ブラウザで表示できます

## コマンドラインタスク

1.  `npm run build`

    `./dist`以下にプロダクションビルドします

1.  `npm run start`

    `webpack-dev-server`を起動します

1.  `npm run storybook`

    `storybook`を起動します

## 使用ライブラリ

-   [React.js](https://github.com/facebook/react)
-   [Highcharts-react](https://github.com/highcharts/highcharts-react)
