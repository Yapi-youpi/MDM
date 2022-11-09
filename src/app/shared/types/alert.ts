export type alertTypes = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  title: string;
  content: string;
  show?: boolean;
  type?: alertTypes;
  progressWidth?: string;
}
