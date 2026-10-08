import Link from '@docusaurus/Link';
import { icon } from '@site/src/components/GodeeperCard';
import { ALL_PROJECTS, ALL_REPOS, ICON_CATALOG, STAGE_GROUPS, displayNameOf } from '@site/src/data/baskets';
import styles from '@site/src/pages/tech/index.module.css';

// Extracted from /tech/index.js's own "Where We Stand" chart (2026-09-27)
// so a project's own page can show exactly the same swimlane bar for
// itself, not a second, different-looking "status" widget -- raised
// directly: "avoid creating yet another format... use exactly what's
// already in tech". /tech/index.js now imports ChartRow from here
// instead of keeping its own copy, so the aggregate chart and every
// per-project page render the identical component.

// A basket's own icon, same catalog, for a chart row rather than a
// second hand-drawn copy. Selecting a different catalog key for a
// basket/project changes its icon everywhere that reads from the
// master file.
export function iconForCatalogKey(key) {
  const paths = key && ICON_CATALOG[key];
  if (!paths || !paths.length) return null;
  return icon(
    <>
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </>
  );
}

// What concretely exists for one reached segment, as small text-pill
// bubbles -- Technical Analysis surfaces the real Docs/Specs pages,
// Software the real repo count with a direct link to wherever the code
// lives (Reference Tools or a testbed page); Under Study has no real
// content to point at beyond its SDO tags, so it stays otherwise bare
// rather than inventing something. Gated on the *stage* boolean the
// caller already checked, not on tech_url/standards_url merely existing
// (those are true for every project regardless of stage, so gating on
// them alone would show the same bubbles on every row).
//
// The Software repo count is ALL_REPOS-based (matches ProjectRepoSection
// exactly, wherever this bubble is shown), not reposFor()'s
// basket-rollup-safe count -- reposFor() deliberately excludes
// cross-basket shared repos to avoid double-counting a *basket total*
// (the homepage/tech-chart's own aggregate use of it), a different
// question from "how many repos does this one row's own link lead to".
// Fixed here after finding it live: 5GMS showed 9 in this bubble against
// the 12 its own Reference Tools section shows on the same page.
function bubblesForGroup(project, groupKey) {
  if (groupKey === 'under-study') {
    return (project.sdos || []).map((sdo) => ({ label: sdo, href: null }));
  }
  if (groupKey === 'technical-analysis') {
    const b = [];
    if (project.tech_url) b.push({ label: 'Documentation', href: project.tech_url });
    if (project.standards_url) b.push({ label: 'Specifications', href: project.standards_url });
    return b;
  }
  if (groupKey === 'software') {
    const hosted = ALL_PROJECTS.filter((c) => c.parent === project.name).map(displayNameOf);
    const names = [displayNameOf(project), ...hosted];
    const repoCount = ALL_REPOS.filter((r) => names.includes(r.projectName)).length;
    return [
      { label: `${repoCount} ${repoCount === 1 ? 'repository' : 'repositories'}`, href: project.doc_url || (hosted.length ? project.tech_url : null) },
    ];
  }
  return [];
}

export function ChartRow({ project }) {
  const href = project.tech_url || project.doc_url || project.standards_url;
  const nameNode = href ? (
    <Link to={href} className={styles.chartRowName}>
      {displayNameOf(project)}
    </Link>
  ) : (
    <span className={styles.chartRowName}>{displayNameOf(project)}</span>
  );
  const rowIcon = iconForCatalogKey(project.icon);

  return (
    <div className={styles.chartRow}>
      <div className={styles.chartRowLabel}>
        {rowIcon && <span className={styles.chartRowIcon}>{rowIcon}</span>}
        {nameNode}
      </div>
      <div className={styles.chartTrack}>
        {STAGE_GROUPS.map((g, i) => {
          const reached = g.reached(project.stages);
          const bubbles = reached ? bubblesForGroup(project, g.key) : [];
          const showPoint = reached && i < STAGE_GROUPS.length - 1;
          return (
            <div key={g.key} className={reached ? styles.chartSegmentFilled : styles.chartSegment}>
              {bubbles.length > 0 && (
                <span className={styles.chartBubbleRow}>
                  {bubbles.map((b) =>
                    b.href ? (
                      <Link key={b.label} to={b.href} className={styles.chartBubble}>
                        {b.label}
                      </Link>
                    ) : (
                      <span key={b.label} className={styles.chartBubble}>
                        {b.label}
                      </span>
                    )
                  )}
                </span>
              )}
              {showPoint && <span className={styles.chartSegmentPoint} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
