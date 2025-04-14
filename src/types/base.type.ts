export type MultiLanguage<T> = {
  data: T;
  lang: string;
};

export type BaseType = {
  deleted: boolean;
  deletedAt?: Date;
  deletedBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  createdAt?: Date;
  createdBy?: string;
  _id: string;
};
