import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const loaderVariants = cva(
  "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-12 w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string;
}

export function Loader({ size, className }: LoaderProps) {
  return <div className={cn(loaderVariants({ size }), className)} />;
}

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader size="xl" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
