export interface Mission {
  title: string
  link: string
  desc: string
  image: string
  markup: string
}
export interface MissionTrackerRes {
  posts: Mission[];
  pages: number;
  page: string;
  results: number;
}
