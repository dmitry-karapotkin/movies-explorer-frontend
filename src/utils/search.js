function filterMovies (data, queryText, toggleState) {
  if (data.length > 0) {
    const queryTextLower = queryText.toLowerCase();
      return data.filter((item) => {
        return item.nameRU.toLowerCase().includes(queryTextLower)
              && (toggleState ? item.duration <= 40 : true);
      });
  }
  return [];
}

export default filterMovies;
