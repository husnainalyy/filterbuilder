import { Check, Hash, Link, Mail } from "lucide-react"
import type { Field, Operator, ValueOption } from "@/types/filter-types"

// Available fields
export const fields: Field[] = [
    { id: "name", name: "Name", type: "text", icon: <span className="font-mono">T</span> },
    { id: "company_admin", name: "Company admin", type: "boolean", icon: <Check className="h-4 w-4" /> },
    { id: "last_login_at", name: "Last login at", type: "date", icon: <Hash className="h-4 w-4" /> },
    { id: "pre_call_email", name: "Pre-call email enabled", type: "boolean", icon: <Link className="h-4 w-4" /> },
    { id: "pre_call_slack", name: "Pre-call slack enabled", type: "boolean", icon: <Check className="h-4 w-4" /> },
    { id: "autojoin_external", name: "Autojoin External Meetings", type: "boolean", icon: <Mail className="h-4 w-4" /> },
    { id: "autojoin_internal", name: "Autojoin Internal Meetings", type: "boolean", icon: <Link className="h-4 w-4" /> },
    { id: "bot_name", name: "Bot name", type: "text", icon: <Check className="h-4 w-4" /> },
]

// Available operators - simplified to only equals and not_equals
export const operators: Operator[] = [
    { id: "equals", name: "Equals", applicableTypes: ["text", "boolean", "date", "select"] },
    { id: "not_equals", name: "Not Equals", applicableTypes: ["text", "boolean", "date", "select"] },
]

// Value options for different field types - simplified to only External and Internal
export const valueOptions: Record<string, ValueOption[]> = {
    call_type: [
        { id: "External", name: "External" },
        { id: "Internal", name: "Internal" },
    ],
    boolean: [
        { id: "External", name: "External" },
        { id: "Internal", name: "Internal" },
    ],
}

// Get applicable operators for a field
export function getApplicableOperators(fieldId: string): Operator[] {
    return operators // Always return both operators
}

// Get value options for a field
export function getValueOptions(fieldId: string): ValueOption[] {
    return [
        { id: "External", name: "External" },
        { id: "Internal", name: "Internal" },
    ]
}
