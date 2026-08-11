import type { AnchorHTMLAttributes } from "react";

type SafeLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  prefetch?: boolean;
};

export default function SafeLink({ href, prefetch, children, ...props }: SafeLinkProps) {
  void prefetch;
  return <a href={href} {...props}>{children}</a>;
}
