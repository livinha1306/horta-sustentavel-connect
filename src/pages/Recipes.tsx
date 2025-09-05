import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ChefHat, 
  Clock, 
  Users, 
  Sparkles, 
  RefreshCw,
  Leaf,
  ArrowRight,
  Star
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Recipe {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  servings: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  usedVegetables: string[];
  rating: number;
}

const Recipes = () => {
  const [recipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "Salada Verde Nutritiva",
      ingredients: [
        "2 pés de alface",
        "1 maço de cebolinha",
        "Azeite extra virgem",
        "Limão",
        "Sal a gosto"
      ],
      instructions: [
        "Lave bem a alface e separe as folhas",
        "Pique a cebolinha finamente",
        "Misture em uma tigela grande",
        "Tempere com azeite, limão e sal",
        "Sirva imediatamente"
      ],
      cookTime: "10 min",
      servings: 4,
      difficulty: "Fácil",
      usedVegetables: ["Alface", "Cebolinha"],
      rating: 4.8
    },
    {
      id: 2,
      title: "Molho de Tomate Caseiro",
      ingredients: [
        "8 tomates maduros",
        "1 cebola média",
        "3 dentes de alho",
        "Manjericão fresco",
        "Azeite",
        "Sal e pimenta"
      ],
      instructions: [
        "Escalde os tomates em água fervente",
        "Retire a pele e pique grosseiramente",
        "Refogue a cebola e alho no azeite",
        "Adicione os tomates e temperos",
        "Cozinhe por 20-25 minutos",
        "Finalize com manjericão fresco"
      ],
      cookTime: "35 min",
      servings: 6,
      difficulty: "Médio",
      usedVegetables: ["Tomate"],
      rating: 4.9
    },
    {
      id: 3,
      title: "Cebolinha Refogada",
      ingredients: [
        "3 maços de cebolinha",
        "2 dentes de alho",
        "Azeite",
        "Sal",
        "Pimenta do reino"
      ],
      instructions: [
        "Corte a cebolinha em pedaços de 2cm",
        "Aqueça o azeite na panela",
        "Refogue o alho até dourar",
        "Adicione a cebolinha e refogue rapidamente",
        "Tempere com sal e pimenta",
        "Sirva como acompanhamento"
      ],
      cookTime: "8 min",
      servings: 3,
      difficulty: "Fácil",
      usedVegetables: ["Cebolinha"],
      rating: 4.5
    }
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewRecipes = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Novas receitas geradas!",
        description: "A IA criou novas receitas baseadas nas suas hortaliças.",
      });
    }, 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-primary text-primary-foreground";
      case "Médio": return "bg-accent text-accent-foreground";
      case "Difícil": return "bg-earth text-earth-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-elegant">
              <ChefHat className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Receitas Sugeridas
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Nossa IA cria receitas personalizadas baseadas nas hortaliças que você cultiva
          </p>
          
          <Button 
            onClick={generateNewRecipes} 
            disabled={isGenerating}
            size="lg"
            className="text-lg px-8"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Gerando receitas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Gerar Novas Receitas
              </>
            )}
          </Button>
        </div>

        {/* Available Vegetables */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              Suas Hortaliças Disponíveis
            </CardTitle>
            <CardDescription>
              Receitas criadas a partir destes ingredientes da sua horta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Alface", "Tomate", "Cebolinha"].map((vegetable) => (
                <Badge key={vegetable} variant="secondary" className="text-sm">
                  <Leaf className="w-3 h-3 mr-1" />
                  {vegetable}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recipes Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{recipe.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings} porções
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {recipe.rating}
                      </div>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {recipe.usedVegetables.map((vegetable) => (
                    <Badge key={vegetable} variant="outline" className="text-xs">
                      {vegetable}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-primary" />
                    Ingredientes
                  </h4>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <ArrowRight className="w-3 h-3 mr-2 mt-0.5 text-primary flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Separator />
                
                {/* Instructions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    Modo de Preparo
                  </h4>
                  <ol className="space-y-2">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start">
                        <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {recipes.length === 0 && (
          <Card className="text-center py-16">
            <CardContent>
              <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-xl mb-2">Nenhuma receita disponível</CardTitle>
              <CardDescription className="mb-4">
                Cadastre suas hortaliças no painel para receber receitas personalizadas
              </CardDescription>
              <Button asChild>
                <a href="/dashboard">
                  <Leaf className="w-4 h-4 mr-2" />
                  Ir para o Painel
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Recipes;