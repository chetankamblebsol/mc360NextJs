import './globals.css';

export const metadata = {
  title: 'MC360 - Search Module',
  description: 'Global Sanctions Search System'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
