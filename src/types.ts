export interface YamlHeader {
  title: string;
  description: string;
  date: string;
}

export interface FileInfo {
  data: YamlHeader;
  path: string;
}
