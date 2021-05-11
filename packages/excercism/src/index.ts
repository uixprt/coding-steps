import marked from "marked";
import fm from "front-matter";
import gigasecond from "./gigasecond/README.md";

export const exercises = [gigasecond].map((readme) =>
  readmeToExerciseInfo(readme)
);

function readmeToExerciseInfo(readme) {
  const info = fm(readme);
  const html = marked(info.body);

  return {
    attributes: info.attributes,
    html,
  };
}
