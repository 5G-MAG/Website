import { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import { EVENTS_AGENDA } from '@site/src/data/eventsAgenda';
import { SLACK_INVITE_URL } from '@site/src/data/socialLinks';
import { splitAgenda } from '@site/src/components/EventsAgenda';
import styles from './styles.module.css';

// One slot per kind of event. A slot shows the nearest upcoming event of that kind and is left out when there is
// none, so the strip only ever shows what is really coming up. The slots are shown soonest first. The data is the events agenda, which is
// built from the events' own pages (scripts/build-events-data.js).
const SLOTS = [
  { type: 'Conference', label: 'Next conference' },
  { type: 'Workshop', label: 'Next workshop or PlugFest' },
  { type: 'Webinar', label: 'Next webinar' },
  { type: 'Public Call', label: 'Next public call' },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "11-14 Sep 2026", "30 Aug - 2 Sep 2026" or "12 Sep 2026". Date-only values, read as UTC so they never drift.
function formatRange(date, endDate) {
  const s = new Date(`${date}T00:00:00Z`);
  const sd = s.getUTCDate();
  const sm = MONTHS[s.getUTCMonth()];
  const sy = s.getUTCFullYear();
  if (!endDate || endDate === date) return `${sd} ${sm} ${sy}`;
  const e = new Date(`${endDate}T00:00:00Z`);
  const ed = e.getUTCDate();
  const em = MONTHS[e.getUTCMonth()];
  const ey = e.getUTCFullYear();
  if (sy === ey && sm === em) return `${sd}-${ed} ${sm} ${sy}`;
  if (sy === ey) return `${sd} ${sm} - ${ed} ${em} ${sy}`;
  return `${sd} ${sm} ${sy} - ${ed} ${em} ${ey}`;
}

function nextBySlot(now) {
  const { upcoming } = splitAgenda(EVENTS_AGENDA, now);
  return SLOTS.map((slot) => ({ slot, event: upcoming.find((e) => e.type === slot.type) }))
    .filter((x) => x.event)
    .sort((a, b) => a.event.date.localeCompare(b.event.date));
}

// A slim strip under the hero: what is coming up next, and a way into the community.
export default function NextUp() {
  // Computed again in the browser, so a page built earlier does not show an event that has since passed.
  const [items, setItems] = useState(() => nextBySlot(new Date()));
  useEffect(() => {
    setItems(nextBySlot(new Date()));
  }, []);

  return (
    <div className={styles.strip} aria-label="What is next">
      <div className={`container ${styles.inner}`}>
        {items.length === 0 && (
          <div className={styles.slot}>
            <span className={styles.label}>Coming up</span>
            <span className={styles.title}>No events announced yet</span>
            <Link to="/events#agenda" className={styles.meta}>
              See the agenda &rarr;
            </Link>
          </div>
        )}
        {items.map(({ slot, event }) => (
          <Link key={slot.type} to={event.href} className={styles.slot}>
            <span className={styles.label}>{slot.label}</span>
            <span className={styles.title}>{event.title}</span>
            <span className={styles.meta}>
              {formatRange(event.date, event.endDate)} · {event.location}
            </span>
          </Link>
        ))}
        <a href={SLACK_INVITE_URL} target="_blank" rel="noopener noreferrer" className={`${styles.slot} ${styles.join}`}>
          <span className={styles.label}>Community</span>
          <span className={styles.title}>Join the developers on Slack</span>
          <span className={styles.meta}>Ask questions, share what you build &rarr;</span>
        </a>
      </div>
    </div>
  );
}
