import Link from "next/link";
import { Phone } from "lucide-react";

import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { BUSINESS, PHONE_HREF } from "@/data/business";
import { NAV_LINKS } from "@/lib/nav";

export function SiteHeader() {
  return (
    <header className="dark sticky top-0 z-40 border-b border-border bg-background/85 text-foreground backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-bold tracking-tight">
          <span className="text-primary">Master</span> Bilgisayar
        </Link>

        <nav aria-label="Ana menü" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex" size="lg">
            <a href={PHONE_HREF} data-cta="call">
              <Phone aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="icon-lg" className="sm:hidden">
            <a href={PHONE_HREF} data-cta="call" aria-label={`Telefonla ara: ${BUSINESS.phoneDisplay}`}>
              <Phone aria-hidden />
            </a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
