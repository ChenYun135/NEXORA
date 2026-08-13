export type ResearchExportMetadata = {
  figureId: string;
  dataSnapshot: string;
  generatedDate: string;
  sources: string[];
  variableDefinitions: Record<string, string>;
  modelVersion: string;
};

export const publicationFigureTheme = {
  background: "#ffffff",
  foreground: "#172033",
  muted: "#687386",
  grid: "#d8dee8",
  palette: ["#0072B2", "#009E73", "#CC79A7", "#E69F00", "#56B4E9", "#D55E00"],
  fontFamily: "Arial, Helvetica, sans-serif",
} as const;

type Cell = string | number | boolean | null | undefined;

function escapeCsv(value: Cell) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function metadataLines(metadata: ResearchExportMetadata) {
  return [
    ["figure_id", metadata.figureId],
    ["data_snapshot", metadata.dataSnapshot],
    ["generated_date", metadata.generatedDate],
    ["sources", [...metadata.sources].sort().join(" | ")],
    ["model_version", metadata.modelVersion],
    ...Object.entries(metadata.variableDefinitions).sort(([a], [b]) => a.localeCompare(b)).map(([key, value]) => [`variable.${key}`, value]),
  ];
}

/** Produces stable CSV: callers provide the date; keys and metadata are canonically ordered. */
export function researchRowsToCsv(rows: ReadonlyArray<Record<string, Cell>>, metadata: ResearchExportMetadata) {
  const columns = [...new Set(rows.flatMap(row => Object.keys(row)))].sort();
  const meta = metadataLines(metadata).map(([key, value]) => `# ${key}: ${value}`).join("\n");
  const body = [columns.join(","), ...rows.map(row => columns.map(column => escapeCsv(row[column])).join(","))].join("\n");
  return `${meta}\n${body}\n`;
}

export function embedSvgMetadata(svg: string, metadata: ResearchExportMetadata) {
  const payload = JSON.stringify(Object.fromEntries(metadataLines(metadata)));
  const safePayload = payload.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  if (!/<svg(?:\s|>)/u.test(svg)) throw new Error("A valid SVG root is required");
  return svg.replace(/<svg([^>]*)>/u, `<svg$1><metadata data-nexora-export="true">${safePayload}</metadata>`);
}

export function downloadResearchFile(filename: string, content: BlobPart, mimeType: string) {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export async function svgToPngBlob(svg: string, width: number, height: number) {
  const image = new Image();
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to render SVG"));
      image.src = url;
    });
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas is unavailable");
    context.fillStyle = publicationFigureTheme.background;
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);
    return await new Promise<Blob>((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG export failed")), "image/png"));
  } finally {
    URL.revokeObjectURL(url);
  }
}
