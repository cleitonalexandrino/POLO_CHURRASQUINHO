"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { ShoppingCart, Clock, Store, Plus, MapPin, ChevronDown, ArrowRight, Flame } from "lucide-react";

// MOCK DATA
const CATEGORIES = [
  { id: "espetinhos", name: "Espetinhos", icon: "🍢" },
  { id: "pratos_dia", name: "Pratos", icon: "🍱" },
  { id: "refeicoes", name: "Refeições", icon: "🍽️" },
  { id: "porcoes", name: "Porções", icon: "🍟" },
  { id: "caldos", name: "Caldos", icon: "🍲" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Espetinho de Carne Bovina",
    description: "Corte selecionado, assado na brasa quente, aprox. 100g de puro sabor.",
    price: 16.0,
    category: "espetinhos",
    image: "/images/WhatsApp Image 2026-03-24 at 11.37.07.jpeg",
    highlight: true,
  },
  {
    id: 2,
    name: "Espetinho de Frango",
    description: "Cubos de peito de frango temperados e suculentos, direto do braseiro.",
    price: 14.0,
    category: "espetinhos",
    image: "/images/WhatsApp Image 2026-03-24 at 11.37.08 (1).jpeg",
  },
  {
    id: 3,
    name: "Pão de Alho Especial",
    description: "Pão extremamente estaladiço recheado com creme de alho defumado da casa.",
    price: 10.0,
    category: "espetinhos",
    image: "/images/WhatsApp Image 2026-03-24 at 11.37.07 (1).jpeg",
  },
  {
    id: 4,
    name: "Prato Feito: Picanha",
    description: "A clássica. Arroz, feijão tropeiro, vinagrete, mandioca e picanha sangrando na tábua.",
    price: 35.0,
    category: "pratos_dia",
    image: "/images/WhatsApp Image 2026-03-24 at 11.37.09 (4).jpeg",
  },
  {
    id: 5,
    name: "Refrigerante 2L",
    description: "Coca-Cola ou Guaraná trincando de gelado para apagar o fogo.",
    price: 12.0,
    category: "bebidas",
    image: "/images/WhatsApp Image 2026-03-24 at 11.37.10.jpeg",
  },
];

