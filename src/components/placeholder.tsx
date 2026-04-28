import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
    label: string;
    icon?: React.ReactElement;
    button?: React.ReactNode;
};

const Placeholder = ({ 
    label,
    icon = <LucideMessageSquareWarning />,
    button = <div className="h-10"/>,
} : PlaceholderProps) => {
    return (
        <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
            {cloneElement(icon as any, {
                className: "w-16 h-16",
            })}
            <h2 className="text-lg text-center">{label}</h2>
            {cloneElement(button as any, {
                className: "h-10"
            })}
        </div>
    )
};

export { Placeholder };