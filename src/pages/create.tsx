import { SelectPackageTypeForm } from "@/features"
import { FC, HTMLAttributes } from "react"

interface CreateOrderPageProps extends HTMLAttributes<'div'> {}

export const CreatePage: FC<CreateOrderPageProps> = () => { 
    return <div>
        <SelectPackageTypeForm />
    </div>
}