import Link from "next/link";
import { Home, Phone, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BUSINESS, PHONE_HREF } from "@/data/business";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Aradığınız sayfa bulunamadı
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Sayfa taşınmış veya adres yanlış yazılmış olabilir. Cihazınızla
          ilgili acil bir durum varsa bizi doğrudan arayabilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home aria-hidden /> Ana Sayfa
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/hizmetler">
              <Wrench aria-hidden /> Hizmetlerimiz
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={PHONE_HREF} data-cta="call">
              <Phone aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
