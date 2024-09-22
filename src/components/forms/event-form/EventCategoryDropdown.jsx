"use client"
import { getCategories } from '@/lib/actions/category.actions'
import React, { useEffect, useState } from 'react'

const EventCategoryDropdown = ({ field }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getCategories()
            setCategories(res.data);
        }
        fetchCategories()
    }, [])

    return (
        <>
            <select value={field.value} onChange={field.onChange} name="category" className='custom-input-field focus-visible:ring-0'>
                <option value="" className='hidden'>Select a category</option>
                {categories?.length > 0 && categories.map((category) => <option value={category?._id}>{category?.name}</option>)}
            </select>
        </>
    )
}

export default EventCategoryDropdown