import { DataStoragesKindType, DataType } from "../types/storage";

export function getStorageData(type: DataStoragesKindType): DataType {
  const storage = localStorage.getItem(type);

  return storage ? JSON.parse(storage) : null;
}

export function updateStorageData(type: DataStoragesKindType, data: DataType) {
  localStorage.setItem(type, JSON.stringify(data));
}
