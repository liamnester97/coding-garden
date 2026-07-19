import { greet } from "./greeting.js";
import { score } from "./score.js";
import { formatName } from "./format.js";

export function startLesson(name) {
  return `Welcome, ${name}`;
}

export { greet, score, formatName };
