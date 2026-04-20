export function AppHeader({ title }: { title: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center border-b bg-white px-6">
      <h1 className="text-lg font-semibold">{title}</h1>
    </header>
  );
}
