import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Leaf, 
  MapPin, 
  Camera, 
  Save, 
  Plus,
  Building,
  Phone,
  Mail,
  Clock,
  Users,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GardenProfile {
  name: string;
  address: string;
  description: string;
  coordinator: string;
  phone: string;
  email: string;
  openHours: string;
  capacity: string;
  objectives: string;
  image?: string;
}

const Producer = () => {
  const [gardenData, setGardenData] = useState<GardenProfile>({
    name: "",
    address: "",
    description: "",
    coordinator: "",
    phone: "",
    email: "",
    openHours: "",
    capacity: "",
    objectives: ""
  });

  const [isEditing, setIsEditing] = useState(true);
  const { toast } = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gardenData.name || !gardenData.address || !gardenData.coordinator) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsEditing(false);
    toast({
      title: "Perfil salvo com sucesso!",
      description: "Sua horta foi cadastrada e estará visível no mapa.",
    });
  };

  const features = [
    {
      icon: Target,
      title: "Impacto Social",
      description: "Contribua para o ODS 2 promovendo segurança alimentar na sua comunidade"
    },
    {
      icon: Users,
      title: "Conectar Pessoas",
      description: "Una produtores e consumidores locais através da agricultura sustentável"
    },
    {
      icon: Leaf,
      title: "Agricultura Sustentável",
      description: "Promova práticas ecológicas e educação ambiental"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <Building className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Área do Produtor
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cadastre sua horta comunitária e conecte-se com a rede de produtores sustentáveis
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center border-none shadow-soft">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Garden Profile Form */}
        <Card className="shadow-elegant">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Leaf className="w-6 h-6 text-primary" />
                  Perfil da Horta Comunitária
                </CardTitle>
                <CardDescription>
                  Complete as informações para cadastrar sua horta no sistema
                </CardDescription>
              </div>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline">
                  Editar
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Básicas</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome da Horta *</Label>
                      <Input
                        id="name"
                        placeholder="Ex: Horta Comunitária Vila Verde"
                        value={gardenData.name}
                        onChange={(e) => setGardenData({ ...gardenData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="coordinator">Nome do Coordenador *</Label>
                      <Input
                        id="coordinator"
                        placeholder="Seu nome completo"
                        value={gardenData.coordinator}
                        onChange={(e) => setGardenData({ ...gardenData, coordinator: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Input
                      id="address"
                      placeholder="Rua, número, bairro, cidade, estado"
                      value={gardenData.address}
                      onChange={(e) => setGardenData({ ...gardenData, address: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição da Horta</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva sua horta, objetivos, metodologia utilizada..."
                      value={gardenData.description}
                      onChange={(e) => setGardenData({ ...gardenData, description: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações de Contato</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="(00) 00000-0000"
                        value={gardenData.phone}
                        onChange={(e) => setGardenData({ ...gardenData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contato@horta.com"
                        value={gardenData.email}
                        onChange={(e) => setGardenData({ ...gardenData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Operational Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Informações Operacionais</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="openHours">Horário de Funcionamento</Label>
                      <Input
                        id="openHours"
                        placeholder="Ex: Seg-Sex: 8h-18h | Sáb: 8h-14h"
                        value={gardenData.openHours}
                        onChange={(e) => setGardenData({ ...gardenData, openHours: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacidade/Área</Label>
                      <Input
                        id="capacity"
                        placeholder="Ex: 50 participantes ou 500m²"
                        value={gardenData.capacity}
                        onChange={(e) => setGardenData({ ...gardenData, capacity: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="objectives">Objetivos e Metas</Label>
                    <Textarea
                      id="objectives"
                      placeholder="Descreva os objetivos sociais e ambientais da sua horta..."
                      value={gardenData.objectives}
                      onChange={(e) => setGardenData({ ...gardenData, objectives: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Imagem da Horta</h3>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Adicione uma foto da sua horta para atrair mais participantes
                    </p>
                    <Button variant="outline" type="button">
                      <Plus className="w-4 h-4 mr-2" />
                      Escolher Foto
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Perfil
                  </Button>
                </div>
              </form>
            ) : (
              // Display Mode
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Garden Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{gardenData.name || "Nome da Horta"}</h3>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                        <span className="text-sm">{gardenData.address || "Endereço não informado"}</span>
                      </div>
                    </div>
                    
                    {gardenData.description && (
                      <p className="text-sm text-muted-foreground">
                        {gardenData.description}
                      </p>
                    )}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="font-medium">Coordenador:</span>
                      <span>{gardenData.coordinator || "Não informado"}</span>
                    </div>
                    
                    {gardenData.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{gardenData.phone}</span>
                      </div>
                    )}
                    
                    {gardenData.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <span>{gardenData.email}</span>
                      </div>
                    )}
                    
                    {gardenData.openHours && (
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{gardenData.openHours}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {gardenData.objectives && (
                  <div>
                    <h4 className="font-semibold mb-2">Objetivos</h4>
                    <p className="text-sm text-muted-foreground">{gardenData.objectives}</p>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <Badge className="bg-primary text-primary-foreground">
                    Horta Ativa
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Producer;