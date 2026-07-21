// Groups an array into rows so a wrapped list can be forced to break at
// specific points instead of wrapping wherever the container width allows.
// `sizes` is either a single fixed row length, or an explicit list of row
// lengths (e.g. [3, 4, 3]) for an intentionally uneven layout; any items
// left over past the last given size fall back to that last size.
export function chunk(items, sizes) {
  const pattern = Array.isArray(sizes) ? sizes : [sizes];
  const rows = [];
  let i = 0;
  let p = 0;
  while (i < items.length) {
    const size = pattern[Math.min(p, pattern.length - 1)];
    rows.push(items.slice(i, i + size));
    i += size;
    p += 1;
  }
  return rows;
}
