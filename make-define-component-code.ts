/**
 * Temporary script to migrate from registry.json
 * 
 * !!DELETE THIS BEFORE MERGING!!
 */

import data from './registry.json'
import fs from 'fs';

const titles = new Set();

const categories = new Map<string, string>();

for (const item of data.items) {
    if (titles.has(item.title)) continue;

    titles.add(item.title);

    const firstFile = item.files[0];
    const index = firstFile.path.indexOf(item.title);
    const category = firstFile.path.slice(0, index-1).split('/').pop();

    if (!category) throw new Error(`Category not found for item: ${item.title}`);

    let categoryCode = categories.get(category) ?? '';

    categoryCode += makeCode(item.title, category as never, item.description);

    categories.set(category, categoryCode);
}

export function makeCode(title: string, category: string, description: string) {
  return `defineComponent({
        title: '${title}',
        category: '${category}',
        description:
          "${description}"
    }),`;
}

let code = '[\n'

for (const [category, categoryCode] of categories.entries()) {
  code += `// ${category}
...[${categoryCode}],\n\n`;
}

code += ']'

fs.writeFileSync('code.ts', code);