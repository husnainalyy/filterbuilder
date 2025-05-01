"use client"
import { Plus } from "lucide-react"
import { useFilter } from "@/contexts/filter-context"
import { ConditionRow } from "@/components/condition-row"
import type { ConditionGroup as ConditionGroupType } from "@/types/filter-types"

interface ConditionGroupProps {
    group: ConditionGroupType
    groupIndex: number
}

export function ConditionGroup({ group, groupIndex }: ConditionGroupProps) {
    const { dispatch } = useFilter()

    const handleAddCondition = () => {
        dispatch({ type: "ADD_CONDITION", groupId: group.id })
    }

    return (
        <div className="mb-4 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            {group.conditions.map((condition, conditionIndex) => (
                <ConditionRow key={condition.id} condition={condition} groupId={group.id} isFirst={conditionIndex === 0} />
            ))}

            <div className="mt-2">
                <button
                    onClick={handleAddCondition}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Add Condition
                </button>
            </div>
        </div>
    )
}
