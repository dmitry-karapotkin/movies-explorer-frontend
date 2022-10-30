Storage.prototype.setObject = function setObject(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function getObject (key) {
  let value = this.getItem(key);
  return value && JSON.parse(value);
}

const initialValueToggle = {
  "savedMoviesListQuery": false,
  "moviesListQuery": false
}

const initialValueText = {
  "savedMoviesListQuery": "",
  "moviesListQuery": ""
}

const valuesList = [
  "toggle",
  "query",
  "moviesList",
  "moviesListQuery",
  "savedMoviesList",
  "savedMoviesListQuery"
];

function screenReducer(_, newWidth) {
  if (newWidth > 768) {
    return { screen: 'desktop', addCards: 4, initGrid: 12 };
  } else if (newWidth > 480) {
    return { screen: 'tablet', addCards: 2, initGrid: 8 };
  } else {
    return { screen: 'mobile', addCards: 2, initGrid: 5 };
  }
};

function initScreenReducer(initWidth) {
  return screenReducer("", initWidth);
};

function initMoviesReducer () {
  let movies = {};
  for (let item of valuesList) {
    if (localStorage.getObject(item)) {
      localStorage.getObject(item);
      movies[item] = localStorage.getObject(item);
    } else {
      switch (item) {
        case "moviesList":
          movies[item] = [];
          localStorage.setObject(item, []);
          break;
        case "toggle":
          movies[item] = initialValueToggle;
          localStorage.setObject(item, initialValueToggle);
          break;
        case "query":
          movies[item] = initialValueText;
          localStorage.setObject(item, initialValueText);
          break;
        case "savedMoviesList":
          movies[item] = [];
          localStorage.setObject(item, []);
          break;
        case "moviesListQuery":
          movies[item] = [];
          localStorage.setObject(item, []);
          break;
        case "savedMoviesListQuery":
          movies[item] = [];
          localStorage.setObject(item, []);
          break;
        default:
          throw new Error(item);
      }
    }
  }
  return movies;
}

function moviesReducer (previousValue, action) {
  const { type, key, id, value } = action;
  switch (type) {
    case "reset":
      for (let item of valuesList) {
        localStorage.removeItem(item);
      //   previousValue[item] = (item.includes("ovies")) ? [] : null;
      }
      return initMoviesReducer();
    case "update":
      if (key.includes("ovies")) {
        previousValue[key] = value;
        localStorage.setObject(key, value);
        return {...previousValue};
      } else {
        const newValue = {
          ...previousValue[key],
          [id] : value
        }
        previousValue[key] = newValue;
        localStorage.setObject(key, newValue);
        return previousValue;
      }
    default:
      throw new Error();
  }
}

export {
  screenReducer,
  initScreenReducer,
  moviesReducer,
  initMoviesReducer,
};
