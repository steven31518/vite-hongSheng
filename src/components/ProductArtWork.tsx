import type { Product } from "@/pages/admin/adminTable/product column";
import { cn } from "@/lib/utils";

interface ProductArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}
export function ProductArtWork({
  product,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ProductArtworkProps) {
  const { imageUrl, title, description } = product;
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={title}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
