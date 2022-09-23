export interface IFilter {
  status: boolean | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface IDevicesFilter extends IFilter {
  groupsIDs: string[] | null;
  configsIDs: string[] | null;
}

export interface IGroupFilter extends IFilter {
  configsIDs: string[] | null;
}
