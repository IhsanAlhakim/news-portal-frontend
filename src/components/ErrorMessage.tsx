import { type Error } from "@/types/error.ts";

interface ErrorMessageProps {
  error: Error | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <>
      {error && (
        <div className="bg-red-700 rounded mt-2 p-2 text-white">
          <p className="font-semibold">{error.errorTitle}</p>
          <ol className="list-disc text-md ml-4">
            {error.errorDesc.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
