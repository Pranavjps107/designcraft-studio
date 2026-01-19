import { MessageCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  title?: string;
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header className="h-14 bg-background border-b border-border px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {title && (
          <>
            <div className="w-5 h-5 border border-border rounded flex items-center justify-center">
              <div className="w-3 h-3 border border-muted-foreground rounded-sm" />
            </div>
            <h2 className="text-sm font-medium text-foreground">{title}</h2>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="text-sm font-medium">
          Feedback
        </Button>
        <Button variant="outline" size="sm" className="text-sm font-medium">
          Docs
        </Button>
        <Button variant="outline" size="sm" className="text-sm font-medium gap-2">
          <MessageCircle className="h-4 w-4" />
          Talk to EI
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
          A
        </div>
      </div>
    </header>
  );
}
