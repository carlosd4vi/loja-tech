import React, { useState } from 'react';

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleClick = () => {
    // Se não estava curtido, ativa a animação de "pulo"
    if (!liked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 300); // Remove a classe de animação após 300ms
    }
    setLiked(!liked);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        h-12 w-12 rounded-lg border flex items-center justify-center transition-all duration-300
        ${liked 
          ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-500/10' // Estilo quando ATIVO (Curtido)
          : 'border-[#e5e7eb] dark:border-[#2a3441] bg-white dark:bg-[#1a202c] text-[#111418] dark:text-white hover:text-red-500 hover:border-red-500 hover:bg-red-50 dark:hover:bg-transparent' // Estilo INATIVO
        }
      `}
    >
      <span 
        className={`
          material-symbols-outlined text-[24px] select-none transition-transform duration-300
          ${animating ? 'scale-[1.35]' : 'scale-100'} 
        `}
        style={{
          fontVariationSettings: liked ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24"
        }}
      >
        favorite
      </span>
    </button>
  );
}