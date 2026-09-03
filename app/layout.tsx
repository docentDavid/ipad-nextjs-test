import type { Metadata } from "next";
import "\./globals\.css";
export const metadata: Metadata = \{
  title: \{
    default: "ACME — Slimme oplossingen",
    template: "%s \| ACME",
  \},
  description:
    "ACME levert heldere, betrouwbare oplossingen voor moderne teams\.",
\};
export default function RootLayout&#40;\{
  children,
\}: Readonly<\{
  children: React\.ReactNode;
\}\>&#41; \{
  return &#40;
    <html lang="nl"\>
      <body\>\{children\}</body\>
    </html\>
  &#41;;
\}