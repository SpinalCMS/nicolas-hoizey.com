let filteredCollectionsMemoization = {};
let now = new Date().getTime();
const getFilteredCollection = (collection, type) => {
  if (type in filteredCollectionsMemoization) {
    return filteredCollectionsMemoization[type];
  } else {
    const pattern = type === 'archives' ? '{articles,links,notes,talks}' : type;
    let filteredCollection = collection
      .getFilteredByGlob(`src/${pattern}/**/*.md`)
      .filter((item) => {
        if (now < item.date.getTime()) console.log(`${item.date.getTime()}`);
        return now >= item.date.getTime();
      })
      .sort((a, b) => b.date - a.date);
    filteredCollectionsMemoization[type] = filteredCollection;

    return filteredCollection;
  }
};

module.exports = getFilteredCollection;
