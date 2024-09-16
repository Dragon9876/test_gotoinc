import { z } from "zod"

export const useDeliverValidation = () => {
  const formShema = z.object({
    id: z.string().nanoid(),
    user_id: z.string(),
    type_of_parcel: z.string(),
    from_city: z.string().min(2, {
      message: "City name must be at least 2 characters.",
    }),
    to_city: z.string().min(2, {
        message: "City name must be at least 2 characters.",
    }),
    date_of_dispatch: z.string().optional(),
  })

  
  return { formShema }
}