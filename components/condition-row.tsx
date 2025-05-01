"use client"
import { X } from "lucide-react"
import { useFilter } from "@/contexts/filter-context"
import { FieldDropdown } from "@/components/field-dropdown"
import { OperatorDropdown } from "@/components/operator-dropdown"
import { ValueDropdown } from "@/components/value-dropdown"
import type { Condition } from "@/types/filter-types"

interface ConditionRowProps {
    condition: Condition
    groupId: string
    isFirst: boolean
}

export function ConditionRow({ condition, groupId, isFirst }: ConditionRowProps) {
    const { dispatch } = useFilter()

    const handleFieldChange = (fieldId: string) => {
        dispatch({
            type: "UPDATE_CONDITION",
            groupId,
            conditionId: condition.id,
            field: "fieldId",
            value: fieldId,
        })
    }

    const handleOperatorChange = (operatorId: string) => {
        dispatch({
            type: "UPDATE_CONDITION",
            groupId,
            conditionId: condition.id,
            field: "operatorId",
            value: operatorId,
        })
    }

    const handleValueChange = (value: string) => {
        dispatch({
            type: "UPDATE_CONDITION",
            groupId,
            conditionId: condition.id,
            field: "value",
            value,
        })
    }

    const handleRemoveCondition = () => {
        dispatch({
            type: "REMOVE_CONDITION",
            groupId,
            conditionId: condition.id,
        })
    }

    return (
        <>
            {/* Mobile View */}
            <div className="sm:hidden mb-4">
                {/* Where and Delete Button */}
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">Where</div>
                    <button
                        onClick={handleRemoveCondition}
                        className="flex items-center justify-center h-6 w-6 rounded-full bg-white md:bg-red-100 text-red-600 hover:bg-red-200 transition-colors flex-shrink-0"
                        aria-label="Remove condition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Field Dropdown */}
                <div className="mb-2">
                    <FieldDropdown selectedFieldId={condition.fieldId} onChange={handleFieldChange} />
                </div>

                {/* Operator Dropdown */}
                <div className="mb-2">
                    <OperatorDropdown
                        fieldId={condition.fieldId}
                        selectedOperatorId={condition.operatorId}
                        onChange={handleOperatorChange}
                    />
                </div>

                {/* Value Input */}
                <div>
                    <ValueDropdown fieldId={condition.fieldId} value={condition.value} onChange={handleValueChange} />
                </div>
            </div>

            {/* Desktop View */}
            <div className="hidden sm:flex sm:items-center sm:gap-2 mb-2">
                <div className="w-16 text-sm font-medium text-gray-700">{isFirst ? "Where" : "And"}</div>

                <div className="flex-1 grid grid-cols-3 gap-2">
                    {/* Field Dropdown */}
                    <FieldDropdown selectedFieldId={condition.fieldId} onChange={handleFieldChange} />

                    {/* Operator Dropdown */}
                    <OperatorDropdown
                        fieldId={condition.fieldId}
                        selectedOperatorId={condition.operatorId}
                        onChange={handleOperatorChange}
                    />

                    {/* Value Input */}
                    <ValueDropdown fieldId={condition.fieldId} value={condition.value} onChange={handleValueChange} />
                </div>

                {/* Delete Button */}
                <button
                    onClick={handleRemoveCondition}
                    className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    aria-label="Remove condition"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </>
    )
}
