import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export default function ErrorAlert({ title, message, error }: { title: string, message: string, error: string }) {
    return (
        <div className="max-w-2xl m-auto">
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
                <span className="text-sm font-mono">{error}</span>
            </Alert>
        </div>
    )
}