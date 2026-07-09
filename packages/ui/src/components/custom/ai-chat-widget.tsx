import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export interface Message {
  id: string
  role: "user" | "ai"
  content: string
}

export interface AiChatWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  messages?: Message[]
  onSendMessage?: (content: string) => void
  isTyping?: boolean
  initialOpen?: boolean
}

export function AiChatWidget({
  messages = [{ id: "welcome", role: "ai", content: "Hi! I'm the Voryent AI Assistant. How can I help you today?" }],
  onSendMessage,
  isTyping = false,
  initialOpen = false,
  className,
  ...props
}: AiChatWidgetProps) {
  const [isOpen, setIsOpen] = React.useState(initialOpen)
  const [inputValue, setInputValue] = React.useState("")
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!inputValue.trim()) return
    onSendMessage?.(inputValue)
    setInputValue("")
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)} {...props}>
      {isOpen ? (
        <div 
          role="dialog" 
          aria-label="AI Assistant Chat" 
          className="w-80 sm:w-96 h-[500px] max-h-[80vh] bg-background border rounded-lg shadow-xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-2 duration-300"
        >
          <div className="p-4 border-b bg-primary text-primary-foreground flex justify-between items-center">
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 rounded-full hover:bg-primary-foreground/20 text-primary-foreground focus-visible:ring-offset-primary" 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-muted/10 space-y-4" ref={scrollRef}>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "rounded-lg p-3 text-sm max-w-[85%]",
                  msg.role === "ai" 
                    ? "bg-muted text-foreground self-start rounded-tl-sm" 
                    : "bg-primary text-primary-foreground self-end ml-auto rounded-tr-sm"
                )}
              >
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="bg-muted text-foreground self-start rounded-lg rounded-tl-sm p-3 max-w-[85%] flex gap-1 items-center">
                <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce" />
                <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce delay-75" />
                <span className="h-1.5 w-1.5 bg-foreground/50 rounded-full animate-bounce delay-150" />
              </div>
            )}
          </div>
          <form onSubmit={handleSend} className="p-3 border-t bg-background flex gap-2 items-center">
            <Input 
              placeholder="Type a message..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1" 
              aria-label="Chat input"
            />
            <Button type="submit" size="icon" disabled={!inputValue.trim()} aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      ) : (
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow" 
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}