import { describe, it, expect } from "vitest";
import { stepFor, countFor, buildDeck, easeOut, rackPose, nearestIndex } from "../CaseStudies";

describe("stepFor / countFor (edge-to-edge fill)", () => {
  it("clamps the step and grows the count with width", () => {
    expect(stepFor(320)).toBe(96); // small screens hit the floor
    expect(stepFor(4000)).toBe(140); // ultrawide hits the ceiling
    expect(countFor(1920)).toBeGreaterThan(countFor(1280));
  });
  it("over-provisions past the viewport so there are no side margins", () => {
    const vw = 1440;
    expect(countFor(vw) * stepFor(vw)).toBeGreaterThan(vw); // total span exceeds width
  });
});

describe("buildDeck", () => {
  it("fills to the requested length and every card links to a real study", () => {
    const d = buildDeck(20);
    expect(d).toHaveLength(20);
    d.forEach((c) => expect(c.study.url).toMatch(/^https?:\/\//));
  });
  it("cycles the seven studies with no adjacent duplicates", () => {
    const d = buildDeck(14);
    for (let i = 1; i < d.length; i++) {
      expect(d[i].study.n).not.toBe(d[i - 1].study.n);
    }
  });
});

describe("easeOut", () => {
  it("clamps and hits the endpoints, front-loaded", () => {
    expect(easeOut(-1)).toBe(0);
    expect(easeOut(0)).toBe(0);
    expect(easeOut(1)).toBe(1);
    expect(easeOut(2)).toBe(1);
    expect(easeOut(0.5)).toBeGreaterThan(0.5);
  });
});

describe("rackPose", () => {
  it("centres the deck and fans outward", () => {
    const n = 20;
    const mid = rackPose((n - 1) / 2, n, 100).settled;
    expect(mid.x).toBeCloseTo(0, 5);
    expect(rackPose(0, n, 100).settled.x).toBeLessThan(0);
    expect(rackPose(n - 1, n, 100).settled.x).toBeGreaterThan(0);
  });
  it("starts airborne high above and drops in", () => {
    const { settled, air } = rackPose(0, 20, 100);
    expect(air.y).toBeLessThan(settled.y - 500); // well above the shelf
  });
});

describe("nearestIndex (single-card hover mapping)", () => {
  it("picks the nearest card centre to the cursor", () => {
    const centers = [100, 200, 300, 400];
    expect(nearestIndex(centers, 90)).toBe(0);
    expect(nearestIndex(centers, 260)).toBe(2);
    expect(nearestIndex(centers, 999)).toBe(3);
  });
});
