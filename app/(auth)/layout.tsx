
import "../globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="bg-[#1E1E1E]">
    
    {children}
     
    </body>;
}
