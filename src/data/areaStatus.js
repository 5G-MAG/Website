// The two tags of the solution pages. A topic is Available when its showcase is available in the Reference Tools today;
// every other topic (a showcase still in incubation, or a topic without a showcase) is in Incubation.
import { SHOWCASE_BASKETS } from './showcases';

export const topicTag = (topic) => (topic.showcase?.status === 'available' ? 'available' : 'incubation');

// The topics of one solution area by tag, and whether the area has its topics written yet.
export function areaTopics(basketKey) {
  const content = Object.values(SHOWCASE_BASKETS).find((c) => c.basket === basketKey);
  const topics = content?.topics || [];
  return {
    written: topics.length > 0,
    available: topics.filter((t) => topicTag(t) === 'available'),
    incubation: topics.filter((t) => topicTag(t) === 'incubation'),
  };
}
