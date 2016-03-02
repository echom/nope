# Notes

## Partial trees

How to append shadow fragments...
Synchronization...

## Data binding

html.h1().at({ class: np.bind(() => somewhere.else) });
html.h2().style((css) { color: np.bind(() => somewhere.else) });

np.bind(fn, mode);              // mode = undefined | 0 | false: binds normal
np.once(); => np.bind(fn, -1);  // binds once when compiled / linked
np.bind(fn, 1);                 // high performance binding (in animation frame)
