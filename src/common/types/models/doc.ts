export type Doc = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OmitDoc = Omit<Doc, 'id'>;
