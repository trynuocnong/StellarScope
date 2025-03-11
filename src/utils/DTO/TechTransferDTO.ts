export interface TechTransferRes {
  results: Array<string[]>;
  count: number;
  total: number;
  perpage: number;
  page: number;
}

export interface TechTransfer_Params {
  [key: string]: string;
  api_key: string;
}
