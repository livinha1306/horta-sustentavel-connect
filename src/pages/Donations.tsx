import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Phone, Mail, Clock, Users } from "lucide-react";

const Donations = () => {
  const institutions = [
    {
      id: 1,
      name: "Banco de Alimentos do Paraná",
      description: "Organização que combate o desperdício de alimentos e a fome através da coleta, seleção e distribuição de doações para instituições sociais.",
      address: "Rua das Flores, 123 - Centro, Curitiba - PR",
      phone: "(41) 3333-4444",
      email: "contato@bancoalimentospr.org.br",
      schedule: "Segunda a Sexta: 8h às 17h",
      beneficiaries: "Mais de 50.000 pessoas atendidas mensalmente",
      featured: true,
      website: "https://bancoalimentospr.org.br"
    },
    {
      id: 2,
      name: "Mesa Brasil SESC",
      description: "Programa de segurança alimentar e nutricional que distribui alimentos excedentes para entidades assistenciais.",
      address: "Av. Cândido de Abreu, 200 - Centro Cívico, Curitiba - PR",
      phone: "(41) 3320-3000",
      email: "mesabrasil@sescpr.com.br",
      schedule: "Segunda a Sexta: 7h30 às 18h",
      beneficiaries: "Atende 200+ entidades no Paraná",
      featured: false,
      website: "https://www.sescpr.com.br"
    },
    {
      id: 3,
      name: "Ação da Cidadania",
      description: "Movimento nacional de combate à fome e pela vida, promovendo ações solidárias e sustentáveis.",
      address: "Rua XV de Novembro, 456 - Centro, Curitiba - PR",
      phone: "(41) 3224-5678",
      email: "parana@acaodacidadania.org.br",
      schedule: "Segunda a Sexta: 9h às 16h",
      beneficiaries: "Rede com 30+ organizações parceiras",
      featured: false,
      website: "https://acaodacidadania.org.br"
    },
    {
      id: 4,
      name: "Instituto Pão dos Pobres",
      description: "Instituição centenária dedicada ao atendimento de pessoas em situação de vulnerabilidade social.",
      address: "Rua Conselheiro Laurindo, 800 - Centro, Curitiba - PR",
      phone: "(41) 3323-9876",
      email: "instituto@paodospobres.org.br",
      schedule: "Segunda a Sábado: 8h às 17h",
      beneficiaries: "Atendimento diário a 500+ pessoas",
      featured: false,
      website: "https://paodospobres.org.br"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Doações</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça as instituições parceiras que recebem doações de alimentos e 
            contribuem para combater a fome em nossa comunidade.
          </p>
        </div>

        {/* Institution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {institutions.map((institution) => (
            <Card 
              key={institution.id} 
              className={`h-full transition-all duration-300 hover:shadow-lg ${
                institution.featured 
                  ? "border-primary bg-gradient-to-br from-primary/5 to-secondary/5" 
                  : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center">
                      {institution.name}
                      {institution.featured && (
                        <Heart className="w-5 h-5 text-primary ml-2 fill-current" />
                      )}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {institution.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{institution.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{institution.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{institution.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{institution.schedule}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{institution.beneficiaries}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant={institution.featured ? "default" : "outline"} 
                    className="flex-1"
                    onClick={() => window.open(`tel:${institution.phone.replace(/\D/g, '')}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => window.open(`mailto:${institution.email}`)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    E-mail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-accent/50 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Como Doar?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Entre em contato diretamente com as instituições para saber quais alimentos 
            são necessários e os melhores horários para entrega. Toda doação faz a diferença!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <Heart className="w-4 h-4 mr-2" />
              Agendar Doação
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Seja Voluntário
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;