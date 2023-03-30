import path from "path";
import { promises as fs } from "fs";
import { MARKDOWN_FILE_NAME_REGEX } from "./constants";

export function getPostDirectory() {
  return path.join(process.cwd(), "__posts");
}

export function getPostContent(fileName: string) {
  const filePath = path.join(process.cwd(), "__posts", fileName);
  return fs.readFile(filePath, "utf8");
}

export async function getPostFileNameList() {
  const fileNames = await fs.readdir(getPostDirectory());

  return fileNames.filter((fileName) =>
    MARKDOWN_FILE_NAME_REGEX.test(fileName)
  );
}
