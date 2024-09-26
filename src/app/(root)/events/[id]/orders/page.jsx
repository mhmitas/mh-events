import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getOrdersByEvent } from '@/lib/actions/order.actions'
import { formatDate } from '@/lib/utils'

const OrdersPage = async ({ params: { id }, searchParams }) => {

    const { data: orders } = await getOrdersByEvent({ eventId: id })

    return (
        <div className='my-container'>
            <h3 className='title-1 my-4'>Orders</h3>
            <h3 className='font-medium mb-4'>{searchParams?.title}</h3>
            <Table>
                <TableCaption>{orders?.length === 0 ?
                    "No ticket order booked" : "A list of your event's ticket orders."
                }</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Booked Date</TableHead>
                        <TableHead>Transaction id</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders?.map(order => (
                        <TableRow className="hover:bg-muted">
                            <TableCell>{order.buyer.name}</TableCell>
                            <TableCell>{order.buyer.email}</TableCell>
                            <TableCell>{formatDate(order?.createdAt, "D MMMM YYYY, h:mm a")}</TableCell>
                            <TableCell>{
                                order.stripeId?.slice(0, 5) + ".." + order.stripeId?.slice(order.stripeId?.length - 5, order.stripeId?.length)
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    )
}

export default OrdersPage