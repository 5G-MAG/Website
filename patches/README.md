# Patches

## @easyops-cn+docusaurus-search-local+0.55.2.patch

Fixes the search bar stealing focus back to the input after the user has
already blurred it (e.g. clicking a result) while the search index is still
loading. Sets `focusAfterIndexLoaded.current = false` in `onInputBlur` so a
completed index load doesn't re-focus a field the user already left.

Check on upgrade whether this is fixed upstream and the patch can be dropped.
