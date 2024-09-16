import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/shared/ui/select"
import { useNavigate, useParams } from "@tanstack/react-router"
import { ArrowRightCircle } from "lucide-react"
import { useState, HTMLAttributes, FC } from "react"

interface SelectPackageTypeFormProps extends HTMLAttributes<typeof Card> {}

export const SelectPackageTypeForm: FC<SelectPackageTypeFormProps> = () => {
    const { userId } = useParams({ strict: false });
    const navigate = useNavigate({});
    
    const [packageType, setPackageType] = useState<string>('');

    const goToCreatePackagePage = () => {
        navigate({ to: `/${userId}/create/${packageType}` })
    }

    return <Card>
        <CardHeader>
            <CardTitle>
                Select Type
            </CardTitle>
            <CardDescription>
                Create package by selecting the type
            </CardDescription>
        </CardHeader>

        <CardContent>
            <div className="flex flex-col gap-3">
                <Select onValueChange={(value) => setPackageType(value)}>
                    <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="order">Order</SelectItem>
                        <SelectItem value="deliver">Deliver</SelectItem>
                    </SelectContent>
                </Select>
                <Button size="lg" className="h-8 gap-1" onClick={() => goToCreatePackagePage()}>
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Next
                    </span>
                    <ArrowRightCircle className="h-3.5 w-3.5" />
                </Button>
            </div>
        </CardContent>
    </Card>
}