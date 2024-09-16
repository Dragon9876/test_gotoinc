import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { useForm } from "react-hook-form"
import { Form, FormField, FormDescription, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { cn } from "@/shared/utils/merge";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useStore } from "@/app/store";
import { Request } from "@/shared/types/requests";
import { FC } from "react";
import { useDeliverValidation } from "@/features";
import { z } from "zod"
import { nanoid } from 'nanoid'
import { DialogTrigger } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation } from "@tanstack/react-router";
import { formatDate } from "@/shared/utils/format-date"
import { useState, HTMLAttributes } from "react";


interface CreateOrEditOrderFormProps extends HTMLAttributes<typeof Form> {
    request?: Request
    type?: 'create' | 'edit',
    closeModal?: () => void,
}

export const CreateOrEditDeliverForm: FC<CreateOrEditOrderFormProps> = ({ request = {}, type = 'create', closeModal }) => {
    const { formShema } = useDeliverValidation();
    const { userId } = useParams({ strict: false });
    const location = useLocation();

    const typeOfParcel = location.pathname.split('/')[3];

    const form = useForm<z.infer<typeof formShema>>({
        resolver: zodResolver(formShema),
        defaultValues: {
            ...request,
            id: type === 'create' ? nanoid() : request.id,
            user_id: type === 'create' ? userId : request.user_id,
            type_of_parcel: type === 'create' ? typeOfParcel : request.type_of_parcel,
        }
    });

    const { toast } = useToast()
    const { addPackage, editPackage } = useStore();
    const navigate = useNavigate();

    const onSubmit = async (value: z.infer<typeof formShema>) => {
        const actions = {
            'create': async () => {
                await onCreate(value)
            },
            'edit': async () => {
                await onEdit(value)
            }
        }

        await actions[type]();

        if(closeModal) closeModal();
    }

    const onCreate = async (value: z.infer<typeof formShema>) => {
        await addPackage({
            ...value,   
        });

        await toast({
            title: "New package created",
        })

        navigate({
            to: `/${userId}/requests`,
        })
    }

    const onEdit = async (value: z.infer<typeof formShema>) => {
        await editPackage({
            ...value,
        });

        await toast({
            title: "Package edited",
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
            <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Auto-generated id</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter city..." disabled={true} {...field} />
                        </FormControl>
                        <FormDescription>
                            The city from which the parcel is sent.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <FormField
                control={form.control}
                name="from_city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sent from city</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter city..." {...field} />
                        </FormControl>
                        <FormDescription>
                            The city from which the parcel is sent.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="to_city"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Sent to city</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter city..." {...field} />
                        </FormControl>
                        <FormDescription>
                            The city to which the parcel is sent.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="date_of_dispatch"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Date of dispatch</FormLabel>
                        <FormControl>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                        )}>
                                            {field.value ? (
                                                formatDate(field.value)
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(field.value!)}
                                        onSelect={(value) => field.onChange(formatDate(value))}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
           <Button type="submit">Submit</Button>
        </form>
    </Form>
}