export interface IUpdateStoreDTO {
    id: string;
    name: string;
    slug: string;
    description: string;
    owner_id?: string;
    active?: boolean;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
  }
  