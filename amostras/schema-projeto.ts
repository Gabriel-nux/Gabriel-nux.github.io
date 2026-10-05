import { z } from "zod";

export const projectImageKeys = ["kuro-nerv", "kuro-saas", "forno-e-codigo"] as const;
export type ProjectImageKey = (typeof projectImageKeys)[number];

// Os projetos do site são dados validados na carga do módulo.
// Se algum campo estiver errado, quem quebra é o build, nunca a tela de quem visita.
export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(20),
  tags: z.array(z.string().min(1)).min(1),
  facts: z.array(z.string().min(1)),
  image: z.enum(projectImageKeys),
  imageAlt: z.string().min(10),
  links: z.array(z.object({ label: z.string().min(1), href: z.url() })).min(1),
});

export type Project = z.infer<typeof projectSchema>;
