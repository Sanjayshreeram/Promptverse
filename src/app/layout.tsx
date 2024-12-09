import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "../components/ui/theme-provider";
import { ModeToggle } from "./components/ModeToggle";

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
       <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > 
      <body className={`${inter.className}`}>
      
          <AuthProvider>
         
          <Navbar />
            <main className="flex justify-center items-start min-h-screen w-full">
            
              {children}
             
            </main>
          </AuthProvider>
      
      </body>
      </ThemeProvider>
    </html>
  );
}
