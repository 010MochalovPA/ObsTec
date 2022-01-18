export interface User {
  username: string;
  password: string;
  expiresIn?: number;
}

export interface Device {
  deviceTypeId: string;
  deviceModel: string;
  deviceTypeName: string;
  serialNumber: string;
  ipAdress?: string;
  inventoryNumber: string;
  PersonId?: string;
  _id?: string;
}

export interface Message {
  message: string;
}

export interface Collection {
  name: string;
  _id?: string;
}

export interface CollectionChild {
  name: string;
  ParentId: string;
  _id?: string;
}

export interface CollectionsList {
  title: string;
  name: string;
  url: string;
}

export interface CollectionAdress {
  postalCode: string;
  locality: string;
  street: string;
  number: string;
  _id?: string;
}
export interface CollectionsListChild {
  title: string;
  name: string;
  url: string;
  parent: {
    title: string;
    name: string;
    url: string;
    parentIndex: number;
  };
}
