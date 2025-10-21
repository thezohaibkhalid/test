import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl py-16 px-6 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted-foreground">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <div className="mt-6">
        <Link href="/" className="inline-flex rounded-md border px-4 py-2">
          Go Home
        </Link>
      </div>
    </main>
  );
}
