import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full bg-[#dfdfdf]">
      <Sidebar />
      <div className="flex size-full flex-col p-[60px]">{children}</div>
    </main>
  );
}
