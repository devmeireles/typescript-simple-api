export interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
  asset_type?: string;
  owner_id?: string;
}
