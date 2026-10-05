export type ApprovalState = "ask" | "approved" | "denied";
export type ApprovalAction = "approve" | "deny" | "reset";

export const APPROVAL_RESET_MS = 5200;

// A demo do "humano no circuito": só dá pra sair do pedido por uma decisão.
// Depois de aprovar ou negar, outro clique não muda nada até o reset.
export function approvalReducer(state: ApprovalState, action: ApprovalAction): ApprovalState {
  switch (action) {
    case "approve":
      return state === "ask" ? "approved" : state;
    case "deny":
      return state === "ask" ? "denied" : state;
    case "reset":
      return "ask";
  }
}
