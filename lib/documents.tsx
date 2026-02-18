import { Document } from "@/components/Documents/Table";

export async function getDocuments(): Promise<Document[] | null> {
  try {
    const response = await fetch(`${process.env.BACKEND}api/getDocs`);

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching documents:", error);
    return null;
  }
}
