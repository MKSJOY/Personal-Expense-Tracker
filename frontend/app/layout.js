// app/layout.jsx
import "../globals.css";

export const metadata = {
  title: "Personal Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
