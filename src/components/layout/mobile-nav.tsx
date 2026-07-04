"use client";

import Link from "next/link";
import { Menu, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BUSINESS, PHONE_HREF, whatsappHref } from "@/data/business";
import { NAV_LINKS } from "@/lib/nav";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="md:hidden">
          <Menu aria-hidden className="size-5" />
          <span className="sr-only">Menüyü aç</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetHeader>
          <SheetTitle>{BUSINESS.name}</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobil menü" className="flex flex-col gap-1 px-4">
          {NAV_LINKS.map((link) => (
            <SheetClose asChild key={link.href}>
              <Link
                href={link.href}
                className="rounded-md px-2 py-2.5 text-base font-medium hover:bg-muted"
              >
                {link.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <Separator className="my-2" />
        <div className="flex flex-col gap-2 px-4">
          <Button asChild size="lg">
            <a href={PHONE_HREF} data-cta="call">
              <Phone aria-hidden /> {BUSINESS.phoneDisplay}
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/85"
          >
            <a href={whatsappHref()} target="_blank" rel="noopener" data-cta="whatsapp">
              <MessageCircle aria-hidden /> WhatsApp&apos;tan Yaz
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
