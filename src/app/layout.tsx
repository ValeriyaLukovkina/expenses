import MainClient from "@/components/MainClient/MainClient";
import { getUser } from "./actions/getUser";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  console.log(user);

  return (
    <html lang="en">
      <body>
        <MainClient user={user}/>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
