import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

// Filters docs/home/standards/3gpp-issue-tracking.mdx by project, client-side,
// against the page's own rendered markdown -- not a parallel data file (see
// src/data/specs/issueTrackerProjects.js for why). The page is a flat
// sequence of headings, tables and lists across 8 XCHANGE meetings, three
// different table shapes, and (for the two oldest meetings) no per-issue
// structure at all, so "filterable unit" means different things in
// different places:
//
// - A table row, tagged from its OWN text if that names a spec (the two
//   newest meetings' Labels/Spec columns already do this), else inherited
//   from the nearest preceding spec-named heading.
// - An H3/H4 heading plus everything until the next heading, tagged from the
//   heading's own text when it names a spec (e.g. "### TS 26.512 - ..."),
//   else inherited -- covers the older meetings' per-spec bullet outlines.
// - Anything with no spec anywhere above it (the two narrative-only 2023
//   meetings, and framing sentences like "See Kanban board...") carries no
//   tag and stays visible under every filter: this page cannot know what
//   general commentary is "about", and hiding it would be a guess dressed up
//   as a filter.
//
// A whole table hides itself once every one of its rows is filtered out; a
// whole XCHANGE (`<h2>`) section hides itself the same way once everything
// under it is. Both re-show as soon as the filter no longer excludes them.
function matchGroups(text, groups) {
  const lower = text.toLowerCase();
  return groups.filter((g) => g.match.some((m) => lower.includes(m))).map((g) => g.key);
}

export default function IssueTrackerFilter({ groups, children }) {
  const containerRef = useRef(null);
  const modelRef = useRef({ units: [], sections: [] });
  const [active, setActive] = useState(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const units = [];
    const sections = [];
    let currentTags = [];
    let section = null;

    Array.from(root.children).forEach((node) => {
      const tag = node.tagName;

      if (tag === 'H2') {
        currentTags = [];
        section = { el: node, units: [] };
        sections.push(section);
        return;
      }

      if (tag === 'H3' || tag === 'H4') {
        const own = matchGroups(node.textContent, groups);
        if (own.length) currentTags = own;
        const unit = { el: node, tags: currentTags };
        units.push(unit);
        section?.units.push(unit);
        return;
      }

      if (tag === 'TABLE') {
        const rows = Array.from(node.querySelectorAll('tbody tr')).map((row) => {
          const own = matchGroups(row.textContent, groups);
          const unit = { el: row, tags: own.length ? own : currentTags };
          units.push(unit);
          section?.units.push(unit);
          return unit;
        });
        const tableUnit = { el: node, rows };
        units.push(tableUnit);
        section?.units.push(tableUnit);
        return;
      }

      const unit = { el: node, tags: currentTags };
      units.push(unit);
      section?.units.push(unit);
    });

    modelRef.current = { units, sections };
    // Apply the current filter to the freshly-built model immediately so a
    // remount (e.g. fast refresh) doesn't flash unfiltered content.
    applyFilter(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups]);

  function applyFilter(key) {
    const { units, sections } = modelRef.current;
    units.forEach((u) => {
      if (u.rows) return; // table container handled after its rows below
      const visible = !key || !u.tags.length || u.tags.includes(key);
      u.el.style.display = visible ? '' : 'none';
    });
    units
      .filter((u) => u.rows)
      .forEach((t) => {
        const anyVisible = !key || t.rows.some((r) => r.el.style.display !== 'none');
        t.el.style.display = anyVisible ? '' : 'none';
      });
    sections.forEach((s) => {
      const anyVisible = !key || s.units.some((u) => u.el.style.display !== 'none');
      s.el.style.display = anyVisible ? '' : 'none';
    });
  }

  useEffect(() => {
    applyFilter(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div>
      <div className={styles.bar} role="group" aria-label="Filter issues by project">
        <span className={styles.label}>Filter by project:</span>
        <div className={styles.chips}>
          <button
            type="button"
            className={`${styles.chip} ${active === null ? styles.chipOn : ''}`}
            aria-pressed={active === null}
            onClick={() => setActive(null)}
          >
            All projects
          </button>
          {groups.map((g) => (
            <button
              key={g.key}
              type="button"
              className={`${styles.chip} ${active === g.key ? styles.chipOn : ''}`}
              aria-pressed={active === g.key}
              onClick={() => setActive((cur) => (cur === g.key ? null : g.key))}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      {active && (
        <p className={styles.note}>
          Showing issues, tables and meeting sections that mention {groups.find((g) => g.key === active)?.label}.
          General commentary with no project of its own stays visible under every filter.
        </p>
      )}
      <div ref={containerRef}>{children}</div>
    </div>
  );
}
