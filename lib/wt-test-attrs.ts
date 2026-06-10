type WtControlOptions = {
  /** Atributo HTML `name` (formulários). */
  nameAttr?: string;
  /** Usar `aria-label` quando não houver texto visível. */
  aria?: boolean;
};

/** Nome legível para steps Gherkin / picker do WavingTest. */
export function wtName(name: string) {
  return { "data-wt-name": name } as const;
}

/**
 * `aria-label` + `data-wt-name`. Use em textos estáticos (h2, p, h3, títulos,
 * células, badges) onde não há `<label>` associado. O WT usa `aria-label` como
 * "label" (prioridade 1) e exibe o texto legível em vez da tag.
 */
export function wtLabel(name: string) {
  return {
    "aria-label": name,
    ...wtName(name),
  } as const;
}

/** Id único + `data-wt-name` + opcional `name` HTML / `aria-label`. */
export function wtControl(
  id: string,
  name: string,
  options?: WtControlOptions
) {
  return {
    id,
    ...wtName(name),
    ...(options?.nameAttr ? { name: options.nameAttr } : {}),
    ...(options?.aria ? { "aria-label": name } : {}),
  } as const;
}

/** Atributos da section/container de um componente no sandbox. */
export function wtSection(component: string, title: string) {
  return {
    id: `wt-${component}-section`,
    "data-wt-component": component,
    ...wtName(`[WT] ${title}`),
  } as const;
}

/** Zona agrupadora (ex.: sandbox alta/média/baixa prioridade). */
export function wtZone(id: string, name: string) {
  return {
    id,
    "data-wt-zone": id.replace(/^wt-/, ""),
    ...wtName(name),
  } as const;
}
