#!/usr/bin/env node
// Usage: npm run new-deck -- <slug> "<Topic>" "<Date>"
// Example: npm run new-deck -- week-1 "How coding agents work" "Monday, 19 October 2026"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [slug, topic, date] = process.argv.slice(2);
if (!slug || !topic || !date || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error('Usage: npm run new-deck -- <slug like week-1> "<Topic>" "<Monday, 19 October 2026>"');
  process.exit(1);
}

const label = slug.replace(/^week-(\d+)$/, "Week $1");
const ident = slug.replace(/-(\w)/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, "_$1");
const dir = join("decks", slug);
if (existsSync(dir)) {
  console.error(`decks/${slug} already exists`);
  process.exit(1);
}
mkdirSync(dir, { recursive: true });

writeFileSync(
  join(dir, "index.tsx"),
  `import { ClosingSlide, TitleSlide } from "@/components/templates";
import { defineDeck } from "@/lib/deck";

export default defineDeck({
  slug: ${JSON.stringify(slug)},
  label: ${JSON.stringify(label)},
  topic: ${JSON.stringify(topic)},
  date: ${JSON.stringify(date)},
  slides: [
    {
      title: "Title",
      minutes: 2,
      notes: ["TODO: opening talking points"],
      content: (
        <TitleSlide
          eyebrow="AI in Development · ${label}"
          title={${JSON.stringify(topic)}}
          subtitle="TODO: one-sentence promise for this session"
          date=${JSON.stringify(date)}
        />
      ),
    },
    // TODO: add slides here (see docs/AUTHORING.md for the available templates)
    {
      title: "Discussion",
      minutes: 3,
      notes: ["TODO: closing talking points"],
      content: <ClosingSlide items={["TODO: question for the room"]} />,
    },
  ],
});
`,
);

const idxPath = join("decks", "index.ts");
let idx = readFileSync(idxPath, "utf8");
idx = idx.replace(
  "// <decks:imports>",
  `import ${ident} from "./${slug}";\n// <decks:imports>`,
);
idx = idx.replace("  // <decks:list>", `  ${ident},\n  // <decks:list>`);
writeFileSync(idxPath, idx);

console.log(`Created decks/${slug}/index.tsx and registered it in decks/index.ts`);
console.log(`Open /${slug} after "npm run build && npm start".`);
