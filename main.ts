import "@std/dotenv/load";
import { extractFromDirectory } from "./extractor.ts";

const inputDir = "./input";
const outputDir = "./output";

async function main(): Promise<void> {
  try {
    console.log("📄 Document Extraction Pipeline Starting...");
    console.log(`   Input: ${inputDir}`);
    console.log(`   Output: ${outputDir}`);

    await Deno.mkdir(inputDir, { recursive: true });

    await extractFromDirectory(inputDir, outputDir);

    console.log("\n🎉 Document extraction pipeline completed!");
  } catch (error) {
    console.error(`💥 Pipeline failed: ${error.message}`);
    Deno.exit(1);
  }
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  await main();
}
