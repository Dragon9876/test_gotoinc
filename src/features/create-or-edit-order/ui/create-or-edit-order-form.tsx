import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Input } from "@/shared/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { useForm } from "react-hook-form"
import { Form, FormField, FormDescription, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/shared/ui/popover";
import { cn } from "@/shared/utils/merge";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useStore } from "@/app/store";
import { Request } from "@/shared/types/requests";
import { FC, HTMLAttributes } from "react";
import { useOrderValidation } from "@/features";
import { z } from "zod"
import { nanoid } from 'nanoid'
import { formatDate } from "@/shared/utils/format-date"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocation } from "@tanstack/react-router";

interface CreateOrEditOrderFormProps extends HTMLAttributes<typeof Form> {
    request?: Request
    type?: 'create' | 'edit',
    closeModal?: () => void,
}

export const CreateOrEditOrderForm: FC<CreateOrEditOrderFormProps> = ({ request = {}, type = 'create', closeModal }) => {
    const location = useLocation();

    const typeOfParcel = location.pathname.split('/')[3];

    const { formShema } = useOrderValidation();
    const { userId } = useParams({ strict: false });

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
                name="type_of_package"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type of package</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type of package..." />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Gadgets">Gadgets</SelectItem>
                                    <SelectItem value="Drinks">Drinks</SelectItem>
                                    <SelectItem value="Clothes">Clothes</SelectItem>
                                    <SelectItem value="Medicines">Medicines</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
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
                                                "pl-3 font-normal",
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
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Description..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            
            <Button type="submit">Submit</Button>
        </form>
    </Form>
}