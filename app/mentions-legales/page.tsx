import type { Metadata } from "next"
import { getLegalMentions } from "@/lib/content/get-legal"

export const metadata: Metadata = {
  title: "Mentions légales | Les Caducées",
}

export default async function MentionsLegalesPage() {
  const content = await getLegalMentions()

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-6">{content.title}</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {content.body.split("\n\n").map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </main>
  )
}


