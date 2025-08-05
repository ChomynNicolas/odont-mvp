import { Loader } from "@/components/ui/loader"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader size="lg" />
    </div>
  )
}
