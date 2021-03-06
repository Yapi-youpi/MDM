import { Pipe, PipeTransform } from "@angular/core";
import { Device } from "../types/devices";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(
    array: Device[] | any[],
    value: string,
    arrayType:
      | "device"
      | "group"
      | "app"
      | "message"
      | "mapMark"
      | "config"
      | "user"
      | "question"
  ): Device[] | any[] {
    if (arrayType === "device")
      return array.filter((el) =>
        value !== "" ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (arrayType === "group") return [];
    if (arrayType === "app") return [];
    if (arrayType === "message") return [];
    if (arrayType === "mapMark") return [];
    if (arrayType === "config") return [];
    if (arrayType === "user") return [];
    if (arrayType === "question") return [];

    return [];
  }
}
