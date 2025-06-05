"use client";

import { Calendar, Shield, Star, Stethoscope, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function WelcomeScreen() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/authentication"); // ✅ Redireciona para a página de autenticação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                dr.agenda
              </span>
            </div>
            <nav className="hidden space-x-8 md:flex">
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                Início
              </a>

              <a
                href="#"
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                Sobre
              </a>
              <a
                href="#"
                className="font-medium text-gray-600 hover:text-blue-600"
              >
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Sua saúde em
            <span className="text-blue-600"> boas mãos</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Conecte-se com os melhores profissionais de saúde da sua região.
            Agende consultas de forma rápida, segura e conveniente.
          </p>
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="bg-blue-600 px-8 py-5 text-lg text-white hover:bg-blue-700"
              onClick={handleNavigate}
            >
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Por que escolher o dr.agenda?
          </h2>
          <p className="text-lg text-gray-600">
            Facilitamos o acesso aos cuidados de saúde que você merece
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Agendamento Fácil
              </h3>
              <p className="text-gray-600">
                Marque suas consultas em poucos cliques, 24 horas por dia, 7
                dias por semana.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Seguro e Confiável
              </h3>
              <p className="text-gray-600">
                Seus dados estão protegidos e todos os médicos são verificados e
                certificados.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg transition-shadow hover:shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                Especialistas Qualificados
              </h3>
              <p className="text-gray-600">
                Acesso a uma rede de médicos especialistas em diversas áreas da
                medicina.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="mb-2 text-4xl font-bold text-white">500+</div>
              <div className="text-blue-100">Médicos Cadastrados</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-white">10k+</div>
              <div className="text-blue-100">Consultas Realizadas</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-white">50+</div>
              <div className="text-blue-100">Especialidades</div>
            </div>
            <div>
              <div className="mb-2 text-4xl font-bold text-white">4.9</div>
              <div className="flex items-center justify-center gap-1 text-blue-100">
                <Star className="h-4 w-4 fill-current" />
                Avaliação Média
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Como funciona
          </h2>
          <p className="text-lg text-gray-600">
            Em apenas 3 passos simples você agenda sua consulta
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              1
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Escolha o Médico
            </h3>
            <p className="text-gray-600">
              Navegue pela nossa lista de especialistas e escolha o profissional
              ideal para você.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              2
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Selecione o Horário
            </h3>
            <p className="text-gray-600">
              Veja a agenda disponível e escolha o dia e horário que melhor se
              adequa à sua rotina.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
              3
            </div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">
              Confirme a Consulta
            </h3>
            <p className="text-gray-600">
              Finalize o agendamento e receba a confirmação por email e SMS.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Pronto para cuidar da sua saúde?
          </h2>
          <p className="mb-8 text-lg text-gray-600">
            Junte-se a milhares de pessoas que já confiam no dr.agenda para seus
            cuidados médicos.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700"
            onClick={handleNavigate}
          >
            Criar Conta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <Stethoscope className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  dr.agenda
                </span>
              </div>
              <p className="text-gray-600">
                Conectando pacientes e médicos de forma simples e segura.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Médicos</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Cadastre-se
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-blue-600">
                    Suporte
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Suporte</h4>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Central de ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Termos de uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-gray-600">
            <p>&copy; 2024 dr.agenda. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
