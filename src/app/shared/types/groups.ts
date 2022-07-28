import { Device } from "./devices";

export interface DevicesGroup {
  id: string;
  name: string;
  description: string;
  activeState: boolean;
  deviceConfigID: string;
  iconID: string;
  updateTime: string;
  devices: Device[];
  capacity: number;
  isSelected?: boolean;
}
