export interface Filter {
  status: boolean | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export interface DevicesFilter extends Filter {
  groupsIDs: string[] | null;
  configsIDs: string[] | null;
}

export interface GroupFilter extends Filter {
  configsIDs: string[] | null;
}
