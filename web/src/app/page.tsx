import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Quartr EDGAR</h1>
      <nav className="flex flex-col gap-3 text-lg">
        <Link href="/filings" className="underline underline-offset-4">
          Filings
        </Link>
        <Link href="/summary" className="underline underline-offset-4">
          Summary
        </Link>
      </nav>
    </main>
  );
}
