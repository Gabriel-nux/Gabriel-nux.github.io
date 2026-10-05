import { describe, expect, it } from "vitest";
import { approvalReducer } from "./aprovacao";

describe("approvalReducer", () => {
  it("aprova e nega a partir do pedido", () => {
    expect(approvalReducer("ask", "approve")).toBe("approved");
    expect(approvalReducer("ask", "deny")).toBe("denied");
  });

  it("uma decisão já tomada não muda por outra decisão", () => {
    expect(approvalReducer("approved", "deny")).toBe("approved");
    expect(approvalReducer("denied", "approve")).toBe("denied");
  });

  it("reset volta ao pedido", () => {
    expect(approvalReducer("approved", "reset")).toBe("ask");
    expect(approvalReducer("denied", "reset")).toBe("ask");
  });
});
