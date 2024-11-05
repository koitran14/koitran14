"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

import { CheckCircle, AlertCircle  , XCircle, Smile , Frown  } from "lucide-react"; // Adjust imports based on your icon library

export function Toaster() {
  const { toasts } = useToast()

  // Function to get the appropriate icon based on the toast type
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle  className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "happy":
        return <Smile  className="h-5 w-5 text-blue-500" />;
      case "sad":
        return <Frown  className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, type, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="flex items-start">
            {/* Render the icon based on the toast type */}
            {getIcon(type || "default")}
            <div className="ml-2 grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
