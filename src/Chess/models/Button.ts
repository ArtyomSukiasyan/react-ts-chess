import { MouseEventHandler } from "react";

export interface IButton {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
