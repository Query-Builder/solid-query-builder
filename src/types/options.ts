export interface Option<N extends string = string> {
  name?: N;
  value?: N;
  label: string;
  disabled?: boolean;
}
