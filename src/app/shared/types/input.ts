export type inputType =
  | "text"
  | "number"
  | "checkbox"
  | "password"
  | "select"
  | "switch";
export type inputWidth = "w-170" | "w-296" | "w-350" | "w-440" | "w-457";
export interface Option {
  value: string;
  html: string;
  isSelected?: boolean;
}
