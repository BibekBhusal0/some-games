import { Footer } from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <main className="container mx-auto max-w-sm px-6 flex-grow pt-16 pb-4">
        {children}
        <Footer />
      </main>
    </div>
  );
}
