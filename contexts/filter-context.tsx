"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { filterReducer } from "@/reducers/filter-reducer"
import type { FilterState, Action } from "@/types/filter-types"

// Initial state
const initialState: FilterState = {
    groups: [
        {
            id: "group1",
            conditions: [
                { id: "condition1", fieldId: "name", operatorId: "equals", value: "External" },
                { id: "condition2", fieldId: "name", operatorId: "equals", value: "External" },
            ],
        },
    ],
}

// Create context
interface FilterContextType {
    state: FilterState
    dispatch: React.Dispatch<Action>
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

// Provider component
export function FilterProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterReducer, initialState)

    return <FilterContext.Provider value={{ state, dispatch }}>{children}</FilterContext.Provider>
}

// Custom hook to use the filter context
export function useFilter() {
    const context = useContext(FilterContext)
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider")
    }
    return context
}
