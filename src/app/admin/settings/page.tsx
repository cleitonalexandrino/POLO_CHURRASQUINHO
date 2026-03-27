"use client";

import { Save, Store, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminSettings() {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("MÁQUINA CONFIGURADA!", { description: "As engrenagens começaram a girar." });
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-4xl">
      <div className="border-b-8 border-red-600 pb-8 flex flex-col items-start gap-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase leading-none">
          Engrenagens<br/><span className="text-red-600">Fiscais</span>
        </h2>
        <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-[0.3em] font-bold uppercase mt-4 border-l-4 border-red-600 pl-4">
          O CORAÇÃO DA LOJA (STATUS, TEMPO, ZAP)
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000]">
          <CardHeader className="border-b-4 border-zinc-800 p-6 md:p-8 bg-zinc-900">
            <CardTitle className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
              <Store className="w-6 h-6 lg:w-6 lg:h-6 text-red-600" /> Válvula de Fluxo (Status)
            </CardTitle>
            <CardDescription className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-2">
              Ligue ou desligue a máquina de vendas.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4 max-w-md">
              <Label className="font-black uppercase tracking-widest text-zinc-500 text-xs">Situação do Braseiro</Label>
              <Select defaultValue="aberto">
                <SelectTrigger className="rounded-none border-4 border-zinc-800 bg-black text-white h-16 uppercase tracking-widest font-black text-lg focus:ring-0 focus:border-red-600 shadow-[6px_6px_0px_#000]">
                  <SelectValue placeholder="Estado atual" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-4 border-zinc-800 bg-black">
                  <SelectItem value="aberto" className="text-green-500 font-black uppercase tracking-widest text-sm focus:bg-zinc-900 focus:text-green-400">🔥 ABERTO E QUEIMANDO</SelectItem>
                  <SelectItem value="fechado" className="text-red-500 font-black uppercase tracking-widest text-sm focus:bg-zinc-900 focus:text-red-400">❌ FRIO (FECHADO)</SelectItem>
                  <SelectItem value="pausado" className="text-yellow-500 font-black uppercase tracking-widest text-sm focus:bg-zinc-900 focus:text-yellow-400">⏸️ SOBRECARGA (PAUSADO)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000]">
          <CardHeader className="border-b-4 border-zinc-800 p-6 md:p-8 bg-zinc-900">
            <CardTitle className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
              <Clock className="w-6 h-6 lg:w-6 lg:h-6 text-red-600" /> Relógio da Entrega
            </CardTitle>
            <CardDescription className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-2">
              Promessa de prazo no app do cliente.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4 max-w-lg">
              <Label htmlFor="tempo" className="font-black uppercase tracking-widest text-zinc-500 text-xs">Previsão Média</Label>
              <div className="flex items-center gap-4">
                <Input id="tempo" defaultValue="45" type="number" className="rounded-none border-4 border-zinc-800 bg-black text-white h-16 w-24 text-center font-black text-2xl focus-visible:ring-0 focus-visible:border-red-600 shadow-[4px_4px_0px_#000]" />
                <span className="text-zinc-600 font-black uppercase tracking-widest">ATÉ</span>
                <Input defaultValue="60" type="number" className="rounded-none border-4 border-zinc-800 bg-black text-white h-16 w-24 text-center font-black text-2xl focus-visible:ring-0 focus-visible:border-red-600 shadow-[4px_4px_0px_#000]" />
                <span className="text-zinc-600 font-black uppercase tracking-widest hidden sm:inline-block">MINUTOS</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000]">
          <CardHeader className="border-b-4 border-zinc-800 p-6 md:p-8 bg-zinc-900">
            <CardTitle className="text-lg lg:text-xl font-black uppercase tracking-tighter text-white flex items-center gap-4">
              <Phone className="w-6 h-6 lg:w-6 lg:h-6 text-red-600" /> Cabo de Guerra (WhatsApp)
            </CardTitle>
            <CardDescription className="text-zinc-400 font-mono text-xs uppercase tracking-widest mt-2">
              O celular que ouvirá o toque mágico da venda.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="space-y-4 max-w-lg">
              <Label htmlFor="whatsapp" className="font-black uppercase tracking-widest text-zinc-500 text-xs">Zap do Caixa (COM DDD)</Label>
              <Input id="whatsapp" defaultValue="5511999999999" type="tel" className="rounded-none border-4 border-zinc-800 bg-black text-white h-16 font-black text-xl tracking-widest focus-visible:ring-0 focus-visible:border-red-600 shadow-[6px_6px_0px_#000]" />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end pt-8">
          <Button type="submit" className="h-20 px-12 gap-4 rounded-none bg-red-600 text-white font-black uppercase tracking-widest text-lg border-4 border-red-900 hover:border-white hover:bg-white hover:text-red-700 transition-all shadow-[8px_8px_0px_#000] hover:shadow-[8px_8px_0px_#dc2626]">
            <Save className="w-6 h-6" /> Martelada Final (Salvar)
          </Button>
        </div>
      </form>
    </div>
  );
}
