import { SHOW_MESSAGE, HIDE_MESSAGE, IShowMessage, IHideMessage } from './types';

export function showMessage(text: string): IShowMessage {
  return {
    type: SHOW_MESSAGE,
    text
  };
}

export function hideMessage(): IHideMessage {
  return {
    type: HIDE_MESSAGE
  };
}
