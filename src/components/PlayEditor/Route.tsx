import { Line, Arrow, Group, Circle, Shape, Rect } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { usePlayEditorStore } from "@/store/playEditor";

type RouteProps = {
  id: number;
};

type Point = {
  x: number;
  y: number;
};

const Route = ({ id }: RouteProps) => {
  const routes = usePlayEditorStore((state) => state.routes);
  const selectedPlayer = usePlayEditorStore((state) => state.selectedPlayer);
  const updatePlayerRoute = usePlayEditorStore(
    (state) => state.updatePlayerRoute
  );

  const handleRouteDrag = (index: number, e: KonvaEventObject<DragEvent>) => {
    const updatedRoute = { ...routes[id] };

    if (updatedRoute.points) {
      updatedRoute.points[index] = { x: e.target.x(), y: e.target.y() };
      updatePlayerRoute(id, updatedRoute);
    }
  };

  const calculateRotation = (p1: Point, p2: Point) => {
    return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
  };

  return (
    <Group>
      {id in routes &&
        (routes[id].type === "straight" ? (
          <Line
            points={routes[id].points.flatMap((point) => [point.x, point.y])}
            stroke={routes[id].color}
            tension={routes[id].type === "curve" ? 0.5 : 0}
            strokeWidth={2}
            dash={
              routes[id].style === "dashed"
                ? [10, 5] // Customize the array based on your desired dash pattern
                : routes[id].style === "jagged"
                ? [5, 5, 0, 5] // Zig-zag pattern, customize as needed
                : undefined // No dash for solid style
            }
          />
        ) : (
          <Shape
            dash={
              routes[id].style === "dashed"
                ? [15, 10] // Customize the array based on your desired dash pattern
                : routes[id].style === "jagged"
                ? [5, 5, 0, 5] // Zig-zag pattern, customize as needed
                : undefined // No dash for solid style
            }
            stroke={routes[id].color}
            strokeWidth={2}
            sceneFunc={(ctx, shape) => {
              const { points } = routes[id];

              ctx.beginPath();

              // Move to the starting point
              ctx.moveTo(points[0].x, points[0].y);

              if (points.length === 3) {
                const anchor = points[1];
                const end = points[2];

                // Draw a quadratic Bezier curve
                ctx.quadraticCurveTo(anchor.x, anchor.y, end.x, end.y);
              } else if (points.length === 4) {
                const control1 = points[1];
                const control2 = points[2];
                const end = points[3];

                ctx.bezierCurveTo(
                  control1.x,
                  control1.y,
                  control2.x,
                  control2.y,
                  end.x,
                  end.y
                );
              } else {
                return;
              }

              ctx.stroke();
              ctx.fillStrokeShape(shape);
            }}
          />
        ))}

      {id in routes &&
        selectedPlayer === id &&
        routes[id].type === "curve" &&
        routes[id].points.map((point, index) => (
          <Line
            key={index}
            dash={[10, 10, 0, 10]}
            strokeWidth={3}
            stroke="black"
            lineCap="round"
            opacity={0.3}
            points={[
              routes[id].points[index - 1]?.x ?? point.x,
              routes[id].points[index - 1]?.y ?? point.y,
              point.x,
              point.y,
            ]}
          />
        ))}

      {id in routes &&
        (routes[id].tip === "arrow" ? (
          <Arrow
            points={
              routes[id].points && routes[id].points.length >= 2
                ? [
                    routes[id].points[routes[id].points.length - 2].x,
                    routes[id].points[routes[id].points.length - 2].y,
                    routes[id].points[routes[id].points.length - 1].x,
                    routes[id].points[routes[id].points.length - 1].y,
                  ]
                : []
            }
            pointerLength={10}
            pointerWidth={10}
            fill={routes[id].color}
          />
        ) : routes[id].tip === "round" ? (
          <Circle
            x={routes[id].points[routes[id].points.length - 1].x}
            y={routes[id].points[routes[id].points.length - 1].y}
            radius={5}
            fill={routes[id].color}
          />
        ) : (
          <Rect
            x={
              routes[id].points[routes[id].points.length - 1].x -
              1 +
              10 *
                Math.sin(
                  (Math.PI / 180) *
                    calculateRotation(
                      routes[id].points[routes[id].points.length - 2],
                      routes[id].points[routes[id].points.length - 1]
                    )
                )
            }
            y={
              routes[id].points[routes[id].points.length - 1].y -
              10 *
                Math.cos(
                  (Math.PI / 180) *
                    calculateRotation(
                      routes[id].points[routes[id].points.length - 2],
                      routes[id].points[routes[id].points.length - 1]
                    )
                )
            }
            width={2}
            height={20}
            fill={routes[id].color}
            rotation={
              routes[id].points.length >= 2
                ? calculateRotation(
                    routes[id].points[routes[id].points.length - 2],
                    routes[id].points[routes[id].points.length - 1]
                  )
                : 0
            }
          />
        ))}
      {id in routes &&
        selectedPlayer === id &&
        routes[id].points.map((point, index) => (
          <Circle
            key={index}
            x={point.x}
            y={point.y}
            radius={10}
            stroke={"black"}
            strokeWidth={2}
            fill="black"
            opacity={0.5}
            draggable
            onDragMove={(event) => handleRouteDrag(index, event)}
          />
        ))}
    </Group>
  );
};
export default Route;
