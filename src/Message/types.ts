export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export interface IMessageState {
  text: string;
  show: boolean;
}

export interface IShowMessage {
  type: typeof SHOW_MESSAGE;
  text: string;
}

export interface IHideMessage {
  type: typeof HIDE_MESSAGE;
}

export type MessageActionTypes = IShowMessage | IHideMessage;
