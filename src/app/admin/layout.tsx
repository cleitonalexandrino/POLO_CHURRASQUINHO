"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, LayoutDashboard, UtensilsCrossed, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Painel Principal", href: "/admin", icon: LayoutDashboard },
    { name: "Cortes & Menu", href: "/admin/menu", icon: UtensilsCrossed },
    { name: "Engrenagens", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-zinc-950 font-sans text-white selection:bg-red-600 selection:text-white">
      {/* Sidebar Brutalista */}
      <aside className="w-full md:w-56 border-b-8 md:border-b-0 md:border-r-8 border-red-600 bg-black shrink-0 relative overflow-hidden z-20">
        <div className="absolute -bottom-24 -right-24 pointer-events-none opacity-5">
          <Flame className="w-[400px] h-[400px] text-red-600" />
        </div>

        <div className="p-8 flex flex-col h-full relative z-10">
          <div className="flex flex-col mb-12 border-b-4 border-zinc-800 pb-8">
            <h1 className="font-black text-xl xl:text-2xl uppercase tracking-tighter text-white leading-none">
              Apolo<br/><span className="text-red-600">Admin</span>
            </h1>
            <div className="mt-6 w-fit rounded-none bg-red-600 text-white font-black uppercase tracking-[0.2em] px-4 py-2 text-xs shadow-[4px_4px_0px_#000] border-4 border-red-900">
              COMANDO CENTRAL
            </div>
          </div>

          <nav className="flex-1 space-y-6">
            <h2 className="text-xs font-black tracking-[0.3em] text-zinc-500 uppercase mb-4">Módulos</h2>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-4 px-6 py-5 font-black uppercase tracking-widest text-sm transition-all border-4 group ${
                    isActive 
                      ? "bg-red-600 border-red-600 text-white shadow-[8px_8px_0px_#7f1d1d] md:translate-x-4" 
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-red-600 hover:text-white hover:bg-black hover:-translate-y-1 hover:shadow-[6px_6px_0px_#dc2626]"
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-red-500"}`} />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-12 pt-8 border-t-4 border-zinc-800">
            <Link href="/">
              <Button className="w-full h-16 justify-center gap-4 rounded-none bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#dc2626]">
                <LogOut className="w-6 h-6" />
                Sair do Fogo
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-zinc-950">
        <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
