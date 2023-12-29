import type { Product } from "@/pages/admin/adminTable/product column";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProductArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  aspectRatio?: "portrait" | "square";
  showText?: boolean;
  width?: number;
  height?: number;
}
export function ProductArtWork({
  product,
  aspectRatio = "portrait",
  showText = true,
  width,
  height,
  className,
  ...props
}: ProductArtworkProps) {
  const { imageUrl, title, description, category, origin_price, price } =
    product;
  return (
    <div
      className={cn("space-y-3 border rounded-lg p-4", className)}
      {...props}
    >
      <div className="overflow-hidden rounded-md">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>
      {showText && (
        <div className="space-y-2 text-sm col-span-8">
          <div className="flex space-x-2 items-center text-xs">
            <Badge>{category}</Badge>
          </div>
          <h3 className="font-medium leading-none">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="flex space-x-2 items-center">
            <s className="opacity-60">{origin_price}元</s>
            <strong>{price}元</strong>
          </div>
        </div>
      )}
    </div>
  );
}
