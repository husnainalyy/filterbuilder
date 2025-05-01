"use client"

import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"


export function useDropdown<T>(initialValue: T, onChange: (value: T) => void) {
    const [isOpen, setIsOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => setIsOpen(!isOpen)
    const closeDropdown = () => setIsOpen(false)

    const handleSelect = (value: T) => {
        onChange(value)
        closeDropdown()
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeDropdown()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return {
        isOpen,
        toggleDropdown,
        closeDropdown,
        handleSelect,
        ref,
    }
}
