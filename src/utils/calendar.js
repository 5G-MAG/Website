// Add-to-calendar links for an agenda event (date-only values, so the event is an all-day entry).
// `date` and `endDate` are "YYYY-MM-DD"; the end date is the last day of the event and is included.

const compact = (iso) => iso.replace(/-/g, '');

// The day after an ISO date, as "YYYYMMDD". Calendars treat the end of an all-day entry as exclusive.
function dayAfter(iso) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

export function googleCalendarUrl({ title, date, endDate, location }, pageUrl) {
  const end = dayAfter(endDate || date);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${compact(date)}/${end}`,
    location: location || '',
    details: pageUrl ? `More information: ${pageUrl}` : '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// A calendar file (.ics) as a data address, for Apple, Outlook and other calendars.
export function icsDataUrl({ title, date, endDate, location }, pageUrl) {
  const esc = (t) => String(t || '').replace(/([,;\\])/g, '\\$1').replace(/\r?\n/g, '\\n');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//5G-MAG//Events//EN',
    'BEGIN:VEVENT',
    `UID:${compact(date)}-${esc(title).replace(/[^A-Za-z0-9]/g, '').slice(0, 40)}@5g-mag.com`,
    `DTSTAMP:${compact(date)}T000000Z`,
    `DTSTART;VALUE=DATE:${compact(date)}`,
    `DTEND;VALUE=DATE:${dayAfter(endDate || date)}`,
    `SUMMARY:${esc(title)}`,
    location ? `LOCATION:${esc(location)}` : null,
    pageUrl ? `URL:${pageUrl}` : null,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join('\r\n'))}`;
}
