import { z } from "zod"

export const useOrderValidation = () => {
  const formShema = z.object({
    type_of_parcel: z.string(),
    user_id: z.string(),
    id: z.string().nanoid(),
    from_city: z.string().min(2, {
      message: "City name must be at least 2 characters.",
    }),
    to_city: z.string().min(2, {
        message: "City name must be at least 2 characters.",
    }),
    type_of_package: z.string().optional(),
    date_of_dispatch: z.string().optional(),
    description: z.string().optional(),
  })

  
  return { formShema }
}