export type ModalContextType = {
  open: (children: React.JSX.Element) => void;
  close: () => void;
};

export interface CheckboxItem {
  id: string;
  title: string;
}

export type Link = {
  id: string;
  title: string;
  href: string;
};

export type GroupLink = {
  id: string;
  title: string;
};

export interface APIResponse<T> {
  state: string;
  response: T;
}
