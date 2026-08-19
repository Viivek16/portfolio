import { describe, it, expect } from "vitest";
import { waveLift, easeOut, rackPose } from "../CaseStudies";

describe("waveLift (magnetic hover falloff)", () => {
  it("is 0 when no pointer", () => {
    expect(waveLift(3, null)).toBe(0);
  });
  it("peaks at 1 on the pointed card and decays for neighbours", () => {
    expect(waveLift(6, 6)).toBeCloseTo(1, 5);
    const near = waveLift(7, 6);
    const far = waveLift(9, 6);
    expect(near).toBeGreaterThan(far);
    expect(near).toBeLessThan(1);
    expect(far).toBeGreaterThan(0);
  });
  it("is symmetric around the pointer", () => {
    expect(waveLift(5, 6)).toBeCloseTo(waveLift(7, 6), 6);
  });
});

describe("easeOut", () => {
  it("clamps and hits the endpoints", () => {
    expect(easeOut(-1)).toBe(0);
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
    expect(easeOut(2)).toBe(1);
    expect(easeOut(0.5)).toBeGreaterThan(0.5); // ease-out is front-loaded
  });
});

describe("rackPose", () => {
  it("centre card sits at the origin, edges fan outward", () => {
    const mid = rackPose(6.5, 96).settled; // exact centre index
    expect(mid.x).toBeCloseTo(0, 5);
    const left = rackPose(0, 96).settled;
    const right = rackPose(13, 96).settled;
    expect(left.x).toBeLessThan(0);
    expect(right.x).toBeGreaterThan(0);
    expect(right.z).toBeGreaterThan(left.z); // right advances toward viewer
  });
  it("airborne pose starts higher and further forward than settled", () => {
    const { settled, air } = rackPose(0, 96);
    expect(air.y).toBeLessThan(settled.y); // higher on screen
    expect(air.z).toBeGreaterThan(settled.z); // closer to camera
  });
});
