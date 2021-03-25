export interface ICreateProductDTO {
  name: string;
  description?: string;
  owner_id: string;
  store_id: string;
  active?: boolean;
}
