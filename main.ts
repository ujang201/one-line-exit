// One-line exit: writes a single funny resignation letter to entry.txt.
// The line is a fixed constant — no randomness, no network, no input.
// Output goes to $OUTPUT_DIR/entry.txt, defaulting to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The resignation letter. One line, 1-140 characters per the bounty gate.
// Voice: the long-suffering office printer technician, finally taking
// the printer's own advice — jam once, then walk away for good.
const LETTER =
  "I resign effective immediately — after three years of fixing the office printer, I finally learned from it: jam once, and walk away.";

function outputDir(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv && fromEnv.trim().length > 0) {
    return resolve(fromEnv);
  }
  return "/output";
}

function main(): void {
  // Gate check, mirroring the bounty scorer: exactly one line of
  // 1-140 characters, not only whitespace. Refuse to write otherwise.
  const chars = [...LETTER];
  if (chars.length < 1 || chars.length > 140) {
    throw new Error(`entry is ${chars.length} characters, must be 1-140`);
  }
  if (LETTER.includes("\n") || LETTER.trim().length === 0) {
    throw new Error("entry must be a single non-blank line");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // No trailing newline: the file must be exactly one line of text.
  writeFileSync(join(dir, "entry.txt"), LETTER, "utf8");
  console.log(`wrote ${LETTER.length} characters to ${join(dir, "entry.txt")}`);
}

main();
