'use client'
import React, { useState, useTransition } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { deleteEvent } from '@/lib/actions/event.actions'
import { usePathname } from 'next/navigation'

const EventDeleteConfirmation = ({ eventId }) => {
  const [deleteText, setDeleteText] = useState("")
  const [isPending, startTransition] = useTransition()

  const pathname = usePathname()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7"><Trash className='size-5 text-red-500' /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg w-[95%] max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your event
            and remove your data from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='space-y-2'>
          <Label>Type "DELETE" to confirm:</Label>
          <Input onChange={(e) => setDeleteText(e.target.value)} type="text" className="focus-visible:ring-0 bg-muted font-medium" />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={deleteText !== "DELETE"}
            className="bg-red-500 text-white  hover:bg-red-600"
            onClick={() => {
              startTransition(async () => {
                await deleteEvent({ eventId, path: pathname })
              })
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

  )
}

export default EventDeleteConfirmation