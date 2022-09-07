import { Device } from './devices';

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

export const groupIcons: string[] = [
  'apple',
  'bag',
  'ball',
  'circle',
  'cloud',
  'cup',
  'cursor',
  'diamond',
  'drop',
  'emoji',
  'fish',
  'flask',
  'flower',
  'hat',
  'heart',
  'lightning',
  'moon',
  'note',
  'palette',
  'paw',
  'pizza',
  'plane',
  'rhombus',
  'rocket',
  'saturn',
  'shield',
  'snowflake',
  'sport_cup',
  'square',
  'star',
  'triangle',
  'umbrella',
];
