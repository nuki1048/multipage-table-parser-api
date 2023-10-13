export interface RouteParams {
  file_name: string;
}

export interface ObjectTables {
  [key: string]: Table[];
}

export interface Table {
  [key: string]: string;
}
export interface KeysTables {
  [key: string]: string[];
}
