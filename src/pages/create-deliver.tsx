import { CreateOrEditDeliverForm } from "@/features"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { FC , HTMLAttributes } from "react"

interface CreateDeliverPageProps extends HTMLAttributes<typeof Card> {}

export const CreateDeliverPage: FC<CreateDeliverPageProps> = () => {
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
            <CreateOrEditDeliverForm />
        </CardContent>
    </Card>
}