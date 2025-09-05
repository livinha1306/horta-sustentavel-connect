import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Phone, 
  Mail, 
  User, 
  Navigation,
  Leaf,
  Clock,
  Star
} from "lucide-react";

interface CommunityGarden {
  id: number;
  name: string;
  address: string;
  coordinator: string;
  contact: {
    phone?: string;
    email?: string;
  };
  description: string;
  vegetables: string[];
  openHours: string;
  rating: number;
  distance: string;
  status: "active" | "planning" | "maintenance";
}

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGarden, setSelectedGarden] = useState<CommunityGarden | null>(null);
  
  const [gardens] = useState<CommunityGarden[]>([
    {
      id: 1,
      name: "Horta Comunitária Vila Verde",
      address: "Rua das Flores, 123 - Vila Verde",
      coordinator: "Maria Silva",
      contact: {
        phone: "(11) 99999-0001",
        email: "maria@vilaverde.com"
      },
      description: "Horta comunitária com foco em agricultura orgânica e sustentável. Oferece workshops e cursos sobre plantio.",
      vegetables: ["Alface", "Tomate", "Cenoura", "Beterraba", "Couve"],
      openHours: "Seg-Sex: 8h-18h | Sáb: 8h-14h",
      rating: 4.8,
      distance: "1.2 km",
      status: "active"
    },
    {
      id: 2,
      name: "Jardim Sustentável Centro",
      address: "Av. Central, 456 - Centro",
      coordinator: "João Santos",
      contact: {
        phone: "(11) 99999-0002",
        email: "joao@jardimcentro.org"
      },
      description: "Espaço dedicado ao cultivo colaborativo no coração da cidade. Promove integração social e educação ambiental.",
      vegetables: ["Manjericão", "Hortelã", "Pimentão", "Abobrinha"],
      openHours: "Todos os dias: 7h-19h",
      rating: 4.6,
      distance: "2.8 km",
      status: "active"
    },
    {
      id: 3,
      name: "Horta Escolar São João",
      address: "Rua São João, 789 - Bairro Novo",
      coordinator: "Ana Costa",
      contact: {
        email: "ana@escolasaojoao.edu.br"
      },
      description: "Projeto educativo que envolve alunos e comunidade no cultivo de alimentos saudáveis.",
      vegetables: ["Cebolinha", "Salsa", "Alface", "Rúcula"],
      openHours: "Seg-Sex: 14h-17h",
      rating: 4.9,
      distance: "3.5 km",
      status: "active"
    },
    {
      id: 4,
      name: "Horta Comunitária Esperança",
      address: "Rua da Esperança, 321 - Periferia",
      coordinator: "Carlos Oliveira",
      contact: {
        phone: "(11) 99999-0004"
      },
      description: "Iniciativa comunitária que busca promover segurança alimentar na região. Em fase de planejamento.",
      vegetables: ["Tomate", "Pimentão", "Quiabo"],
      openHours: "Em planejamento",
      rating: 0,
      distance: "4.1 km",
      status: "planning"
    }
  ]);

  const filteredGardens = gardens.filter(garden =>
    garden.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    garden.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    garden.coordinator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-primary text-primary-foreground";
      case "planning": return "bg-accent text-accent-foreground";
      case "maintenance": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Ativa";
      case "planning": return "Planejamento";
      case "maintenance": return "Manutenção";
      default: return "Status";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mapa das Hortas Comunitárias
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encontre hortas comunitárias próximas a você e conecte-se com produtores locais
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, endereço ou coordenador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-10 h-10 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mapa Interativo</h3>
            <p className="text-muted-foreground mb-4">
              Visualização dos pins das hortas comunitárias cadastradas na região
            </p>
            <Button variant="outline">
              <MapPin className="w-4 h-4 mr-2" />
              Ver Mapa Completo
            </Button>
          </CardContent>
        </Card>

        {/* Gardens List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredGardens.map((garden) => (
            <Card 
              key={garden.id} 
              className={`hover:shadow-elegant transition-all duration-300 cursor-pointer ${
                selectedGarden?.id === garden.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedGarden(garden)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      {garden.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {garden.address}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(garden.status)}>
                      {getStatusText(garden.status)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{garden.distance}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {garden.description}
                </p>
                
                {/* Coordinator */}
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-medium">Coordenador:</span>
                  <span className="text-muted-foreground">{garden.coordinator}</span>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-1">
                  {garden.contact.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {garden.contact.phone}
                    </div>
                  )}
                  {garden.contact.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {garden.contact.email}
                    </div>
                  )}
                </div>
                
                {/* Opening Hours */}
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{garden.openHours}</span>
                </div>
                
                {/* Rating */}
                {garden.rating > 0 && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{garden.rating}</span>
                    <span className="text-muted-foreground">avaliação</span>
                  </div>
                )}
                
                {/* Vegetables */}
                <div>
                  <p className="text-sm font-medium mb-2 flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-primary" />
                    Hortaliças disponíveis:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {garden.vegetables.map((vegetable) => (
                      <Badge key={vegetable} variant="secondary" className="text-xs">
                        {vegetable}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGardens.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">Nenhuma horta encontrada</CardTitle>
              <CardDescription className="mb-4">
                Tente uma busca diferente ou verifique se há hortas cadastradas na região
              </CardDescription>
              <Button asChild>
                <a href="/producer">
                  <Leaf className="w-4 h-4 mr-2" />
                  Cadastrar Minha Horta
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Map;