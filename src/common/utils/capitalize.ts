const capitalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const capitalize = (str: string): string => {
  return str.split(' ').map(capitalizeWord).join(' ');
};
