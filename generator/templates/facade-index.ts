import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { facadeFolderName } from "../index.js";
import { FacadeList } from "./types.js";

function facadeIndexTS(facadeName: string, versions: number[]): string {
  return `import { GenericFacade } from "../../types";
${versions
  .map(
    (facadeVersion) =>
      `export * as ${facadeName}V${facadeVersion} from "./${facadeName}V${facadeVersion}";`
  )
  .join("\n")}

const ${facadeName}: GenericFacade = { name: "${facadeName}" };
export default ${facadeName};`;
}

export default function generateFacadeIndexTemplate(
  facadesGroupedByName: FacadeList
) {
  Object.keys(facadesGroupedByName).forEach((facadeName) => {
    const generatedFacadeIndex = facadeIndexTS(
      facadeName,
      facadesGroupedByName[facadeName].sort()
    );
    const outputFolder = `api/facades/${facadeFolderName(facadeName)}/`;
    mkdirSync(outputFolder, { recursive: true });
    writeFileSync(join(outputFolder, "index.ts"), generatedFacadeIndex);
  });
}
