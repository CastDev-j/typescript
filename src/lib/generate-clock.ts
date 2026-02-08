import * as THREE from "three";
import { generateCircle } from "./generate-circle";
import { RotativeLine } from "./generate-rotative-line";
import { getTime } from "./get-time";

interface ClockOptions {
  clockRadius?: number;
  position?: THREE.Vector3;
  clockColor?: THREE.ColorRepresentation;
  hourHandColor?: THREE.ColorRepresentation;
  minuteHandColor?: THREE.ColorRepresentation;
  secondHandColor?: THREE.ColorRepresentation;
}

export class Clock {
  private clockRadius: number;
  private clockColor: THREE.ColorRepresentation;
  private hourHandColor: THREE.ColorRepresentation;
  private minuteHandColor: THREE.ColorRepresentation;
  private secondHandColor: THREE.ColorRepresentation;
  private position: THREE.Vector3;
  public mesh: THREE.Group;

  constructor(options: ClockOptions = {}) {
    this.clockRadius = options.clockRadius ?? 1;
    this.clockColor = options.clockColor ?? "#ffffff";
    this.hourHandColor = options.hourHandColor ?? "#00ff00";
    this.minuteHandColor = options.minuteHandColor ?? "#0000ff";
    this.secondHandColor = options.secondHandColor ?? "#ffff00";
    this.position = options.position ?? new THREE.Vector3(0, 0, 0);

    const circle = generateCircle({
      color: this.clockColor,
      radius: this.clockRadius,
      segments: 360,
    });

    const { hourSegment, minuteSegment, secondSegment } = getTime();

    const hourLine = new RotativeLine(
      this.hourHandColor,
      this.clockRadius * 0.6,
      hourSegment,
    );
    const minuteLine = new RotativeLine(
      this.minuteHandColor,
      this.clockRadius * 0.8,
      minuteSegment,
    );
    const secondLine = new RotativeLine(
      this.secondHandColor,
      this.clockRadius,
      secondSegment,
    );

    this.mesh = new THREE.Group();
    this.mesh.position.copy(this.position);
    this.mesh.add(circle, hourLine.mesh, minuteLine.mesh, secondLine.mesh);

    setInterval(() => {
      const { hourSegment, minuteSegment, secondSegment } = getTime();

      hourLine.update(hourSegment);
      minuteLine.update(minuteSegment);
      secondLine.update(secondSegment);
    }, 1000);
  }
}
