import React from 'react';

interface Theme {
  selectedTheme: 'claro' | 'escuro';
  claro: {
    corFundo: string;
    corTexto: string;
    svgColors: string;
  };
  escuro: {
    corFundo: string;
    corTexto: string;
    svgColors: string;
  };
}

interface FooterProps {
  theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer
      className={`mt-auto w-full flex flex-col items-center justify-between p-6 md:w-[60%] lg:w-[50%]`}
      style={{ backgroundColor: theme[theme.selectedTheme].corFundo }}
    >
      {/* Desenvolvedor */}
      <p
        className={`text-center text-sm font-semibold ${
          theme[theme.selectedTheme].corTexto
        }`}
      >
        Desenvolvido por{' '}
        <a
          href="http://wa.me/+5586994059642?text=Olá,%20quero%20saber%20mais%20sobre%20investir%20em%20um%20site%20de%20rifas."
          className="text-[#FF1493] hover:underline" // Rosa vibrante com hover
          target="_blank"
          rel="noopener noreferrer"
        >
          Luiz Henrique
        </a>
      </p>

      {/* Navegação */}
      <div className="mt-4 grid w-full grid-cols-2 gap-4 text-center md:flex md:justify-around">
        <div>
          <h4
            className={`mb-2 text-lg font-medium ${
              theme[theme.selectedTheme].corTexto
            }`}
          >
            Sobre
          </h4>
          <ul>
            <li>
              <a
                href="#"
                className={`text-sm ${
                  theme.selectedTheme === 'claro'
                    ? 'text-[#4F4F4F] hover:text-[#2F4F4F]' // Cinza escuro no hover
                    : 'text-[#DCDCDC] hover:text-[#FFFFFF]' // Branco no hover
                }`}
              >
                Sobre a Rifa
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`text-sm ${
                  theme.selectedTheme === 'claro'
                    ? 'text-[#4F4F4F] hover:text-[#2F4F4F]'
                    : 'text-[#DCDCDC] hover:text-[#FFFFFF]'
                }`}
              >
                Como Participar
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4
            className={`mb-2 text-lg font-medium ${
              theme[theme.selectedTheme].corTexto
            }`}
          >
            Recursos
          </h4>
          <ul>
            <li>
              <a
                href="#"
                className={`text-sm ${
                  theme.selectedTheme === 'claro'
                    ? 'text-[#4F4F4F] hover:text-[#2F4F4F]'
                    : 'text-[#DCDCDC] hover:text-[#FFFFFF]'
                }`}
              >
                Prêmios
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`text-sm ${
                  theme.selectedTheme === 'claro'
                    ? 'text-[#4F4F4F] hover:text-[#2F4F4F]'
                    : 'text-[#DCDCDC] hover:text-[#FFFFFF]'
                }`}
              >
                Termos e Condições
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Direitos Autorais */}
      <div className="mt-6 text-center">
        <p
          className={`text-xs ${
            theme[theme.selectedTheme].corTexto
          } opacity-75`}
        >
          © 2025 Luiz Henrique. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
