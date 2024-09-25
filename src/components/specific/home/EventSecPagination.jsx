'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'

export default function EventSecPagination({ totalPages, currentPage }) {
    const pathname = usePathname()
    const router = useRouter();

    function navigateToPage(pageNumber) {
        router.push(`${pathname}?page=${pageNumber}#event_section`)
    }
    // console.log({ currentPage, totalPages })
    // console.log("pages:", [...Array(totalPages).keys()])

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 pt-12">
            <div></div>
            <div className="flex items-center space-x-2">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => navigateToPage(currentPage - 1)}
                    variant="outline"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex space-x-2">
                    {[...Array(totalPages).keys()]?.slice(
                        currentPage == 1 ? 0 : currentPage - 2, currentPage + 1
                    )
                        .map((page) => (
                            <Button
                                onClick={() => navigateToPage(page + 1)}
                                variant={currentPage == page + 1 ? "default" : "outline"}
                                key={page}
                            >{page + 1}
                            </Button>
                        ))
                    }
                </div>
                <Button
                    disabled={totalPages === currentPage}
                    onClick={() => navigateToPage(currentPage + 1)}
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
                Page {currentPage} of {totalPages}
            </div>
        </div>
    )
}