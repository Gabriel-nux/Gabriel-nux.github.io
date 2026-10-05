export type SpringConfig = { stiffness: number; damping: number; mass: number };

// ζ = c / (2·√(k·m)). Abaixo de 1 a mola balança, em 1 é crítica, acima disso fica pastosa.
// Cada animação do site escolhe o regime do gesto, e um teste garante que ninguém mexa nisso sem querer.
export function dampingRatio({ stiffness, damping, mass }: SpringConfig): number {
  return damping / (2 * Math.sqrt(stiffness * mass));
}
