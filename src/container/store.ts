import {observable} from "mobx";

/** 県情報 */
export type Prefecture = Readonly<{
  /** 県コード */
  code: number;
  /** 県名 */
  name: string;
}>;

/** 総人口情報 */
export type PopulationDatum = Readonly<{
  /** 年度 */
  year: number;
  /** 人口 */
  value: number;
}>;

/** 県毎のデータセット */
export type PopulationSeries = Readonly<{
  /** 県名 */
  name: string;
  /** 総人口情報 */
  data: ReadonlyArray<PopulationDatum>;
}>;

/** 外部APIインタフェース */
export interface IApi {
  /**
   * @throws
   * @returns 県情報
   */
  fetchPrefectures(): Promise<Prefecture[]>;
  /**
   * @param code 県コード
   * @returns 総人口情報
   */
  fetchPopulationByCode(code: number): Promise<PopulationDatum[]>;
}

/** アプリケーションストア */
export class AppStore {
  /** 読み込み中かどうか */
  @observable isLoading: boolean = false;
  /** エラー情報 */
  @observable error: Error | null = null;
  /** 県情報の一覧（null = 未取得） */
  @observable prefectures: ReadonlyArray<Prefecture> | null = null;
  /** 県コードからデータセットを引く連想配列 */
  @observable datasetByPrefectureCode: ReadonlyMap<
    number,
    PopulationSeries
  > = new Map();
  /**
   * @param api
   */
  constructor(private readonly api: IApi) {}
  /**
   * 県情報を取得
   */
  fetchPrefectures() {
    this.wrapAsync(async () => {
      this.prefectures = await this.api.fetchPrefectures();
      this.datasetByPrefectureCode = new Map();
    });
  }
  /**
   * 県の選択の切り替え
   * @param code 県コード
   */
  async togglePrefecture(code: number) {
    return this.wrapAsync(async () => {
      if (this.prefectures == null) {
        return;
      }
      const prefecture = this.prefectures.filter(el => el.code === code)[0];
      if (prefecture == null) {
        return;
      }
      if (this.datasetByPrefectureCode.has(code)) {
        const next = new Map(this.datasetByPrefectureCode);
        next.delete(code);
        this.datasetByPrefectureCode = next;
        return;
      }
      const nextPopulationByCode = new Map(this.datasetByPrefectureCode);
      nextPopulationByCode.set(code, {
        name: prefecture.name,
        data: await this.api.fetchPopulationByCode(code),
      });
      this.datasetByPrefectureCode = nextPopulationByCode;
    });
  }
  /**
   * 非同期処理をラップする前後処理の追加
   * @param f 非同期処理
   */
  private async wrapAsync(f: () => void | Promise<void>) {
    if (this.isLoading) {
      return; // 連打防止用
    }
    try {
      this.isLoading = true;
      this.error = null;
      await f();
    } catch (e) {
      this.error = e;
    } finally {
      this.isLoading = false;
    }
  }
}
