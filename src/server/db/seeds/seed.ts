import { db } from "~/server/db";
import { bikes } from "~/server/db/schema";
import { createReadStream } from "fs";
import path, { join } from "path";
import { parse } from "fast-csv";
import { fileURLToPath } from "url";

type Bike = {
  year: string;
  brand: string;
  model: string;
  category: string;
  engineCc: string;
  engineSize: string;
  strokeType: string;
  startType: string;
  fuelSystem: string;
  marketRegions: string;
};

async function main() {
  try {
    console.log("Reading bikes data from CSV...");

    const records = await parseCSV(); 

    console.log("Seeding bikes...");
    console.log(records);
    await db.insert(bikes).values(records);
    console.log("Successfully seeded bikes table");
  } catch (error: unknown) {
    console.error(
      "Error seeding bikes:",
      error instanceof Error ? error.message : String(error),
    );
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

async function parseCSV(): Promise<Bike[]> {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const csvFilePath = join(__dirname, "bikes.csv");

  const records: Bike[] = [];

  createReadStream(csvFilePath)
    .pipe(parse({ headers: true }))
    .on("data", (row) => {
      records.push(row as Bike);
    })
    .on("end", () => {
      return records;
    });
  return records;
}
