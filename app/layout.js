import { Geist, Geist_Mono } from "next/font/google";
import { CatProvider } from "@/context/CatContext";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "TamaCatAI",
  description: "virtual cat companion",
};

// Ascii box around components
function AsciiBox({ children }) {
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: "monospace",
        color: "lime",
        background: "black",
        textAlign: "center",
        lineHeight: "1.2",
      }}
    >
      {/* Top border */}
      <div>{"-".repeat(40)}</div>

      {/* Vertical lines */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderLeft: "1px solid lime",
          borderRight: "1px solid lime",
          padding: "0.3em 1ch",
        }}
      >
        {children}
      </div>
      {/* Bottom border */}
      <div>{"-".repeat(40)}</div>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CatProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minHeight: "100vh",
            margin: 0,
            backgroundColor: "black",
            color: "lime",
            fontFamily: "monospace",
            paddingTop: "2em",
          }}
        >
          <AsciiBox>{children}</AsciiBox>
        </body>
      </CatProvider>
    </html>
  );
}
