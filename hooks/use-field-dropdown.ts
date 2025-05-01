"use client"
import { fields } from "@/data/filter-data"
import { useDropdown } from "@/hooks/use-dropdown"

export function useFieldDropdown(initialFieldId: string, onChange: (fieldId: string) => void) {
    const selectedField = fields.find((field) => field.id === initialFieldId)
    const { isOpen, toggleDropdown, closeDropdown, handleSelect, ref } = useDropdown(initialFieldId, onChange)

    return {
        isOpen,
        selectedField,
        toggleDropdown,
        closeDropdown,
        handleSelect,
        ref,
    }
}
