import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "CheatDoc",
  description: "Your dev cheatsheet buddy.",
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
