import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth Tutorial",
  description: "Learn NextAuth.js by Dave Gray",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Place ThemeProvider as close to the root as possible */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <Navbar />
            <main className="flex justify-center h-screen items-start  min-h-screen w-full bg-white">
              {children}
            </main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
