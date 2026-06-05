import { Plus, Check, ExternalLink } from "lucide-react";
import { useCart, productImage } from "@/lib/cart";

export function parseOutfit(content) {
  try {
    const p = JSON.parse(content);
    if (typeof p?.intro === "string" && Array.isArray(p?.products)) return p;
  } catch {
    /* not JSON */
  }
  return null;
}

export function OutfitMessage({ payload, onRefine }) {
  return (
    <div className="space-y-5">
      {payload.intro && (
        <p className="text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
          {payload.intro}
        </p>
      )}

      {payload.products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {payload.products.map((p, i) => (
            <ProductCard key={i} product={p} index={i} />
          ))}
        </div>
      )}

      {payload.styling_notes && (
        <div className="border-l-2 border-accent/40 pl-4 py-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-1">
            Styling Notes
          </p>
          <p className="text-sm text-foreground italic">{payload.styling_notes}</p>
        </div>
      )}

      {payload.refinements && payload.refinements.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {payload.refinements.map((r) => (
            <button
              key={r}
              onClick={() => onRefine(r)}
              className="text-xs border border-border rounded-full px-3.5 py-1.5 hover:border-accent hover:text-accent transition-colors"
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, index }) {
  const { items, add } = useCart();
  const id = `${product.retailer}-${product.name}-${index}`.toLowerCase().replace(/\s+/g, "-");
  const inCart = items.some((i) => i.id === id);
  const img = productImage(product.image_query);

  const handleAdd = () => {
    add({
      id,
      name: product.name,
      retailer: product.retailer,
      price: product.price,
      currency: product.currency,
      category: product.category,
      image: img,
      url: product.url,
    });
  };

  return (
    <div className="group border border-border bg-card rounded-md overflow-hidden flex flex-col">
      <div className="relative aspect-[4/5] bg-surface overflow-hidden">
        <img
          src={img}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
        <span className="absolute top-2 left-2 bg-background/90 backdrop-blur px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest">
          {product.category}
        </span>
      </div>
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="font-display italic text-base leading-tight truncate">{product.name}</p>
          <p className="text-sm font-medium shrink-0">${product.price.toFixed(0)}</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {product.retailer}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{product.description}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAdd}
            disabled={inCart}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded text-[11px] uppercase tracking-widest font-medium bg-foreground text-background hover:bg-accent transition-colors disabled:opacity-60"
          >
            {inCart ? (
              <><Check className="size-3" /> Added</>
            ) : (
              <><Plus className="size-3" /> Add</>
            )}
          </button>
          {product.url && (
            <a
              href={product.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-3 py-2 rounded border border-border hover:border-accent hover:text-accent transition-colors"
              aria-label="View at retailer"
            >
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}