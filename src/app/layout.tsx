import './globals.css';

export const metadata = {
  title: 'Viral Query Generator',
  description: 'Generate optimized search queries to find viral products on TikTok, Amazon, and Google',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
