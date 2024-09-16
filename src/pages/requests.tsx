import { CreateOrEditDeliverForm, CreateOrEditOrderForm, MatchedRequestsTable, RequestsTable, CreatePackageButton } from "@/features"
import { FC, HTMLAttributes } from "react"

interface RequestsPageProps extends HTMLAttributes<'div'> {}

export const RequestsPage: FC<RequestsPageProps> = () => {
    return <>
        <CreatePackageButton />
        <RequestsTable 
            renderEditModal={(request, closeModal) => request.type_of_parcel === 'order' 
                ? <CreateOrEditOrderForm closeModal={closeModal} request={request} type="edit" /> 
                : <CreateOrEditDeliverForm closeModal={closeModal} request={request} type="edit" />
            }
            renderMatchedRequestsModal={(request) => <MatchedRequestsTable request={request} />}
        >
        </RequestsTable>
    </>
}