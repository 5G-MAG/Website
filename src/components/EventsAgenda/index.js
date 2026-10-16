import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import { googleCalendarUrl, icsDataUrl } from '@site/src/utils/calendar';
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

// Two small links under an upcoming event's card: Google Calendar, and a calendar file for the other calendars.
function CalendarLinks({ event }) {
  const pageUrl = `https://www.5g-mag.com${event.href}`;
  return (
    <div className={styles.calendar}>
      <span>Add to calendar:</span>
      <a href={googleCalendarUrl(event, pageUrl)} target="_blank" rel="noopener noreferrer">
        Google
      </a>
      <a href={icsDataUrl(event, pageUrl)} download={`${event.href.split('/').pop()}.ics`}>
        Apple, Outlook
      </a>
    </div>
  );
}

function EventCard({ event, calendar = false }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const badge = formatDateBadge(event.date, event.endDate);
  const card = (
    <Link to={event.href} className={styles.card}>
      {event.image && (
        <div className={styles.cardImageWrap}>
          <img loading="lazy" src={withBaseUrl(event.image)} alt="" className={styles.cardImage} />
        </div>
      )}
      <div className={styles.cardBody}>
        {/* Date badge sits in the body, next to the type tag, rather than
            overlaid on the cover image -- an overlay collapsed onto some
            banners' own on-image text/logos (found live, 2026-08-27). */}
        <div className={styles.cardMeta}>
          <span className={styles.dateBadge}>
            <span className={styles.dateMonth}>{badge.month}</span>
            <span className={styles.dateDay}>{badge.day}</span>
          </span>
          <span className={styles.typeTag}>{event.type}</span>
        </div>
        <h3 className={styles.cardTitle}>{event.title}</h3>
        <p className={styles.cardLocation}>{event.location}</p>
      </div>
    </Link>
  );
  if (!calendar) return card;
  return (
    <div className={styles.cardWithCalendar}>
      {card}
      <CalendarLinks event={event} />
    </div>
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
        <EventCard key={e.href} event={e} calendar />
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
              <EventCard key={e.href} event={e} calendar />
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
