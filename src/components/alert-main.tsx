"use client";

import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

type AlertType = "default" | "destructive" | "success";
type AlertProps = {
  title: string;
  description: string;
  type?: AlertType;
  duration?: number;
  show: boolean;
  onClose: () => void;
};

const alertIcons = {
  default: Info,
  destructive: AlertCircle,
  success: CheckCircle,
};

const DEFAULT_DURATION = 3000;

export function AlertMain({
  title,
  description,
  type = "default",
  duration = DEFAULT_DURATION,
  show,
  onClose,
}: AlertProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (show) {
      setIsLeaving(false);
      const timer = setTimeout(() => {
        // Start fade out animation
        setIsLeaving(true);
        // Actually close after animation
        setTimeout(onClose, 150);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const Icon = alertIcons[type];

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={cn(
        "fixed right-6 top-6 z-50 max-w-xs transition-all duration-200",
        "animate-in fade-in slide-in-from-top-6",
        isLeaving && "animate-out fade-out slide-out-to-top-6",
      )}
    >
      <Alert variant={type as "default" | "destructive" | null | undefined}>
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            <Icon className="h-4 w-4" />
            <div>
              <AlertTitle>{title}</AlertTitle>
              <AlertDescription>{description}</AlertDescription>
            </div>
          </div>
          <button onClick={handleClose} className="p-1 hover:opacity-70">
            <X className="h-4 w-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
}
