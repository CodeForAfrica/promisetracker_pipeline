import { AxApacheTika } from "@ax-llm/ax";
import { basename, extname, join } from "@std/path";
import { exists } from "@std/fs";

const tika = new AxApacheTika();

export function cleanText(text: string): string {
  return text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export async function extractTextFromDoc(filePath: string): Promise<string[]> {
  try {
    const fileData = await Deno.readFile(filePath);
    const text = await tika.convert([fileData], {
      format: "text",
    });
    return text.map((t) => cleanText(t));
  } catch (error) {
    throw new Error(
      `Failed to extract text from ${filePath}: ${error.message}`,
    );
  }
}

export function getOutputFilePath(
  inputFile: string,
  outputDir: string,
): string {
  const fileName = basename(inputFile, extname(inputFile));
  return join(outputDir, `${fileName}.txt`);
}

export async function isAlreadyExtracted(outputPath: string): Promise<boolean> {
  return await exists(outputPath);
}

export async function extractFromDirectory(
  inputDir: string,
  outputDir: string,
): Promise<void> {
  await Deno.mkdir(outputDir, { recursive: true });

  const entries = Deno.readDir(inputDir);

  for await (const entry of entries) {
    if (entry.isFile) {
      const inputFilePath = join(inputDir, entry.name);
      const outputPath = getOutputFilePath(inputFilePath, outputDir);

      if (await isAlreadyExtracted(outputPath)) {
        console.log(`⏭️  Skipping ${entry.name} (already extracted)`);
        continue;
      }

      try {
        console.log(`📄 Extracting ${entry.name}...`);
        const extractedText = await extractTextFromDoc(inputFilePath);

        await Deno.writeTextFile(outputPath, extractedText.join("\n"));
        console.log(`✅ Extracted ${entry.name} → ${basename(outputPath)}`);
      } catch (error) {
        console.error(`❌ Failed to extract ${entry.name}: ${error.message}`);
      }
    }
  }
}
