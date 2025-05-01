"use client"

import type React from "react"

import { useReducer } from "react"
import { Check, ChevronDown, ChevronUp, Hash, Link, Mail, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
type FieldType = "text" | "boolean" | "date" | "select"

interface Field {
  id: string
  name: string
  type: FieldType
  icon?: React.ReactNode
}

interface Operator {
  id: string
  name: string
  applicableTypes: FieldType[]
}

interface Condition {
  id: string
  fieldId: string
  operatorId: string
  value: string
}

interface ConditionGroup {
  id: string
  conditions: Condition[]
}

interface FilterState {
  groups: ConditionGroup[]
}

// Available fields
const fields: Field[] = [
  { id: "call_type", name: "Call Type", type: "select" },
  { id: "name", name: "Name", type: "text", icon: <span className="font-mono">T</span> },
  { id: "company_admin", name: "Company admin", type: "boolean", icon: <Check className="h-4 w-4" /> },
  { id: "last_login_at", name: "Last login at", type: "date", icon: <Hash className="h-4 w-4" /> },
  { id: "pre_call_email", name: "Pre-call email enabled", type: "boolean", icon: <Link className="h-4 w-4" /> },
  { id: "pre_call_slack", name: "Pre-call slack enabled", type: "boolean", icon: <Check className="h-4 w-4" /> },
  { id: "autojoin_external", name: "Autojoin External Meetings", type: "boolean", icon: <Mail className="h-4 w-4" /> },
  { id: "autojoin_internal", name: "Autojoin Internal Meetings", type: "boolean", icon: <Link className="h-4 w-4" /> },
  { id: "bot_name", name: "Bot name", type: "text", icon: <Check className="h-4 w-4" /> },
]

// Available operators
const operators: Operator[] = [
  { id: "equals", name: "Equals", applicableTypes: ["text", "boolean", "date", "select"] },
  { id: "not_equals", name: "Not Equals", applicableTypes: ["text", "boolean", "date", "select"] },
  { id: "contains", name: "Contains", applicableTypes: ["text"] },
  { id: "starts_with", name: "Starts With", applicableTypes: ["text"] },
  { id: "ends_with", name: "Ends With", applicableTypes: ["text"] },
  { id: "greater_than", name: "Greater Than", applicableTypes: ["date"] },
  { id: "less_than", name: "Less Than", applicableTypes: ["date"] },
]

// Action types
type Action =
  | { type: "ADD_GROUP" }
  | { type: "REMOVE_GROUP"; groupId: string }
  | { type: "ADD_CONDITION"; groupId: string }
  | { type: "REMOVE_CONDITION"; groupId: string; conditionId: string }
  | { type: "UPDATE_CONDITION"; groupId: string; conditionId: string; field: string; value: string }
  | { type: "CLEAR_ALL" }

// Reducer function
function filterReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "ADD_GROUP":
      return {
        ...state,
        groups: [
          ...state.groups,
          {
            id: generateId(),
            conditions: [{ id: generateId(), fieldId: "call_type", operatorId: "equals", value: "External" }],
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
              conditions: [
                ...group.conditions,
                { id: generateId(), fieldId: "call_type", operatorId: "equals", value: "External" },
              ],
            }
          }
          return group
        }),
      }
    case "REMOVE_CONDITION":
      return {
        ...state,
        groups: state.groups.map((group) => {
          if (group.id === action.groupId) {
            return {
              ...group,
              conditions: group.conditions.filter((condition) => condition.id !== action.conditionId),
            }
          }
          return group
        }),
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

// Helper function to generate unique IDs
function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

// Main component
export default function FilterBuilder() {
  const [state, dispatch] = useReducer(filterReducer, {
    groups: [
      {
        id: "group1",
        conditions: [
          { id: "condition1", fieldId: "call_type", operatorId: "equals", value: "External" },
          { id: "condition2", fieldId: "name", operatorId: "equals", value: "External" },
        ],
      },
    ],
  })

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL" })
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">
            Applied Filters ({state.groups.reduce((acc, group) => acc + group.conditions.length, 0)})
          </h2>
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
          state.groups.map((group, groupIndex) => (
            <ConditionGroupComponent key={group.id} group={group} groupIndex={groupIndex} dispatch={dispatch} />
          ))
        )}

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => dispatch({ type: "ADD_GROUP" })}
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

// Condition Group Component
function ConditionGroupComponent({
  group,
  groupIndex,
  dispatch,
}: {
  group: ConditionGroup
  groupIndex: number
  dispatch: React.Dispatch<Action>
}) {
  return (
    <div className="mb-4 bg-white rounded-lg border border-gray-200 shadow-sm p-4">
      {group.conditions.map((condition, conditionIndex) => (
        <ConditionRowComponent
          key={condition.id}
          condition={condition}
          groupId={group.id}
          isFirst={conditionIndex === 0}
          dispatch={dispatch}
        />
      ))}

      <div className="mt-2">
        <button
          onClick={() => dispatch({ type: "ADD_CONDITION", groupId: group.id })}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Condition
        </button>
      </div>
    </div>
  )
}

// Condition Row Component
function ConditionRowComponent({
  condition,
  groupId,
  isFirst,
  dispatch,
}: {
  condition: Condition
  groupId: string
  isFirst: boolean
  dispatch: React.Dispatch<Action>
}) {
  const selectedField = fields.find((field) => field.id === condition.fieldId)
  const applicableOperators = operators.filter((op) =>
    selectedField ? op.applicableTypes.includes(selectedField.type) : false,
  )

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="w-16 text-sm font-medium text-gray-700">{isFirst ? "Where" : "And"}</div>

      <div className="flex-1 grid grid-cols-3 gap-2">
        {/* Field Dropdown */}
        <FieldDropdown
          selectedFieldId={condition.fieldId}
          onChange={(fieldId) =>
            dispatch({
              type: "UPDATE_CONDITION",
              groupId,
              conditionId: condition.id,
              field: "fieldId",
              value: fieldId,
            })
          }
        />

        {/* Operator Dropdown */}
        <div className="relative">
          <select
            value={condition.operatorId}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_CONDITION",
                groupId,
                conditionId: condition.id,
                field: "operatorId",
                value: e.target.value,
              })
            }
            className="w-full h-10 pl-3 pr-10 text-sm bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {applicableOperators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>

        {/* Value Input */}
        <div className="relative">
          <select
            value={condition.value}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_CONDITION",
                groupId,
                conditionId: condition.id,
                field: "value",
                value: e.target.value,
              })
            }
            className="w-full h-10 pl-3 pr-10 text-sm bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="External">External</option>
            <option value="Internal">Internal</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => dispatch({ type: "REMOVE_CONDITION", groupId, conditionId: condition.id })}
        className="flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
        aria-label="Remove condition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

// Field Dropdown Component with dropdown menu
function FieldDropdown({
  selectedFieldId,
  onChange,
}: {
  selectedFieldId: string
  onChange: (fieldId: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedField = fields.find((field) => field.id === selectedFieldId)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full h-10 px-3 text-sm text-left flex items-center justify-between bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          isOpen && "ring-2 ring-blue-500 border-transparent",
        )}
      >
        <div className="flex items-center gap-2">
          {selectedField?.icon}
          <span>{selectedField?.name}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          {fields.map((field) => (
            <button
              key={field.id}
              type="button"
              onClick={() => {
                onChange(field.id)
                setIsOpen(false)
              }}
              className={cn(
                "w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-gray-100 text-sm",
                field.id === selectedFieldId && "bg-gray-100",
              )}
            >
              {field.icon}
              <span>{field.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Add useState import
import { useState } from "react"
