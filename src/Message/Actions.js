export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const HIDE_MESSAGE = 'HIDE_MESSAGE';

export function showMessage(text) {
  return {
    type: SHOW_MESSAGE,
    text
  };
}

export function hideMessage() {
  return {
    type: HIDE_MESSAGE
  };
}
