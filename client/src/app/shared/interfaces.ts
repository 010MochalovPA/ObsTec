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

// export interface Vendor {
//   name: string;
//   _id?: string;
// }

// export interface DeviceType {
//   name: string;
//   _id?: string;
// }

export interface Message {
  message: string;
}

export interface Collection {
  name: string;
  _id?: string;
}

export interface CollectionsList {
  title: string;
  name: string;
  url: string;
}
