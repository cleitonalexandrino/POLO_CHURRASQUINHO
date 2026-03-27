"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, TrendingUp, Package, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="border-b-8 border-red-600 pb-8 flex flex-col items-start gap-3">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase leading-none">
          Painel de <br className="hidden md:block"/><span className="text-red-600">Comando</span>
        </h2>
        <p className="text-zinc-400 font-mono text-xs md:text-sm tracking-[0.3em] font-bold uppercase mt-4">
          VISÃO GERAL DO BRASEIRO HOJE
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#dc2626] hover:border-red-600 transition-all group overflow-hidden relative">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign className="w-40 h-40 text-white" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10 border-b-2 border-zinc-800 group-hover:border-red-600/50">
            <CardTitle className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300">Vendas do Dia</CardTitle>
            <DollarSign className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="text-xl lg:text-2xl font-black tracking-tighter text-white flex items-end gap-1">
              <span className="text-sm text-red-500 mb-1">R$</span>1.845
            </div>
            <div className="mt-6 flex items-center gap-3 bg-zinc-900 border-2 border-zinc-800 p-2 w-fit">
              <span className="text-green-500 font-black text-xs tracking-widest">+15%</span>
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">VS ONTEM</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#dc2626] hover:border-red-600 transition-all group overflow-hidden relative">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp className="w-40 h-40 text-white" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10 border-b-2 border-zinc-800 group-hover:border-red-600/50">
            <CardTitle className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300">Ticket Médio</CardTitle>
            <TrendingUp className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="text-xl lg:text-2xl font-black tracking-tighter text-white flex items-end gap-1">
              <span className="text-sm text-red-500 mb-1">R$</span>52<span className="text-base text-zinc-500 mb-1">,40</span>
            </div>
            <div className="mt-6 flex items-center gap-3 bg-zinc-900 border-2 border-zinc-800 p-2 w-fit">
              <span className="text-green-500 font-black text-xs tracking-widest">+8%</span>
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">C/ UPSELL</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 3 */}
        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#dc2626] hover:border-red-600 transition-all group overflow-hidden relative">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Package className="w-40 h-40 text-white" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10 border-b-2 border-zinc-800 group-hover:border-red-600/50">
            <CardTitle className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300">Pedidos Hoje</CardTitle>
            <Package className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="text-2xl lg:text-3xl font-black tracking-tighter text-white">
              35
            </div>
            <div className="mt-4 flex items-center gap-3 bg-red-600/20 border-2 border-red-600/50 p-2 w-fit">
              <span className="text-red-500 font-black text-xs tracking-widest">12</span>
              <span className="text-[10px] uppercase font-bold text-red-500/80 tracking-widest">NA FILA</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI 4 */}
        <Card className="rounded-none border-4 border-zinc-800 bg-black shadow-[8px_8px_0px_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0px_#dc2626] hover:border-red-600 transition-all group overflow-hidden relative">
          <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users className="w-40 h-40 text-white" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 relative z-10 border-b-2 border-zinc-800 group-hover:border-red-600/50">
            <CardTitle className="text-xs font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-300">Novo Sangue</CardTitle>
            <Users className="h-6 w-6 text-red-600" />
          </CardHeader>
          <CardContent className="relative z-10 pt-6">
            <div className="text-2xl lg:text-3xl font-black tracking-tighter text-white">
              +8
            </div>
            <div className="mt-4 flex items-center gap-3 bg-zinc-900 border-2 border-zinc-800 p-2 w-fit">
              <span className="text-white font-black text-xs tracking-widest">CLIENTES</span>
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">HOJE</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-7 mt-8">
        <Card className="col-span-1 lg:col-span-4 rounded-none border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000]">
          <CardHeader className="border-b-4 border-zinc-800 p-6 md:p-8">
            <CardTitle className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white">Fluxo do Fogo</CardTitle>
            <CardDescription className="text-red-500 font-mono text-xs uppercase tracking-[0.2em] mt-3 border-2 border-red-500/30 font-bold bg-red-500/10 w-fit px-3 py-1">
              Pico de pedidos (19H - 20:30H)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-end justify-between gap-2 md:gap-4 p-6 md:p-8">
            {/* Gráfico Brutalista */}
            {[40, 50, 30, 80, 100, 60, 45, 90, 120, 80, 50, 40].map((h, i) => (
              <div key={i} className="w-full bg-zinc-900 border-t-4 border-zinc-800 hover:bg-red-600 hover:border-red-900 transition-all relative group flex-1" style={{ height: `${(h/120)*100}%` }}>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black font-black text-xs px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-[4px_4px_0px_#dc2626] border-2 border-black z-20 pointer-events-none">
                  {h} PDD
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 rounded-none border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000]">
          <CardHeader className="border-b-4 border-zinc-800 p-6 md:p-8">
            <CardTitle className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white">Top da Brasa</CardTitle>
            <CardDescription className="text-zinc-500 font-mono text-xs uppercase tracking-[0.2em] mt-3 border-2 border-zinc-800 font-bold w-fit px-3 py-1">
              OS MAIS VENDIDOS
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 space-y-8">
            {/* ITEM 1 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="w-16 h-16 bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center text-3xl group-hover:border-red-600 group-hover:bg-black transition-colors shrink-0 shadow-[4px_4px_0px_#000]">🍢</div>
              <div className="flex-1 space-y-3 w-full">
                <p className="text-sm md:text-base font-black uppercase text-white tracking-widest line-clamp-1">Espetinho Carne</p>
                <div className="w-full bg-zinc-900 h-6 border-2 border-zinc-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-red-600 h-full w-[85%] border-r-4 border-black"></div>
                </div>
              </div>
              <div className="font-black text-3xl text-white">85<span className="text-sm text-red-600 ml-1">UN</span></div>
            </div>
            
            {/* ITEM 2 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="w-16 h-16 bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center text-3xl group-hover:border-red-600 group-hover:bg-black transition-colors shrink-0 shadow-[4px_4px_0px_#000]">🍖</div>
              <div className="flex-1 space-y-3 w-full">
                <p className="text-sm md:text-base font-black uppercase text-white tracking-widest line-clamp-1">Pão de Alho</p>
                <div className="w-full bg-zinc-900 h-6 border-2 border-zinc-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-red-600 h-full w-[60%] border-r-4 border-black"></div>
                </div>
              </div>
              <div className="font-black text-3xl text-white">60<span className="text-sm text-red-600 ml-1">UN</span></div>
            </div>
            
            {/* ITEM 3 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
              <div className="w-16 h-16 bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center text-3xl group-hover:border-red-600 group-hover:bg-black transition-colors shrink-0 shadow-[4px_4px_0px_#000]">🥤</div>
              <div className="flex-1 space-y-3 w-full">
                <p className="text-sm md:text-base font-black uppercase text-white tracking-widest line-clamp-1">Refri 2L</p>
                <div className="w-full bg-zinc-900 h-6 border-2 border-zinc-800 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-red-600 h-full w-[45%] border-r-4 border-black"></div>
                </div>
              </div>
              <div className="font-black text-3xl text-white">45<span className="text-sm text-red-600 ml-1">UN</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
