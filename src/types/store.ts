export interface Handler {
  key: string,
  fn: () => void,
}

export interface States {
  [index: string| number]: any;
}
