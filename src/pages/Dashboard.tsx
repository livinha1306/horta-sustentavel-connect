import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Leaf, 
  Calendar, 
  Package, 
  TrendingUp,
  BookOpen,
  Camera,
  Edit,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Vegetable {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  planted: string;
  status: "growing" | "ready" | "harvested";
  description?: string;
  image?: string;
}

const Dashboard = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([
    {
      id: 1,
      name: "Alface",
      quantity: 20,
      unit: "plantas",
      planted: "2024-01-15",
      status: "ready",
      description: "Alface crespa orgânica"
    },
    {
      id: 2,
      name: "Tomate",
      quantity: 15,
      unit: "plantas",
      planted: "2024-01-10",
      status: "growing",
      description: "Tomate cereja"
    },
    {
      id: 3,
      name: "Cebolinha",
      quantity: 30,
      unit: "mudas",
      planted: "2024-01-20",
      status: "ready",
      description: "Cebolinha verde"
    }
  ]);

  const [newVegetable, setNewVegetable] = useState({
    name: "",
    quantity: "",
    unit: "plantas",
    description: ""
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddVegetable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVegetable.name || !newVegetable.quantity) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const vegetable: Vegetable = {
      id: vegetables.length + 1,
      name: newVegetable.name,
      quantity: parseInt(newVegetable.quantity),
      unit: newVegetable.unit,
      planted: new Date().toISOString().split('T')[0],
      status: "growing",
      description: newVegetable.description
    };

    setVegetables([...vegetables, vegetable]);
    setNewVegetable({ name: "", quantity: "", unit: "plantas", description: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Hortaliça adicionada!",
      description: `${vegetable.name} foi cadastrada com sucesso.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready": return "bg-primary text-primary-foreground";
      case "growing": return "bg-accent text-accent-foreground";
      case "harvested": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready": return "Pronto";
      case "growing": return "Crescendo";
      case "harvested": return "Colhido";
      default: return "Status";
    }
  };

  const stats = {
    total: vegetables.length,
    ready: vegetables.filter(v => v.status === "ready").length,
    growing: vegetables.filter(v => v.status === "growing").length,
    harvested: vegetables.filter(v => v.status === "harvested").length
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Painel do Usuário</h1>
            <p className="text-muted-foreground">Gerencie suas hortaliças e acompanhe o crescimento</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <a href="/recipes">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver Receitas
              </a>
            </Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Hortaliça
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Nova Hortaliça</DialogTitle>
                  <DialogDescription>
                    Adicione uma nova hortaliça à sua horta
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleAddVegetable} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da hortaliça *</Label>
                    <Input
                      id="name"
                      placeholder="Ex: Alface, Tomate, Cenoura..."
                      value={newVegetable.name}
                      onChange={(e) => setNewVegetable({ ...newVegetable, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantidade *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        placeholder="0"
                        value={newVegetable.quantity}
                        onChange={(e) => setNewVegetable({ ...newVegetable, quantity: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="unit">Unidade</Label>
                      <select
                        id="unit"
                        className="w-full p-2 border border-input rounded-md bg-background"
                        value={newVegetable.unit}
                        onChange={(e) => setNewVegetable({ ...newVegetable, unit: e.target.value })}
                      >
                        <option value="plantas">Plantas</option>
                        <option value="mudas">Mudas</option>
                        <option value="kg">Kg</option>
                        <option value="unidades">Unidades</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição opcional da hortaliça..."
                      value={newVegetable.description}
                      onChange={(e) => setNewVegetable({ ...newVegetable, description: e.target.value })}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">
                      Cadastrar
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Total</span>
              </div>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Crescendo</span>
              </div>
              <div className="text-2xl font-bold text-accent-foreground">{stats.growing}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Prontos</span>
              </div>
              <div className="text-2xl font-bold text-primary">{stats.ready}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Colhidos</span>
              </div>
              <div className="text-2xl font-bold">{stats.harvested}</div>
            </CardContent>
          </Card>
        </div>

        {/* Vegetables Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vegetables.map((vegetable) => (
            <Card key={vegetable.id} className="hover:shadow-soft transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-primary" />
                      {vegetable.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {vegetable.quantity} {vegetable.unit}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(vegetable.status)}>
                    {getStatusText(vegetable.status)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {vegetable.description && (
                  <p className="text-sm text-muted-foreground">
                    {vegetable.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Plantado em {new Date(vegetable.planted).toLocaleDateString('pt-BR')}
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Camera className="w-4 h-4 mr-1" />
                    Foto
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {vegetables.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">Nenhuma hortaliça cadastrada</CardTitle>
              <CardDescription className="mb-4">
                Comece adicionando suas primeiras hortaliças para acompanhar o crescimento
              </CardDescription>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeira Hortaliça
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;