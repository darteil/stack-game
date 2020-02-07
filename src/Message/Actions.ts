import { SHOW_MESSAGE, HIDE_MESSAGE, IShowMessage, IHideMessage } from './types';

export function showMessage(...messages: string[]): IShowMessage {
  return {
    type: SHOW_MESSAGE,
    messages
  };
}

export function hideMessage(): IHideMessage {
  return {
    type: HIDE_MESSAGE
  };
}
