import { describe, expect, it } from "vitest";
import { dampingRatio } from "./molas";

describe("dampingRatio", () => {
  it("é 1 no amortecimento crítico (c = 2·√(k·m))", () => {
    expect(dampingRatio({ stiffness: 100, damping: 20, mass: 1 })).toBeCloseTo(1);
  });

  it("é menor que 1 quando a mola balança", () => {
    expect(dampingRatio({ stiffness: 100, damping: 5, mass: 1 })).toBeLessThan(1);
  });

  it("é maior que 1 quando a mola é pastosa", () => {
    expect(dampingRatio({ stiffness: 150, damping: 15, mass: 0.1 })).toBeGreaterThan(1);
  });
});
