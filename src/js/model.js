export const state = {
  result: {},
};

export const getWord = async function (word) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (!res.ok) throw new Error('Word is not English ');
    const data = await res.json();

    state.result = data[0];
  } catch (error) {
    throw error;
  }
};
