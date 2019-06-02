import {IApi, Prefecture, PopulationDatum} from "./container";

export class ConcreteApi implements IApi {
  /**
   * @param RESAS_API_KEY
   */
  constructor(private readonly RESAS_API_KEY: string) {}
  /**
   * @inheritdoc
   */
  async fetchPrefectures(): Promise<Prefecture[]> {
    const result: {
      prefCode: number;
      prefName: string;
    }[] = (await this.fetch("/api/v1/prefectures")).result;
    return result.map(el => ({code: el.prefCode, name: el.prefName}));
  }
  /**
   * @inheritdoc
   */
  async fetchPopulationByCode(code: number): Promise<PopulationDatum[]> {
    const path = `/api/v1/population/composition/perYear?cityCode=-&prefCode=${code}`;
    const results: {
      label: string;
      data: {year: number; value: number}[];
    }[] = (await this.fetch(path)).result.data;
    const result = results.filter(el => el.label === "総人口")[0];
    if (result == null) {
      console.error(results);
      throw new Error(`Application Error.`);
    }
    return result.data;
  }
  /**
   * RESAS APIへのアクセス
   * @param path URLのパス部分
   */
  private async fetch(path: string): Promise<any> {
    const url = `https://opendata.resas-portal.go.jp${path}`;
    const response = await fetch(url, {
      headers: {"X-API-KEY": this.RESAS_API_KEY},
    });
    const body = await response.json();
    if (!response.ok || body === "404" || body.statusCode === "404") {
      throw new Error(`Request to "${url}" has failed (404 not found).`);
    }
    if (body.statusCode === "403") {
      throw new Error(
        `環境変数「RESAS_API_KEY」が間違っているようです。\n` +
          `再設定してビルドし直してください。`,
      );
    }
    return body;
  }
}
