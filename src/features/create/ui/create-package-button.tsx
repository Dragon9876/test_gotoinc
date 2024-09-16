import { Button } from "@/shared/ui/button"
import { PlusCircle } from "lucide-react"

import { Link, useParams } from "@tanstack/react-router"
import { FC, HTMLAttributes } from "react";

interface CreatePackageButtonProps extends HTMLAttributes<'div'> {}

export const CreatePackageButton: FC<CreatePackageButtonProps> = () => {
    const { userId } = useParams({ strict: false });

    return  <div className="flex justify-end mb-3">
        <Link to={`/${userId}/create`} disabled={!userId}>
            <Button size="lg" className="h-8 gap-1" disabled={!userId}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Package
                </span>
            </Button>
        </Link>
    </div>
}