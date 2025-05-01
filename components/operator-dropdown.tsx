"use client"
import { ChevronDown, ChevronUp } from "lucide-react"
import { getApplicableOperators } from "@/data/filter-data"
import { useDropdown } from "@/hooks/use-dropdown"
import { cn } from "@/lib/utils"

interface OperatorDropdownProps {
    fieldId: string
    selectedOperatorId: string
    onChange: (operatorId: string) => void
}

export function OperatorDropdown({ fieldId, selectedOperatorId, onChange }: OperatorDropdownProps) {
    const applicableOperators = getApplicableOperators(fieldId)
    const selectedOperator = applicableOperators.find((op) => op.id === selectedOperatorId) || applicableOperators[0]

    const { isOpen, toggleDropdown, handleSelect, ref } = useDropdown(selectedOperatorId, onChange)

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
                <span>{selectedOperator.name}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
            </button>

            {isOpen && (
                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                    {applicableOperators.map((operator) => (
                        <button
                            key={operator.id}
                            type="button"
                            onClick={() => handleSelect(operator.id)}
                            className={cn(
                                "w-full px-3 py-3 text-left hover:bg-gray-100 text-sm",
                                operator.id === selectedOperatorId && "bg-gray-100",
                            )}
                        >
                            {operator.name}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
