"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Espetinho de Carne Bovina", category: "Espetinhos", price: 16.0, addOn: "Todos" },
  { id: 2, name: "Pão de Alho Especial", category: "Espetinhos", price: 10.0, addOn: "Apenas Vinagrete" },
  { id: 3, name: "Prato Feito: Picanha na Brasa", category: "Pratos", price: 35.0, addOn: "Nenhum" },
  { id: 4, name: "Refrigerante 2L", category: "Bebidas", price: 12.0, addOn: "Nenhum" },
];

export default function AdminMenu() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const openNewItemModal = () => {
    setEditingItem(null);
    setIsItemModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const openDeleteModal = (item: any) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      toast.success("Item atualizado no braseiro!", { description: "As alterações foram salvas com sucesso." });
    } else {
      toast.success("Item criado no fogo!", { description: "O novo produto já está visível para os clientes." });
    }
    setIsItemModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    toast.error("Item destruído!", { description: "O produto virou cinzas e sumiu do catálogo." });
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="border-b-8 border-red-600 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white uppercase leading-none">
            Mestre do<br className="hidden md:block"/><span className="text-red-600">Cardápio</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs md:text-sm tracking-[0.2em] font-bold uppercase mt-4">
            ADICIONE, EDITE OU REMOVA PRODUTOS DA BRASA
          </p>
        </div>
        <Button onClick={openNewItemModal} className="h-12 font-black uppercase tracking-widest text-xs rounded-none bg-red-600 hover:bg-white hover:text-red-600 text-white border-4 border-red-900 hover:border-white shadow-[6px_6px_0px_#000] hover:shadow-[6px_6px_0px_#dc2626] transition-all gap-3">
          <Plus className="w-5 h-5" /> Inserir Carne
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-black p-2 border-4 border-zinc-800 shadow-[6px_6px_0px_#000] w-full max-w-xl focus-within:border-red-600 focus-within:shadow-[6px_6px_0px_#dc2626] transition-all">
        <Search className="w-6 h-6 text-zinc-500 ml-4" />
        <Input 
          placeholder="BUSCAR NO CARDÁPIO..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-0 bg-transparent text-white focus-visible:ring-0 shadow-none font-black tracking-widest uppercase placeholder:text-zinc-700 h-10 text-lg" 
        />
      </div>

      <div className="border-4 border-zinc-800 bg-black shadow-[12px_12px_0px_#000] overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-zinc-900 border-b-4 border-zinc-800">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="font-black text-white text-xs tracking-[0.2em] uppercase py-4">Produto</TableHead>
              <TableHead className="font-black text-white text-xs tracking-[0.2em] uppercase py-4">Categoria</TableHead>
              <TableHead className="font-black text-white text-xs tracking-[0.2em] uppercase py-4">Preço</TableHead>
              <TableHead className="font-black text-white text-xs tracking-[0.2em] uppercase py-4">Adicionais</TableHead>
              <TableHead className="text-right font-black text-white text-xs tracking-[0.2em] uppercase py-4">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="border-t-2 border-zinc-800 hover:bg-zinc-900/50 transition-colors group">
                <TableCell className="font-black text-white text-sm tracking-widest uppercase py-4">{product.name}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className="rounded-none bg-zinc-800 text-zinc-300 font-mono border-zinc-700 uppercase">{product.category}</Badge>
                </TableCell>
                <TableCell className="font-black text-white py-4">R$ {product.price.toFixed(2).replace(".", ",")}</TableCell>
                <TableCell className="text-zinc-500 font-mono text-xs uppercase py-4">{product.addOn}</TableCell>
                <TableCell className="text-right py-4">
                  <div className="flex justify-end gap-3">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(product)} className="rounded-none hover:bg-white hover:text-black border-2 border-transparent hover:border-black transition-all">
                      <Pencil className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openDeleteModal(product)} className="rounded-none text-zinc-600 hover:text-white hover:bg-red-600 border-2 border-transparent hover:border-red-900 transition-all">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-zinc-600 font-black uppercase tracking-widest">
                  NENHUMA CARNE ENCONTRADA NA GRELHA.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Item Modal (Create/Edit) */}
      <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
        <DialogContent className="sm:max-w-2xl bg-black border-4 border-zinc-800 rounded-none shadow-[16px_16px_0px_#000] p-0 overflow-hidden">
          <div className="bg-zinc-900 border-b-4 border-zinc-800 p-6 md:p-8">
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-white">
              {editingItem ? "Editar Corte" : "Forjar Novo Corte"}
            </DialogTitle>
            <DialogDescription className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-2 border-l-2 border-red-600 pl-3">
              Insira os dados da carne para o catálogo.
            </DialogDescription>
          </div>
          
          <form onSubmit={handleSaveItem} className="space-y-8 p-6 md:p-8">
            {/* Image Upload Area */}
            <div className="border-4 border-dashed border-zinc-800 bg-zinc-950 p-8 flex flex-col items-center justify-center text-center gap-4 hover:border-red-600 transition-colors cursor-pointer group">
              <div className="w-16 h-16 bg-black border-4 border-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-900 transition-colors shadow-[4px_4px_0px_#000]">
                <ImageIcon className="w-8 h-8 text-zinc-500 group-hover:text-white" />
              </div>
              <div className="font-black uppercase tracking-widest text-white text-sm">
                Solte a Foto Oculta Aqui <br/> <span className="text-zinc-600 text-xs">Ou clique para caçar no PC</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3 sm:col-span-2">
                <Label htmlFor="name" className="font-black uppercase tracking-widest text-zinc-400 text-xs">Nome de Guerra *</Label>
                <Input id="name" defaultValue={editingItem?.name} required placeholder="EX: ESPETINHO MATADOR DE QUEIJO COALHO" className="rounded-none border-4 border-zinc-800 bg-black text-white h-12 uppercase tracking-widest font-bold focus-visible:ring-0 focus-visible:border-red-600 shadow-[4px_4px_0px_#000]" />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="category" className="font-black uppercase tracking-widest text-zinc-400 text-xs">Açougue (Categoria) *</Label>
                <Select defaultValue={editingItem?.category || "Espetinhos"}>
                  <SelectTrigger className="rounded-none border-4 border-zinc-800 bg-black text-white h-12 uppercase tracking-widest font-bold focus:ring-0 focus:border-red-600 shadow-[4px_4px_0px_#000]">
                    <SelectValue placeholder="SELECIONE..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-4 border-zinc-800 bg-black text-white font-black uppercase tracking-widest">
                    <SelectItem value="Espetinhos">Espetinhos</SelectItem>
                    <SelectItem value="Pratos">Pratos Feitos</SelectItem>
                    <SelectItem value="Bebidas">Bebidas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="price" className="font-black uppercase tracking-widest text-zinc-400 text-xs">Preço Sangrento (R$) *</Label>
                <Input id="price" type="number" step="0.01" defaultValue={editingItem?.price} required placeholder="0.00" className="rounded-none border-4 border-zinc-800 bg-black text-white h-12 uppercase tracking-widest font-bold focus-visible:ring-0 focus-visible:border-red-600 shadow-[4px_4px_0px_#000]" />
              </div>

              <div className="space-y-3 sm:col-span-2">
                <Label htmlFor="addons" className="font-black uppercase tracking-widest text-zinc-400 text-xs">Regra de Acompanhamentos</Label>
                <Select defaultValue="Todos">
                  <SelectTrigger className="rounded-none border-4 border-zinc-800 bg-black text-white h-12 uppercase tracking-widest font-bold focus:ring-0 focus:border-red-600 shadow-[4px_4px_0px_#000]">
                    <SelectValue placeholder="SELECIONE A LEI" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-4 border-zinc-800 bg-black text-white font-black uppercase tracking-widest">
                    <SelectItem value="Todos">Kit Completo (Farofa, Vinagrete...)</SelectItem>
                    <SelectItem value="Apenas Vinagrete">Seco (Só Carne e Vinagrete)</SelectItem>
                    <SelectItem value="Nenhum">Nulo (Bebidas/Próprios)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter className="pt-6 border-t-4 border-zinc-800 gap-4 sm:gap-0">
              <Button type="button" variant="outline" onClick={() => setIsItemModalOpen(false)} className="rounded-none border-4 border-zinc-800 h-14 bg-transparent text-white font-black uppercase tracking-widest hover:bg-zinc-800 hover:text-white">
                Recuar
              </Button>
              <Button type="submit" className="rounded-none border-4 border-red-900 h-14 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-white hover:text-red-600 hover:border-white shadow-[6px_6px_0px_#000]">
                {editingItem ? "Reescrever" : "Forjar Produto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-md bg-black border-4 border-red-600 rounded-none shadow-[16px_16px_0px_#dc2626] p-0">
          <div className="bg-red-950/50 p-6 md:p-8">
            <DialogTitle className="text-3xl font-black uppercase tracking-tighter text-red-500 flex items-center gap-4">
              <Trash2 className="w-8 h-8" /> EXTERMINAR CARNE?
            </DialogTitle>
            <DialogDescription className="text-zinc-300 font-bold uppercase tracking-widest mt-4">
              A carne <span className="text-white bg-red-600 px-2 font-black">{itemToDelete?.name}</span> virará cinzas.
            </DialogDescription>
          </div>
          <div className="p-6 bg-zinc-950 text-zinc-500 text-xs font-mono uppercase tracking-[0.2em] border-y-4 border-red-900/50">
            Aviso Letal: Esta ação não pode ser desfeita.
          </div>
          <DialogFooter className="p-6 md:p-8 flex gap-4 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="rounded-none border-4 border-zinc-800 h-14 bg-transparent text-white font-black uppercase tracking-widest hover:bg-zinc-800 hover:text-white">
              Cancelar Abate
            </Button>
            <Button type="button" onClick={handleDeleteConfirm} className="rounded-none border-4 border-red-900 h-14 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-500 shadow-[6px_6px_0px_#000]">
              Mandar pro Fogo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
