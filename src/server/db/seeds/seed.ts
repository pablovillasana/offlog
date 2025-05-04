import { db } from "~/server/db";
import { bikes } from "~/server/db/schema";
import { createReadStream } from "fs";
import path, { join } from "path";
import { parse } from "fast-csv";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";

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
    // Clear the terminal
    console.clear();

    // Show header
    console.log(chalk.bold.blue("\n Offlog Bike Seeder  \n"));

    // Start parsing spinner
    const parsingSpinner = ora({
      text: chalk.yellow("Reading bikes data from CSV..."),
      color: "yellow",
    }).start();

    const records = await parseCSV();

    // Update spinner on success
    parsingSpinner.succeed(
      chalk.green(
        `Successfully parsed ${records.length} bike records from CSV`,
      ),
    );

    // Start seeding spinner
    const seedingSpinner = ora({
      text: chalk.cyan("Seeding database with bike data..."),
      color: "cyan",
    }).start();

    await db.insert(bikes).values(records);

    // Update spinner on success
    seedingSpinner.succeed(
      chalk.green(`Successfully seeded ${records.length} bikes into database`),
    );

    // Final success message
    console.log(
      chalk.bold.green("\n✅ Database seeding completed successfully!\n"),
    );

    process.exit(0);
  } catch (error: unknown) {
    console.log("\n");
    console.error(
      chalk.bold.red("❌ Error seeding bikes:"),
      chalk.red(error instanceof Error ? error.message : String(error)),
    );
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  console.error(
    chalk.bold.red("❌ Unexpected error:"),
    chalk.red(error instanceof Error ? error.message : String(error)),
  );
  process.exit(1);
});

async function parseCSV(): Promise<Bike[]> {
  const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
  const __dirname = path.dirname(__filename);
  const csvFilePath = join(__dirname, "bikes.csv");

  return new Promise((resolve, reject) => {
    const records: Bike[] = [];

    createReadStream(csvFilePath)
      .pipe(parse({ headers: true }))
      .on("data", (row) => {
        records.push(row as Bike);
      })
      .on("error", (error) => {
        reject(error);
      })
      .on("end", () => {
        resolve(records);
      });
  });
}
