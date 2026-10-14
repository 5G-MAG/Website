// The agenda of events 5G-MAG participates in, presents at, or is invited to attend -- as opposed to News
// (releases/press). Built from the events' own pages by scripts/build-events-data.js on every dev and build run
// (static/data/events.json), so adding an event means writing its page with an `agenda:` block in the frontmatter
// (see that script for the fields) and nothing else: Home, the hero slideshow and the Events page all read this.
//
// Each entry: { date, endDate, title, type, location, href, flagship?, image }. `flagship` marks the recurring trade
// shows (MWC, IBC, FMT): HeroSlideshow starts showing a flagship event as a homepage slide 45 days ahead, any other
// event 14 days ahead.
import eventsData from '@site/static/data/events.json';

export const EVENTS_AGENDA = eventsData.events;
