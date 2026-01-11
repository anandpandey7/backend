import {z} from "zod";
import _default from "zod/v4/locales/ar.cjs";

const marqueeSchema = z.object({
    items: z.array(
        z.string().trim().min(1, "Item cannot be empty")
    ).min(1, "Item array must conatin atleast one item"),
});

export default marqueeSchema;