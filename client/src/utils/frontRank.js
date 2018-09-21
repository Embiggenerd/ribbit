/**
 * Normalized ranking by ribs acts as a multiplier to old ranking.
 * Allows user's timeline to be sorted per rib without making backend calls
 */

export default lst => {
  console.log('old timeline', lst);
  const sortedByRibs = lst.sort((a, b) => b.ribs - a.ribs);
  console.log('sorted by ribs', sortedByRibs);

  for (let i = 0; i < lst.length; i++) {
    sortedByRibs[i].ranking = sortedByRibs[i].ranking * ((i + 1) / lst.length);
  }
  console.log('rankings updated', sortedByRibs);

  return sortedByRibs;
};
