export interface ICreateStoreDTO {
  name: string;
  slug: string;
  description?: string;
  owner_id: string;
  active?: boolean;
}
