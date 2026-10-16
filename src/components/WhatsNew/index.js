import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import releasesData from '@site/static/data/releases.json';
import newsData from '@site/static/data/news.json';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { splitAgenda } from '@site/src/components/EventsAgenda';
import { daysSince, formatAge } from '@site/src/utils/releases';
import styles from './styles.module.css';

// What is new, in three short lists built from data the site already collects: the latest releases of the tools,
// the next event, and the latest news. Computed again in the browser so a page built earlier is not out of date.
function compute(now) {
  const releases = releasesData.projects
    .flatMap((p) => (p.releases || []).map((r) => ({ ...r, project: p.name })))
    .filter((r) => r.tag !== 'No Release' && r.date && r.date !== '-')
    .sort((a, b) => b.date.localeCompare(a.date))
    // a repository shared by several projects appears once per project in the data
    .filter((r, i, all) => all.findIndex((x) => x.repo === r.repo && x.tag === r.tag) === i)
    .slice(0, 5);
  const next = splitAgenda(EVENTS_AGENDA, now).upcoming[0] || null;
  const news = (newsData.posts || []).slice(0, 2);
  return { releases, next, news };
}

export default function WhatsNew() {
  const [data, setData] = useState(() => compute(new Date()));
  useEffect(() => {
    setData(compute(new Date()));
  }, []);
  const { releases, next, news } = data;
  return (
    <div className={styles.grid}>
      <div className={styles.col}>
        <h3>Latest releases</h3>
        <ul>
          {releases.map((r) => (
            <li key={`${r.repo}-${r.tag}`}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">
                {r.repo}
              </a>
              <span>
                {r.tag.replace(`${r.repo}-`, '')}, {formatAge(daysSince(r.date))}
              </span>
            </li>
          ))}
        </ul>
        <Link to="/community/activity">All community activity →</Link>
      </div>
      <div className={styles.col}>
        <h3>Next event</h3>
        {next ? (
          <ul>
            <li>
              <Link to={next.href}>{next.title}</Link>
              <span>
                {next.date}
                {next.endDate && next.endDate !== next.date ? ` to ${next.endDate}` : ''}, {next.location}
              </span>
            </li>
          </ul>
        ) : (
          <p>No event is announced yet.</p>
        )}
        <Link to="/events#agenda">The agenda →</Link>
      </div>
      <div className={styles.col}>
        <h3>Latest news</h3>
        <ul>
          {news.map((n) => (
            <li key={n.slug}>
              <Link to={`/news/${n.slug}`}>{n.title}</Link>
              <span>{n.date}</span>
            </li>
          ))}
        </ul>
        <Link to="/news">All news →</Link>
      </div>
    </div>
  );
}
