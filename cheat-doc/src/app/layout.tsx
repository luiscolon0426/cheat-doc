import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "CheatDoc.ME | Luis's Engineering Field Notes",
  description:
    "Technical references, production lessons, and career notes collected by software engineer Luis Colon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0e1525] text-white">
        <Header />
        <div>{children}</div>
      </body>
    </html>
  );
}
