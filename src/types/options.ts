export interface Option<N extends string | number = string | number> {
  name?: N;
  value?: N;
  label: string;
  disabled?: boolean;
}
