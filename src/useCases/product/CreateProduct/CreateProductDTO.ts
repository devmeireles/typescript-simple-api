export interface ICreateProductDTO {
  name: string;
  description?: string;
  owner_id: string;
  store_id: string;
  price: number;
  active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
