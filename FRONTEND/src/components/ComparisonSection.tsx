import { 
  MessageSquare, 
  FileText, 
  Bell, 
  Mail, 
  Folder,
  Zap,
  Search,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";

const oldWayPoints = [
  { icon: MessageSquare, text: "Apps dispersos, mente dispersa." },
  { icon: FileText, text: "Conversas e contexto perdidos." },
  { icon: Folder, text: "Busca infinita por arquivos." },
  { icon: Bell, text: "Sobrecarga de notificações." },
  { icon: Mail, text: "Troca constante de contexto." },
  { icon: TrendingUp, text: "Orçamento de software elevado." },
];

const focalWayPoints = [
  { icon: Zap, text: "Centralize sua saúde." },
  { icon: CheckCircle2, text: "Colaboração sem falhas." },
  { icon: Search, text: "Acesso rápido a dados." },
  { icon: Sparkles, text: "Foco total, menos ruído." },
  { icon: TrendingUp, text: "Produtividade elevada." },
  { icon: CheckCircle2, text: "Assinatura eficiente." },
];

const ComparisonSection = () => {
  return (
    <section
      className="min-h-screen py-20 px-4 md:px-8 relative overflow-hidden bg-gradient-transition"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - The Old Way */}
          <div
            className="space-y-6"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-secondary-foreground mb-2">
                A maneira antiga
              </h3>
              <div className="h-1 w-20 bg-chaos-gray rounded-full" />
            </div>

            {oldWayPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-card/80 backdrop-blur-sm shadow-soft"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-secondary-foreground" strokeWidth={2} />
                </div>
                <p className="text-lg text-foreground font-semibold">
                  {point.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - The Focal Method */}
          <div
            className="space-y-6 relative"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gradient-harmony mb-2">
                O Método FluiSaúde
              </h3>
              <div className="h-1 w-20 bg-gradient-to-r from-accent to-primary rounded-full" />
            </div>

            {focalWayPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 backdrop-blur-sm shadow-soft border border-primary/20"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <p className="text-lg text-foreground font-semibold">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className="text-center mt-16"
        >
          <Button
            size="lg"
            onClick={() => { window.location.href = '/dashboard'; }}
            className="group relative overflow-hidden bg-gradient-to-r from-accent to-primary text-white font-semibold px-8 py-6 text-lg rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              Comece a usar FluiSaúde
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;