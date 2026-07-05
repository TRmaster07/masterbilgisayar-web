import Link from "next/link";
import {
  ArrowRight,
  CircuitBoard,
  Cpu,
  DatabaseBackup,
  Fan,
  Gamepad2,
  HandCoins,
  Laptop,
  LaptopMinimal,
  MemoryStick,
  Monitor,
  MonitorSmartphone,
  PcCase,
  RotateCcw,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import type { Service } from "@/data/services";

/** Hizmet slug'ı → kart ikonu (görsel tarama kolaylığı için) */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  "laptop-tamiri": Laptop,
  "bilgisayar-tamiri": PcCase,
  "macbook-tamiri": LaptopMinimal,
  "anakart-tamiri": CircuitBoard,
  "ekran-karti-tamiri": Cpu,
  "monitor-tamiri": Monitor,
  "ps5-tamiri": Gamepad2,
  "ps4-tamiri": Gamepad2,
  "xbox-tamiri": Gamepad2,
  "laptop-ekran-degisimi": MonitorSmartphone,
  "veri-kurtarma": DatabaseBackup,
  "ssd-ram-yukseltme": MemoryStick,
  "bilgisayar-bakim": Fan,
  "format-windows-kurulumu": RotateCcw,
  "arizali-cihaz-alimi": HandCoins,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = SERVICE_ICONS[service.slug] ?? Wrench;

  return (
    <Link
      href={`/${service.slug}`}
      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/50"
    >
      <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon aria-hidden className="size-5" />
      </span>
      <h3 className="mt-3 font-semibold">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm text-muted-foreground">
        {service.excerpt}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Detaylı bilgi
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
