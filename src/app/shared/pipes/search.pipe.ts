import { Pipe, PipeTransform } from "@angular/core";
import { Device } from "../../interfaces/interfaces";

@Pipe({
  name: "search",
})
export class SearchPipe implements PipeTransform {
  transform(
    array: Device[] | any[],
    value: string,
    objType:
      | "device"
      | "group"
      | "app"
      | "message"
      | "mapMark"
      | "config"
      | "user"
      | "question"
  ): any[] {
    if (objType === "device")
      return array.filter((el) =>
        value !== "" ? el.name.toLowerCase().includes(value.toLowerCase()) : el
      );
    if (objType === "group") return [];
    if (objType === "app") return [];
    if (objType === "message") return [];
    if (objType === "mapMark") return [];
    if (objType === "config") return [];
    if (objType === "user") return [];
    if (objType === "question") return [];

    return [];
  }
}
