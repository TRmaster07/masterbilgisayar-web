"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { whatsappHref } from "@/data/business";

const DEVICE_TYPES = [
  "Laptop",
  "Masaüstü Bilgisayar",
  "MacBook / iMac",
  "Oyun Konsolu (PS/Xbox)",
  "Monitör",
  "Diğer",
] as const;

const QuoteSchema = z.object({
  name: z.string().min(2, "Adınızı yazın"),
  deviceType: z.enum(DEVICE_TYPES, "Cihaz türünü seçin"),
  issue: z
    .string()
    .min(10, "Arızayı birkaç cümleyle anlatın (en az 10 karakter)"),
});

type QuoteInput = z.infer<typeof QuoteSchema>;

/**
 * Teklif formu: veriyi sunucuya göndermek yerine yapılandırılmış bir
 * WhatsApp mesajı oluşturur. E-posta altyapısı gerektirmez ve işletmenin
 * zaten kullandığı kanala (WhatsApp) düşer.
 */
export function QuoteForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteInput>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: { name: "", issue: "" },
  });

  function onSubmit(data: QuoteInput) {
    const message = [
      "Merhaba, ücretsiz arıza tespiti / teklif istiyorum.",
      `Ad: ${data.name}`,
      `Cihaz: ${data.deviceType}`,
      `Arıza: ${data.issue}`,
    ].join("\n");
    window.open(whatsappHref(message), "_blank", "noopener");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="quote-name">Adınız</Label>
        <Input
          id="quote-name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p role="alert" className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quote-device">Cihaz türü</Label>
        <select
          id="quote-device"
          aria-invalid={!!errors.deviceType}
          defaultValue=""
          className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          {...register("deviceType")}
        >
          <option value="" disabled>
            Seçin…
          </option>
          {DEVICE_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.deviceType && (
          <p role="alert" className="text-sm text-destructive">
            {errors.deviceType.message}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="quote-issue">Arıza / talebiniz</Label>
        <Textarea
          id="quote-issue"
          rows={4}
          placeholder="Örn: Laptopum şarj oluyor ama açılmıyor."
          aria-invalid={!!errors.issue}
          {...register("issue")}
        />
        {errors.issue && (
          <p role="alert" className="text-sm text-destructive">
            {errors.issue.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        data-cta="whatsapp-form"
        className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/85"
      >
        <MessageCircle aria-hidden /> WhatsApp&apos;tan Teklif İste
      </Button>
      <p className="text-xs text-muted-foreground">
        Form bilgileriniz sunucuya kaydedilmez; gönderim WhatsApp
        uygulamanız üzerinden yapılır.
      </p>
    </form>
  );
}
