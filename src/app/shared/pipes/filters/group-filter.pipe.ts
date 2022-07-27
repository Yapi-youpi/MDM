import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment/moment";

import { DevicesGroup } from "../../types/groups";

@Pipe({
  name: "groupFilter",
})
export class GroupFilterPipe implements PipeTransform {
  transform(
    groups: DevicesGroup[],
    status: boolean | null,
    dateFrom: string | null,
    dateTo: string | null,
    configIDs: string[] | null
  ): DevicesGroup[] {
    if (!status && !dateFrom && !dateTo && !configIDs) {
      return groups;
    } else {
      console.log(status, dateFrom, dateTo, configIDs);
      return groups.filter((g) => {
        return (
          (status ? g.activeState : !g.activeState) &&
          (dateFrom ? g.updateTime > dateFrom : g.updateTime > "") &&
          (dateTo ? g.updateTime < dateTo : moment.utc(Infinity).format()) &&
          (configIDs && configIDs.length !== 0
            ? configIDs.some((el) => g.deviceConfigID.includes(el))
            : g)
        );
      });
    }
  }
}
