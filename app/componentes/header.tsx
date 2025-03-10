import { useState } from 'react';

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

interface HeaderProps {
  logo: string;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  theme: Theme;
}

const Header: React.FC<HeaderProps> = ({ logo, setTheme, theme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para abrir/fechar o modal
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função para fechar o modal ao clicar fora dele
  const closeMenuOnClickOutside = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'modal-background') {
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme: Theme) => ({
      ...prevTheme,
      selectedTheme: prevTheme.selectedTheme === 'claro' ? 'escuro' : 'claro',
    }));
  };

  return (
    <div className="flex w-[90%] items-center justify-between md:w-[60%] lg:w-[50%]">
      <div className="flex items-center justify-center">
        {/* Ícone Menu (hambúrguer) */}
        <button onClick={toggleMenu}>
          <svg
            stroke="currentColor"
            fill={theme[theme.selectedTheme].svgColors}
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5rem"
            width="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 4H21V6H3V4ZM3 11H15V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
        </button>
      </div>
      <div className="text-center text-lg text-[#98BD43]">
        <a href="#">{logo}</a>
      </div>
      <div className="flex items-center justify-center space-x-5">
        {/* Ícone Home */}
        <a href="#" className="text-white">
          <svg
            stroke="currentColor"
            fill={theme[theme.selectedTheme].svgColors}
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="1.5rem"
            width="1.5rem"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
          </svg>
        </a>
        {/* Ícone Lua (para ativar/desativar o tema) */}
        <svg
          onClick={toggleTheme} // Chama a função toggleTheme
          stroke="currentColor"
          fill={theme[theme.selectedTheme].svgColors}
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path>
        </svg>
      </div>

      {/* Modal Menu */}
      {isMenuOpen && (
        <div
          id="modal-background"
          onClick={closeMenuOnClickOutside}
          className="fixed inset-0 bg-blue-900 bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="bg-blue-800 p-6 rounded-lg w-[80%] md:w-[60%]">
            <ul className="space-y-4 text-center text-lg text-white">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Sobre a Rifa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Como Participar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Prêmios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Termos e Condições
                </a>
              </li>
            </ul>
            {/* Fechar Modal */}
            <button
              onClick={toggleMenu}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
