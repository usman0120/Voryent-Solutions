import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter } from "lucide-react"

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  github?: string
}

export interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  role: string
  bio?: string
  avatarUrl?: string
  socials?: SocialLinks
}

export function TeamCard({ name, role, bio, avatarUrl, socials, className, ...props }: TeamCardProps) {
  return (
    <Card className={cn("group transition-all hover:-translate-y-1 hover:shadow-lg overflow-hidden", className)} {...props}>
      <CardHeader className="text-center items-center pt-8 pb-4">
        <Avatar className="w-28 h-28 mb-4 border-4 border-background shadow-md">
          <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
          <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
            {name.split(" ").map(n => n[0]).join("").substring(0, 2)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="text-primary font-medium">{role}</CardDescription>
      </CardHeader>
      
      {bio && (
        <CardContent className="text-center text-sm text-muted-foreground px-6 pb-6">
          <p className="line-clamp-3">{bio}</p>
        </CardContent>
      )}

      {socials && (Object.values(socials).some(Boolean)) && (
        <div className="flex justify-center gap-3 pb-6">
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1" aria-label={`${name}'s Twitter`}>
              <Twitter className="h-4 w-4" />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1" aria-label={`${name}'s LinkedIn`}>
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-1" aria-label={`${name}'s GitHub`}>
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </Card>
  )
}
