/**
 * Created by 218024179 on 3/4/2017.
 */
export interface Advisory {
  id: number;
  alert: string;
  advisoryId: string;
  apmAssetId: string;
  ruleId: string;
  modeId: string;
  pssAssetId: string;
  fromCloud: boolean;
}