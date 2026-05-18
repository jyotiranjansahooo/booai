import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export async function parsePDFFile(file: File | undefined) {
  return {
    cover: "https://via.placeholder.com/300x420.png?text=Book+Cover",
    content: file ? ["Dummy PDF content"] : [],
  };
}
