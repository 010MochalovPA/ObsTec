export interface User {
  username: string;
  password: string;
  expiresIn?: number;
}

export interface Device {
  deviceTypeId: string;
  deviceModel: string;
  serialNumber: string;
  inventoryNumber: string;
  unitId: string;
  groupId: string;
  ipAddress?: string;
  isRepair: boolean;
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

export interface CollectionAddress {
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
  };
}
