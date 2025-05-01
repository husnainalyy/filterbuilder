"use client"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getValueOptions } from "@/data/filter-data"
import { useDropdown } from "@/hooks/use-dropdown"
import { cn } from "@/lib/utils"

interface ValueDropdownProps {
    fieldId: string
    value: string
    onChange: (value: string) => void
}

export function ValueDropdown({ fieldId, value, onChange }: ValueDropdownProps) {
    const valueOptions = getValueOptions(fieldId)
    const selectedOption = valueOptions.find((opt) => opt.id === value) || valueOptions[0]

    const { isOpen, toggleDropdown, handleSelect, ref } = useDropdown(value, onChange)

    return (
        <div className="relative flex-1" ref={ref}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={cn(
                    "w-full h-10 px-3 text-sm text-left flex items-center justify-between bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    isOpen && "ring-2 ring-blue-500 border-transparent",
                )}
            >
                <span>{selectedOption.name}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
            </button>

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    {valueOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => handleSelect(option.id)}
                            className={cn(
                                "w-full px-3 py-3 text-left hover:bg-gray-100 text-sm",
                                option.id === value && "bg-gray-100",
                            )}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
