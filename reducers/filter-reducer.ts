import type { FilterState, Action } from "@/types/filter-types"
import { generateId, generateDefaultCondition } from "@/utils/filter-utils"

// Reducer function
export function filterReducer(state: FilterState, action: Action): FilterState {
    switch (action.type) {
        case "ADD_GROUP":
            return {
                ...state,
                groups: [
                    ...state.groups,
                    {
                        id: generateId(),
                        conditions: [generateDefaultCondition()],
                    },
                ],
            }
        case "REMOVE_GROUP":
            return {
                ...state,
                groups: state.groups.filter((group) => group.id !== action.groupId),
            }
        case "ADD_CONDITION":
            return {
                ...state,
                groups: state.groups.map((group) => {
                    if (group.id === action.groupId) {
                        return {
                            ...group,
                            conditions: [...group.conditions, generateDefaultCondition()],
                        }
                    }
                    return group
                }),
            }
        case "REMOVE_CONDITION":
            return {
                ...state,
                groups: state.groups
                    .map((group) => {
                        if (group.id === action.groupId) {
                            // If it's the last condition in the group, remove the entire group
                            if (group.conditions.length === 1) {
                                return { ...group, conditions: [] } // Mark for removal
                            }
                            return {
                                ...group,
                                conditions: group.conditions.filter((condition) => condition.id !== action.conditionId),
                            }
                        }
                        return group
                    })
                    .filter((group) => group.conditions.length > 0), // Remove groups with no conditions
            }
        case "UPDATE_CONDITION":
            return {
                ...state,
                groups: state.groups.map((group) => {
                    if (group.id === action.groupId) {
                        return {
                            ...group,
                            conditions: group.conditions.map((condition) => {
                                if (condition.id === action.conditionId) {
                                    return {
                                        ...condition,
                                        [action.field]: action.value,
                                    }
                                }
                                return condition
                            }),
                        }
                    }
                    return group
                }),
            }
        case "CLEAR_ALL":
            return {
                groups: [],
            }
        default:
            return state
    }
}
