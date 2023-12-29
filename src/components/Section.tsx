import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Section({ children, title, className }: SectionProps) {
  return (
    <section className={cn("", className)}>
      {title && (
        <h4 className="text-3xl text-primary text-center p-4 font-bold mb-2">{title}</h4>
      )}
      {children}
    </section>
  );
}
