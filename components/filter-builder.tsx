"use client"
import { Plus } from "lucide-react"
import { FilterProvider, useFilter } from "@/contexts/filter-context"
import { ConditionGroup, ConditionGroup as ConditionGroupComponent } from "@/components/condition-group"
import { countTotalConditions } from "@/utils/filter-utils"

export default function FilterBuilder() {
    return (
        <FilterProvider>
            <FilterBuilderContent />
        </FilterProvider>
    )
}

function FilterBuilderContent() {
    const { state, dispatch } = useFilter()
    const totalConditions = countTotalConditions(state.groups)

    const handleClearAll = () => {
        dispatch({ type: "CLEAR_ALL" })
    }

    const handleAddGroup = () => {
        dispatch({ type: "ADD_GROUP" })
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-800">Applied Filters ({totalConditions})</h2>
                    <button
                        onClick={handleClearAll}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    >
                        Clear All
                    </button>
                </div>

                {state.groups.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No filters applied. Add a condition group to start filtering.</p>
                    </div>
                ) : (
                    state.groups.map((group: any, groupIndex: number) => (
                        <ConditionGroup key={group.id} group={group} groupIndex={groupIndex} />
                    ))
                )}

                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleAddGroup}
                        className="flex items-center gap-1 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="h-4 w-4" />
                        Add Condition Group
                    </button>
                </div>
            </div>
        </div>
    )
}
