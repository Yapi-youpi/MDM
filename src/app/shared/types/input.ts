export type inputType =
  | "text"
  | "number"
  | "checkbox"
  | "password"
  | "select"
  | "switch"
  | "datetime-local"
  | "range"
  | "file";
export type inputWidth =
  | "w-170"
  | "w-180"
  | "w-186"
  | "w-296"
  | "w-350"
  | "w-440"
  | "w-457"
  | "w-500";

export interface Option {
  value: string;
  html: string;
  isSelected?: boolean;
}