const SIDES = [
  { id: "farofa", name: "Farofa Temperada", price: 2.0 },
  { id: "vinagrete", name: "Vinagrete", price: 3.0 },
  { id: "nenhum", name: "Nenhum", price: 0 },
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("espetinhos");
  const [cart, setCart] = useState<any[]>([]);
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedSide, setSelectedSide] = useState("nenhum");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setSelectedSide("nenhum");
  };

  const handeAddToCart = () => {
    if (!selectedProduct) return;
    
    const additional = SIDES.find((s) => s.id === selectedSide);
    
    setCart((prev) => [
      ...prev,
      {
        product: selectedProduct,
        quantity: 1,
        side: additional,
        totalItemPrice: selectedProduct.price + (additional?.price || 0),
      },
    ]);
    
    toast.success(`${selectedProduct.name} ADICIONADO!`, {
      description: additional?.id !== "nenhum" ? `C/ Adicional: ${additional?.name}` : "Sem adicionais",
    });
    setSelectedProduct(null);
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + item.totalItemPrice, 0);
    const taxa = 5.0; // Fixed delivery fee
    return { subtotal, taxa, total: subtotal + taxa };
  };

  const { subtotal, taxa, total } = getCartTotals();

  const handleCheckoutWhatsApp = () => {
    if (!customerName || !customerPhone || !customerAddress || !paymentMethod) {
      toast.error("PREENCHA TODOS OS DADOS PARA FINALIZAR.");
      return;
    }

    const itemLines = cart
      .map((i) => ` - ${i.quantity}x ${i.product.name} (R$ ${i.product.price.toFixed(2).replace(".", ",")})${i.side.id !== "nenhum" ? ` - C/ ${i.side.name}` : ""}`)
      .join("\n");
      
    const kitchenLines = cart
      .map((i) => `${i.quantity} ${i.product.name}${i.side.id !== "nenhum" ? ` (c/ ${i.side.name})` : ""}`)
      .join(", ");

    const text = `🔥 PEDIDO BRUTO - APOLO CHURRASQUINHO 🔥\n` +
      `👤 CLIENTE: ${customerName} | 📞 CONTATO: ${customerPhone}\n` +
      `📋 RESUMO:\n${itemLines}\n` +
      `💰 FINANCEIRO: Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")} | Taxa: R$ ${taxa.toFixed(2).replace(".", ",")} | TOTAL: R$ ${total.toFixed(2).replace(".", ",")} | Pgto: ${paymentMethod}\n` +
      `📍 ENTREGA: ${customerAddress}\n` +
      `👨‍🍳 COZINHA: ${kitchenLines}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedText}`;
    
    toast.success("REDIRECIONANDO PARA O WHATSAPP...", {
      description: "Prepara a fome!"
    });
    
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsCheckoutOpen(false);
      setCart([]); 
    }, 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-32 font-sans selection:bg-red-600 selection:text-white">
      {/* HEADER BRUTALISTA */}
      <header className="relative border-b-8 border-red-600 bg-zinc-950 z-40 overflow-hidden">
        {/* Typographic Depth */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] overflow-hidden">
          <h1 className="text-[10vw] font-black leading-none text-white tracking-tighter mix-blend-overlay uppercase">FOGO</h1>
        </div>
        
        <div className="container mx-auto px-4 py-4 md:py-8 relative z-10 flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6">
          
          {/* Brand/Logo */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full">
            <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0 border-4 border-zinc-800 bg-black overflow-hidden group shadow-[8px_8px_0px_#000]">
               <Image 
                src="/images/LOGO.jpg" 
                alt="Apolo Logo" 
                fill 
                className="object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                sizes="(max-width: 640px) 128px, 192px"
                priority
              />
            </div>
            
            <div className="flex flex-col space-y-4 max-w-2xl">
              <Badge className="w-fit rounded-none bg-red-600 text-white border-none font-black uppercase tracking-[0.2em] text-xs px-4 py-2 hover:bg-red-700">
                <Store className="w-3 h-3 mr-2 inline" /> Braseiro Aceso
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter text-white uppercase leading-none">
                Apolo<span className="text-red-600">.</span>Churras
              </h1>
            </div>
          </div>

          {/* Horários / Infos extras */}
          <div className="shrink-0 w-full xl:w-auto flex flex-col gap-3">
            {/* Info badges acima dos horários */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-2 border-2 border-zinc-800 px-3 py-2 uppercase font-bold text-white bg-zinc-900">
                <Clock className="w-3 h-3 text-red-500" /> 14-29 Minutos
              </span>
              <span className="flex items-center gap-2 border-2 border-zinc-800 px-3 py-2 uppercase font-bold text-white bg-zinc-900">
                <MapPin className="w-3 h-3 text-red-500" /> São Mateus, SP
              </span>
            </div>
            <details className="group cursor-pointer w-full border-4 border-zinc-800 bg-black p-4 md:p-6 hover:border-red-600 transition-colors shadow-[8px_8px_0px_#000]">
              <summary className="list-none flex items-center justify-between gap-8 text-sm md:text-base font-black text-white uppercase tracking-widest">
                <span>Horários de Funcionamento</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-red-600" />
              </summary>
              <div className="pt-4 mt-4 border-t-2 border-zinc-800 text-xs md:text-sm font-mono space-y-3 text-zinc-400 font-bold">
                <div className="flex justify-between gap-12"><span className="text-white">SEG A SÁB</span><span>11:00–15:30</span></div>
                <div className="flex justify-between gap-12 text-red-500 border-t border-zinc-800/50 pt-3 mt-3"><span>DOMINGO</span><span>FECHADO</span></div>
              </div>
            </details>
          </div>

        </div>
      </header>

      {/* BODY - Asymmetric 90/10 Layout */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* EIXO ESQUERDO: Menu Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="sticky top-12 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-4 pb-6 lg:pb-0 no-scrollbar">
              <h2 className="hidden lg:block text-sm font-black tracking-[0.25em] text-zinc-500 uppercase mb-4">Categorias</h2>
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 flex items-center justify-between px-6 py-5 transition-all duration-300 font-black uppercase tracking-widest text-left group border-4 ${
                    activeCategory === category.id 
                      ? "bg-red-600 border-red-600 text-white shadow-[8px_8px_0px_#7f1d1d] lg:translate-x-4" 
                      : "bg-black border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                  {activeCategory === category.id && <ArrowRight className="w-5 h-5 hidden lg:block" />}
                </button>
              ))}
            </div>
          </div>

          {/* EIXO DIREITO: Vertical Narrative */}
          <div className="lg:w-3/4 space-y-16 md:space-y-32">
            {PRODUCTS.filter((p) => p.category === activeCategory).map((product, idx) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col md:flex-row gap-8 items-center md:items-stretch pt-8 md:pt-0"
              >
                {/* Backdrop Colossal Typo Price */}
                <div className="absolute top-0 right-0 pointer-events-none overflow-hidden h-[150%] w-full flex items-center justify-end z-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                  <span className="text-4xl md:text-6xl lg:text-8xl font-black leading-none text-white tracking-tighter">
                    {product.price.toString().split('.')[0]}
                  </span>
                </div>

                {/* Bloco de Imagem Brutalista */}
                <div className="relative w-full md:w-[45%] aspect-square shrink-0 z-10 overflow-hidden border-4 border-zinc-800 bg-black group-hover:border-red-600 transition-colors duration-500 shadow-[12px_12px_0px_#000] group-hover:shadow-[16px_16px_0px_#dc2626]">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover scale-100 group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {product.highlight && (
                    <div className="absolute top-6 left-6 bg-red-600 text-white text-xs font-black uppercase tracking-[0.2em] py-2 px-4 shadow-[4px_4px_0px_#000]">
                      Destaque
                    </div>
                  )}
                </div>

                {/* Conteúdo do Produto */}
                <div className="flex flex-col justify-center w-full md:w-[55%] z-10 relative space-y-6 md:pl-8">
                  <div>
                    <h3 className="font-black text-xl md:text-2xl leading-none text-white uppercase tracking-tighter group-hover:text-red-500 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-zinc-400 mt-6 text-sm md:text-base font-medium leading-relaxed font-sans max-w-lg">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 mt-auto border-t-4 border-zinc-800">
                    <span className="font-black text-xl md:text-2xl text-white tracking-tighter flex items-end gap-2">
                      <span className="text-sm md:text-base text-red-500 mb-1">R$</span>
                      {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    
                    <Button 
                      onClick={() => handleOpenProduct(product)}
                      className="rounded-none h-16 px-8 bg-white text-black hover:bg-red-600 hover:text-white font-black uppercase tracking-widest text-sm transition-all shadow-[6px_6px_0px_#000] hover:shadow-[6px_6px_0px_#b91c1c] border-4 border-transparent hover:border-black w-full sm:w-auto"
                    >
                      Pedir <ArrowRight className="w-5 h-5 ml-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FLOATING CART SUMMARY (BRUTALIST) */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-500">
          <Button 
            onClick={() => setIsCheckoutOpen(true)}
            className="w-full h-20 md:h-28 rounded-none bg-red-600 text-white hover:bg-red-700 flex items-center justify-between px-6 md:px-12 lg:px-24 border-t-8 border-red-900 group"
          >
            <div className="flex items-center gap-6 md:gap-8">
              <div className="relative p-3 md:p-4 bg-red-900 border-4 border-black shadow-[4px_4px_0px_#000] group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-white" />
                <span className="absolute -top-4 -right-4 bg-black text-white text-xs md:text-sm w-8 h-8 flex items-center justify-center font-black border-2 border-red-600">
                  {cart.length}
                </span>
              </div>
              <div className="flex flex-col items-start uppercase tracking-[0.1em] md:tracking-[0.2em]">
                <span className="font-black text-xl md:text-3xl leading-none">Ver Carrinho</span>
                <span className="text-xs md:text-sm font-mono opacity-80 mt-1">{cart.length} itens no braseiro</span>
              </div>
            </div>
            <span className="font-black text-3xl md:text-5xl tracking-tighter bg-black px-6 py-2 md:py-4 border-4 border-red-900 shadow-[6px_6px_0px_#000]">
              {formatPrice(subtotal)}
            </span>
          </Button>
        </div>
      )}

      {/* PRODUCT UPSELL DIALOG */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-2xl bg-zinc-950 border-8 border-zinc-800 rounded-none shadow-[24px_24px_0px_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden">
          {selectedProduct && (
            <>
              <div className="relative w-full h-48 sm:h-72 bg-black border-b-8 border-red-600">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover opacity-60 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent flex flex-col justify-end p-6 md:p-10">
                  <Badge className="w-fit mb-3 bg-red-600 text-white rounded-none border-none uppercase tracking-widest text-xs font-black py-1 px-3">
                    Adicionar
                  </Badge>
                  <DialogTitle className="text-4xl sm:text-6xl font-black uppercase text-white tracking-tighter leading-[0.9]">
                    {selectedProduct.name}
                  </DialogTitle>
                </div>
              </div>

              <div className="p-6 md:p-10 space-y-8 bg-zinc-950">
                <DialogDescription className="text-lg font-medium text-zinc-400 font-sans">
                  Deseja turbinar esse pedido com algum adicional?
                </DialogDescription>
                
                <div className="space-y-4">
                  <Label className="font-black text-white uppercase tracking-[0.2em] text-sm md:text-base">Acompanhamentos</Label>
                  <Select value={selectedSide} onValueChange={(val) => setSelectedSide(val as string)}>
                    <SelectTrigger className="w-full h-16 bg-black border-4 border-zinc-800 rounded-none font-bold focus:ring-0 focus:border-red-600 text-white uppercase text-sm transition-all focus:shadow-[6px_6px_0px_#dc2626]">
                      <SelectValue placeholder="Sem adicional" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-4 border-zinc-800 rounded-none text-white font-bold uppercase">
                      {SIDES.map((side) => (
                        <SelectItem key={side.id} value={side.id} className="cursor-pointer focus:bg-red-600 focus:text-white rounded-none py-4 text-sm md:text-base">
                          {side.name} {side.price > 0 ? `(+ ${formatPrice(side.price)})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter className="p-6 md:p-10 bg-black border-t-8 border-zinc-900 flex-col sm:flex-row sm:justify-between items-center w-full gap-6">
                <div className="flex flex-col items-start w-full sm:w-auto">
                  <span className="text-sm uppercase font-black tracking-widest text-zinc-500 mb-1">Custo do Item</span>
                  <span className="font-black text-4xl md:text-5xl text-red-500 tracking-tighter">
                    {formatPrice(selectedProduct.price + (SIDES.find((s: typeof SIDES[0]) => s.id === selectedSide)?.price || 0))}
                  </span>
                </div>
                <Button onClick={handeAddToCart} className="h-16 md:h-20 px-10 rounded-none bg-white text-black hover:bg-red-600 hover:text-white font-black uppercase tracking-[0.2em] transition-all shadow-[8px_8px_0px_#dc2626] border-4 border-transparent w-full sm:w-auto text-lg">
                   Colocar no Prato <Flame className="w-6 h-6 ml-3" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CHECKOUT DRAWER */}
      <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl h-full border-l-8 border-zinc-800 bg-zinc-950 overflow-y-auto rounded-none p-0 flex flex-col">
          <SheetHeader className="text-left bg-black p-6 md:p-10 border-b-8 border-red-600 shrink-0 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <SheetTitle className="text-4xl md:text-6xl font-black uppercase tracking-tighter flex items-center gap-4 text-white">
                <ShoppingCart className="w-8 h-8 md:w-12 md:h-12 text-red-600" />
                Pagamento
              </SheetTitle>
              <SheetDescription className="text-zinc-500 font-mono text-sm tracking-widest uppercase font-bold">
                Finalize seu churrasco agora
              </SheetDescription>
            </div>
            <Flame className="absolute -right-12 -bottom-12 w-64 h-64 text-red-600/10" />
          </SheetHeader>
          
          <div className="flex-1 p-6 md:p-10 space-y-12">
            {/* ITENS */}
            <div className="space-y-6">
              <h3 className="font-black text-sm tracking-[0.3em] text-zinc-500 border-b-4 border-zinc-800 pb-4">RESUMO DA FOME</h3>
              <div className="space-y-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-start group">
                    <div className="flex-1">
                      <span className="font-black text-white uppercase text-base sm:text-lg leading-tight block group-hover:text-red-500 transition-colors">
                        <span className="text-red-500 mr-3">{item.quantity}X</span>
                        {item.product.name}
                      </span>
                      {item.side.id !== "nenhum" && (
                        <p className="text-xs font-mono text-zinc-500 mt-2 uppercase font-bold">+ {item.side.name}</p>
                      )}
                    </div>
                    <span className="font-black text-white text-lg ml-4">{formatPrice(item.totalItemPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="space-y-8">
              <h3 className="font-black text-sm tracking-[0.3em] text-zinc-500 border-b-4 border-zinc-800 pb-4">SEUS DADOS</h3>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs uppercase font-black text-zinc-400 tracking-widest">Nome do Chefe</Label>
                  <Input 
                    id="name" 
                    placeholder="JOÃO SILVA" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-16 bg-black border-4 border-zinc-800 rounded-none text-white font-black uppercase focus-visible:ring-0 focus-visible:border-red-600 focus-visible:shadow-[6px_6px_0px_#dc2626] transition-all text-lg px-4"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-xs uppercase font-black text-zinc-400 tracking-widest">Celular (WhatsApp)</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(11) 99999-9999" 
                    value={customerPhone} 
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="h-16 bg-black border-4 border-zinc-800 rounded-none text-white font-black uppercase focus-visible:ring-0 focus-visible:border-red-600 focus-visible:shadow-[6px_6px_0px_#dc2626] transition-all text-lg px-4"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="address" className="text-xs uppercase font-black text-zinc-400 tracking-widest">Local do Braseiro (Endereço)</Label>
                  <Input 
                    id="address" 
                    placeholder="RUA, NÚMERO, REF" 
                    value={customerAddress} 
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="h-16 bg-black border-4 border-zinc-800 rounded-none text-white font-black uppercase focus-visible:ring-0 focus-visible:border-red-600 focus-visible:shadow-[6px_6px_0px_#dc2626] transition-all text-lg px-4"
                  />
                </div>
              </div>
            </div>

            {/* PAGAMENTO */}
            <div className="space-y-6">
              <h3 className="font-black text-sm tracking-[0.3em] text-zinc-500 border-b-4 border-zinc-800 pb-4">ACERTO</h3>
              <Select value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as string)}>
                <SelectTrigger className="w-full h-16 bg-black border-4 border-zinc-800 rounded-none font-black text-white uppercase focus:ring-0 focus:border-red-600 focus:shadow-[6px_6px_0px_#dc2626] transition-all text-lg px-4">
                  <SelectValue placeholder="COMO VAI PAGAR?" />
                </SelectTrigger>
                <SelectContent className="bg-black border-4 border-zinc-800 rounded-none text-white font-black uppercase">
                  <SelectItem value="Pix" className="rounded-none py-4 text-base focus:bg-red-600 focus:text-white">💳 Pix</SelectItem>
                  <SelectItem value="Cartão de Crédito/Débito" className="rounded-none py-4 text-base focus:bg-red-600 focus:text-white">💳 Maquininha Cartão</SelectItem>
                  <SelectItem value="Dinheiro" className="rounded-none py-4 text-base focus:bg-red-600 focus:text-white">💵 Dinheiro Vivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* TOTAIS */}
            <div className="bg-red-600 border-4 border-red-900 p-6 md:p-8 space-y-4 font-mono shadow-[8px_8px_0px_#000]">
              <div className="flex justify-between text-sm md:text-base font-bold text-white/80 uppercase">
                <span>Carnes</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base font-bold text-white/80 uppercase">
                <span>Entrega</span>
                <span>{formatPrice(taxa)}</span>
              </div>
              <div className="flex justify-between text-3xl md:text-5xl font-black pt-6 border-t-4 border-red-800 mt-6 text-white font-sans tracking-tighter">
                <span>TOTAL</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          
          <SheetFooter className="shrink-0 p-6 md:p-10 bg-black border-t-8 border-zinc-900">
            <Button 
              onClick={handleCheckoutWhatsApp} 
              className="w-full h-20 md:h-24 rounded-none bg-white text-black hover:bg-red-600 hover:text-white font-black uppercase text-2xl tracking-[0.1em] transition-all border-4 border-transparent hover:border-black shadow-[8px_8px_0px_#dc2626] active:translate-y-2 active:shadow-[4px_4px_0px_#dc2626]"
            >
              FECHAR E ENVIAR <ArrowRight className="w-8 h-8 ml-4" />
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
