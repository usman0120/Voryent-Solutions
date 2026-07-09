import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

export interface CommandPaletteItem {
  id: string
  label: string
  icon?: React.ReactNode
  onSelect?: () => void
}

export interface CommandPaletteGroup {
  heading: string
  items: CommandPaletteItem[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  groups: CommandPaletteGroup[]
  placeholder?: string
  emptyMessage?: string
}

export function CommandPalette({ 
  open, 
  onOpenChange, 
  groups,
  placeholder = "Type a command or search...",
  emptyMessage = "No results found."
}: CommandPaletteProps) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyMessage}</CommandEmpty>
        {groups.map((group, index) => (
          <React.Fragment key={group.heading}>
            <CommandGroup heading={group.heading}>
              {group.items.map((item) => (
                <CommandItem 
                  key={item.id} 
                  onSelect={() => {
                    item.onSelect?.()
                    onOpenChange(false)
                  }}
                  className="gap-2 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {index < groups.length - 1 && <CommandSeparator />}
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
