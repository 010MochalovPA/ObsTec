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

export interface Vendor {
  name: string;
  _id?: string;
}

export interface DeviceType {
  name: string;
  description: string;
}
