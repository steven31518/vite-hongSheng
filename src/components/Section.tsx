import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Section({ children, title, className }: SectionProps) {
  return (
    <section className={cn("", className)}>
      {title && <h4 className="text-lg p-4 font-bold">{title}</h4>}
      {children}
    </section>
  );
}
