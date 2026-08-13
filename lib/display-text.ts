const TERMINAL_DISPLAY_PUNCTUATION = /[。！？：；，.!?:;,]+$/u;

/** Removes sentence punctuation from display copy without altering internal punctuation. */
export function displayHeading(value: string) {
  return value.trim().replace(TERMINAL_DISPLAY_PUNCTUATION, "");
}

export function hasTerminalDisplayPunctuation(value: string) {
  return TERMINAL_DISPLAY_PUNCTUATION.test(value.trim());
}
