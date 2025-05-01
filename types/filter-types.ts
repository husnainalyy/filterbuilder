import type { ReactNode } from "react"

// Field types
export type FieldType = "text" | "boolean" | "date" | "select"

export interface Field {
    id: string
    name: string
    type: FieldType
    icon?: ReactNode
}

export interface Operator {
    id: string
    name: string
    applicableTypes: FieldType[]
}

export interface ValueOption {
    id: string
    name: string
}

export interface Condition {
    id: string
    fieldId: string
    operatorId: string
    value: string
}

export interface ConditionGroup {
    id: string
    conditions: Condition[]
}

export interface FilterState {
    groups: ConditionGroup[]
}

// Action types
export type Action =
    | { type: "ADD_GROUP" }
    | { type: "REMOVE_GROUP"; groupId: string }
    | { type: "ADD_CONDITION"; groupId: string }
    | { type: "REMOVE_CONDITION"; groupId: string; conditionId: string }
    | { type: "UPDATE_CONDITION"; groupId: string; conditionId: string; field: string; value: string }
    | { type: "CLEAR_ALL" }
