import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EventSecPagination() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-12">
            <div></div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                    <Button variant="outline">1</Button>
                    <Button variant="default" aria-current="page">2</Button>
                    <Button variant="outline">3</Button>
                    <Button variant="outline">4</Button>
                </div>
                <Button
                    variant="outline"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            {/* <div className="flex items-center space-x-2">
                <Input
                    type="number"
                    placeholder="Page"
                    className="w-20"
                    min={1}
                />
                <Button>Go</Button>
            </div> */}
            <div className="text-sm text-muted-foreground">
                Page 2 of 10
            </div>
        </div>
    )
}