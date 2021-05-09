import React from 'react';
import fm from 'front-matter';
import {exercises} from '@proftit/exercism';

export function Tracks(){
  return <ul>
    {exercises.map(exercise => ExerciseBlock(exercise))}
  </ul>;
}

function ExerciseBlock(exercise) {
  return <li key={exercise.attributes.title}><div dangerouslySetInnerHTML={{ __html: exercise.html }} /></li>;
}
