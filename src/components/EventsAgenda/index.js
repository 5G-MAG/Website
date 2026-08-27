import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// Parsed as UTC (no local-timezone drift) since these are date-only values.
function parseDate(iso) {
  return new Date(`${iso}T00:00:00Z`);
}

function formatDateBadge(dateStr, endDateStr) {
  const start = parseDate(dateStr);
  const month = MONTH_ABBR[start.getUTCMonth()];
  const day = start.getUTCDate();
  if (!endDateStr) return { month, day: String(day) };
  const end = parseDate(endDateStr);
  if (end.getUTCMonth() === start.getUTCMonth()) {
    return { month, day: `${day}-${end.getUTCDate()}` };
  }
  return { month, day: `${day} ${month}-${end.getUTCDate()} ${MONTH_ABBR[end.getUTCMonth()]}` };
}

function EventCard({ event }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const badge = formatDateBadge(event.date, event.endDate);
  return (
    <Link to={event.href} className={styles.card}>
      {event.image ? (
        <div className={styles.cardImageWrap}>
          <img loading="lazy" src={withBaseUrl(event.image)} alt="" className={styles.cardImage} />
          <div className={styles.dateBadge}>
            <span className={styles.dateMonth}>{badge.month}</span>
            <span className={styles.dateDay}>{badge.day}</span>
          </div>
        </div>
      ) : (
        <div className={clsx(styles.dateBadge, styles.dateBadgeInline)}>
          <span className={styles.dateMonth}>{badge.month}</span>
          <span className={styles.dateDay}>{badge.day}</span>
        </div>
      )}
      <div className={styles.cardBody}>
        <span className={styles.typeTag}>{event.type}</span>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardLocation}>{event.location}</p>
      </div>
    </Link>
  );
}

// `now` is passed in (rather than computed here) so this stays a pure
// function of its props -- callers pass `new Date()` at render time.
export function splitAgenda(events, now) {
  const upcoming = [];
  const past = [];
  for (const e of events) {
    const compareDate = parseDate(e.endDate || e.date);
    if (compareDate.getTime() >= now.getTime()) {
      upcoming.push(e);
    } else {
      past.push(e);
    }
  }
  upcoming.sort((a, b) => a.date.localeCompare(b.date));
  past.sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

// Compact variant for Home: shows only the next few upcoming events, and
// if none are upcoming yet, falls back to the most recent past ones so
// the section still has something to show rather than rendering empty.
export function EventsAgendaPreview({ events, limit = 3 }) {
  const { upcoming, past } = splitAgenda(events, new Date());
  const items = upcoming.length > 0 ? upcoming.slice(0, limit) : past.slice(0, limit);
  return (
    <div className={styles.grid}>
      {items.map((e) => (
        <EventCard key={e.href} event={e} />
      ))}
    </div>
  );
}

// Just the Upcoming group, no wrapping label section -- used on the Events
// page so "Flagship Events" can sit between Upcoming and Past instead of
// both always appearing back to back.
export function UpcomingAgenda({ events }) {
  const { upcoming } = splitAgenda(events, new Date());
  if (upcoming.length === 0) return null;
  return (
    <div className={styles.grid}>
      {upcoming.map((e) => (
        <EventCard key={e.href} event={e} />
      ))}
    </div>
  );
}

// Just the Past group, same reasoning as UpcomingAgenda above.
export function PastAgenda({ events }) {
  const { past } = splitAgenda(events, new Date());
  if (past.length === 0) return null;
  return (
    <div className={styles.grid}>
      {past.map((e) => (
        <EventCard key={e.href} event={e} />
      ))}
    </div>
  );
}

// Full agenda, both groups together with labels -- used on the Home page
// preview's "see full agenda" link target context and anywhere the
// Upcoming/Past split doesn't need another section interleaved.
export default function EventsAgenda({ events }) {
  const { upcoming, past } = splitAgenda(events, new Date());
  return (
    <div>
      {upcoming.length > 0 && (
        <div className={styles.group}>
          <p className={styles.groupLabel}>Upcoming</p>
          <div className={styles.grid}>
            {upcoming.map((e) => (
              <EventCard key={e.href} event={e} />
            ))}
          </div>
        </div>
      )}
      {past.length > 0 && (
        <div className={clsx(styles.group, upcoming.length > 0 && styles.groupSpaced)}>
          <p className={styles.groupLabel}>Past</p>
          <div className={styles.grid}>
            {past.map((e) => (
              <EventCard key={e.href} event={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
