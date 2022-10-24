function filterMovies (data, queryText, toggleState) {
  const queryTextLower = queryText.toLowerCase();
  if (data.length > 0) {
      return data.filter((item) => {
        return item.nameRU.toLowerCase().includes(queryTextLower)
              && (toggleState ? item.duration <= 40 : true);
      });
  }
  return [];
}

export default filterMovies;
