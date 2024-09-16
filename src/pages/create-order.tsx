import { CreateOrEditOrderForm } from "@/features"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { FC, HTMLAttributes } from "react"

interface CreateOrderPageProps extends HTMLAttributes<typeof Card> {}

export const CreateOrderPage: FC<CreateOrderPageProps> = () => {
    return <Card>
        <CardHeader>
            <CardTitle>
                Create Order Package
            </CardTitle>

            <CardDescription>
                Create Order Package
            </CardDescription>
        </CardHeader>

        <CardContent>
            <CreateOrEditOrderForm />
        </CardContent>
    </Card>
}