import { formatCurrency } from "../functions";


describe("formatCurrency", () => {
  it("should format a positive value correctly", () => {
    const amount = 1234.56;
    const result = formatCurrency(amount);
    expect(result).toBe("R$ 1.234,56");
  });

  it("should format a negative value correctly", () => {
    const amount = -1234.56;
    const result = formatCurrency(amount);
    expect(result).toBe("-R$ 1.234,56");
  });

  it("should format zero correctly", () => {
    const amount = 0;
    const result = formatCurrency(amount);
    expect(result).toBe("R$ 0,00");
  });

  it("should format integer values ​​correctly", () => {
    const amount = 1000;
    const result = formatCurrency(amount);
    expect(result).toBe("R$ 1.000,00");
  });

  it("should format values ​​with many decimal places correctly", () => {
    const amount = 1234.56789;
    const result = formatCurrency(amount);
    expect(result).toBe("R$ 1.234,57");
  });
});
