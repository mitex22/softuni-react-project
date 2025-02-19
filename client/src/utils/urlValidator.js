export const isValidURL = (url) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + 
      "((([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,})|" + 
      "localhost|" + 
      "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})" + 
      "(\\:\\d+)?" + 
      "(\\/[-a-zA-Z0-9@:%._\\+~#=]*)*" + 
      "(\\?[;&a-zA-Z0-9%_\\+.~#?&=]*)?" + 
      "(\\#[-a-zA-Z0-9_]*)?$", 
    "i" 
  );

  return pattern.test(url);
};
