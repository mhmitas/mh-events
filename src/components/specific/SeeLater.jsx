/* 
<div className='space-y-1'>
    <FormLabel>Price</FormLabel>
    <div className='flex items-center justify-between border rounded-md h-max'>
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem className="w-full h-max">
                    <FormControl>
                        <div className="flex items-center pl-2 rounded-md m-0">
                            <div><DollarSignIcon /></div>
                            <Input type="number" placeholder="Enter event price" {...field} className="outline-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none border-0 w-full" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="isFree"
            render={({ field }) => (
                <FormItem className="w-max h-max relative">
                    <FormControl>
                        <div className="flex items-center">
                            <Checkbox
                                onCheckedChange={field.onChange}
                                checked={field.value}
                                id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                            <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Free Ticket</label>
                        </div>

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
</div>
*/