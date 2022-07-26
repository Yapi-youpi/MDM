import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileSize",
})
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    let result: string = (size / (1024 * 1024)).toFixed(2);

    if (Number(result) / 100 <= 100) return result + " Мб";

    return "fix pipe";
  }
}
