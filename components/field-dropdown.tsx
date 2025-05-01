"use client"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { fields } from "@/data/filter-data"
import { useFieldDropdown } from "@/hooks/use-field-dropdown"

interface FieldDropdownProps {
    selectedFieldId: string
    onChange: (fieldId: string) => void
}

export function FieldDropdown({ selectedFieldId, onChange }: FieldDropdownProps) {
    const { isOpen, selectedField, toggleDropdown, handleSelect, ref } = useFieldDropdown(selectedFieldId, onChange)

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={cn(
                    "w-full h-10 px-3 text-sm text-left flex items-center justify-between bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                    isOpen && "ring-2 ring-blue-500 border-transparent",
                )}
            >
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                    {selectedField?.icon}
                    <span className="truncate">{selectedField?.name}</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                )}
            </button>

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {fields.map((field) => (
                        <button
                            key={field.id}
                            type="button"
                            onClick={() => handleSelect(field.id)}
                            className={cn(
                                "w-full px-3 py-3 text-left flex items-center gap-2 hover:bg-gray-100 text-sm",
                                field.id === selectedFieldId && "bg-gray-100",
                            )}
                        >
                            {field.icon}
                            <span className="truncate">{field.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
