import { z } from "zod";

export const recipeSchema = z
  .object({
    name: z.string().min(2).max(50),
    file: z.instanceof(File),
  })
  .superRefine((data) => {
    if (!data.file) {
      return { file: "File is required" };
    }
    if (
      ![
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(data.file.type)
    ) {
      return { file: "Invalid file format" };
    }
  });
