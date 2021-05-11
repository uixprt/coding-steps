export function chunk(array, chunkSize) {
  const firstChunk = [];

  const { chunksList } = array.reduce(
    ({ chunksList, chunk }, item) => {
      if (chunk.length >= chunkSize) {
        const newChunk = [item];

        return {
          chunksList: [...chunksList, newChunk],
          chunk: newChunk,
        };
      }

      chunk.push(item);

      return {
        chunksList,
        chunk,
      };
    },
    { chunksList: [firstChunk], chunk: firstChunk }
  );

  return chunksList;
}
