type Point = {
  x: number;
  y: number;
};

export type RouteType = {
  type: string;
  points: Point[];
  style: string;
  tip: string;
  color: string;
};
