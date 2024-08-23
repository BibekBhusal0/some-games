import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const color = "#64748b";
  const size = 1.4;
  const spacing = 30;
  return (
    <div
      style={{
        backgroundImage: `radial-gradient(${color} ${size}px, transparent ${size}px)`,
        backgroundSize: `calc(${spacing} * ${size}px) calc(${spacing} * ${size}px)`,
      }}
      className="relative flex-center h-screen">
      <main className="container max-w-sm px-3 py-6 bg-primary-50 relative">
        {children}
        <Footer />
      </main>
    </div>
  );
}
