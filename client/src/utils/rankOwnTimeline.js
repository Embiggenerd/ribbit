import { ownTimelineRank } from './rankAlgs';

export default blogs =>
  blogs.map(blog => ({
    ...blog,
    ranking: ownTimelineRank(blog.dateSent, blog.userReadingHours, blog.ribs)
  }));
