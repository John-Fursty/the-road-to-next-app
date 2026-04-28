import { LucideLoaderCircle } from "lucide-react";

const Spinner = () => {
    return (
        <div className="flex flex-1 justify-center items-center self-center">
          <LucideLoaderCircle className="h-16 w-16 animate-spin" />
        </div>
    )
}

export { Spinner };