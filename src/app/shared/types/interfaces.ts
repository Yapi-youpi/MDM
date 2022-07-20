export interface DevicesFilter {
  status: boolean | null;
  dateFrom: string | null;
  dateTo: string | null;
  configsIDs: string[] | null;
  groupsIDs: string[] | null;
}
