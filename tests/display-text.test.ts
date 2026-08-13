import assert from "node:assert/strict";
import test from "node:test";
import { displayHeading, hasTerminalDisplayPunctuation } from "../lib/display-text.ts";

test("display headings remove only terminal punctuation", () => {
  assert.equal(displayHeading("Map what's emerging."), "Map what's emerging");
  assert.equal(displayHeading("哪些证据值得信任。"), "哪些证据值得信任");
  assert.equal(displayHeading("Research: evidence and limits"), "Research: evidence and limits");
});

test("display punctuation audit recognizes English and Chinese endings", () => {
  assert.equal(hasTerminalDisplayPunctuation("未来产业正在何处形成？"), true);
  assert.equal(hasTerminalDisplayPunctuation("未来产业正在何处形成"), false);
});
