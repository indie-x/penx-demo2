'use client'

import { CreateSpaceForm } from '@/components/CreateSpaceDialog/CreateSpaceForm'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export default function Page() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-50  overflow-auto">
      <div className="container p-4">
        <div className="w-[600px] mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <Button size="icon" variant="secondary">
              <ChevronLeft></ChevronLeft>
            </Button>
            <div className="font-semibold">Create Space</div>
          </div>
          <CreateSpaceForm />
        </div>
      </div>
    </div>
  )
}
