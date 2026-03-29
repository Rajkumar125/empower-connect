import fs from "fs/promises";

const FILE_PATH = "./retries.json";

// Read existing retries
export const readRetries = async () => {
  try {
    const data = await fs.readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Write retries
export const writeRetries = async (data) => {
  await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
};

// Add new retry
export const addRetry = async (entry) => {
  const retries = await readRetries();
  retries.push(entry);
  await writeRetries(retries);
};