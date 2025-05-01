import type { Condition } from "@/types/filter-types"

// Helper function to generate unique IDs
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9)
}

// Generate a default condition
export function generateDefaultCondition(): Condition {
    return {
        id: generateId(),
        fieldId: "name", // Changed from "call_type" to "name"
        operatorId: "equals",
        value: "External",
    }
}

// Count total conditions across all groups
export function countTotalConditions(groups: { conditions: any[] }[]): number {
    return groups.reduce((acc, group) => acc + group.conditions.length, 0)
}
