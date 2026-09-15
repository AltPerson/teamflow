import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { cn } from "cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const TextInput = ({ label, error, helperText, className, id, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      <div>
        <Input {...rest} className={cn("min-h-11", className)} id={id} />

        <span
          className={cn(
            "text-muted-foreground mt-1.5 block text-[0.75rem]",
            error && "text-red-400",
          )}
        >
          {error || helperText}
        </span>
      </div>
    </div>
  );
};

export default TextInput;
