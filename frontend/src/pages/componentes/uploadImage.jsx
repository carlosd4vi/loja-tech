import React, { useState } from 'react';
import { supabase } from '../../script/supabase'; 

export default function UploadImagemProduto({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      
      const file = event.target.files[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `imagens/produtos/${fileName}`; 

      const { data, error } = await supabase.storage
        .from('CDN-Produtos')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('CDN-Produtos')
        .getPublicUrl(filePath);

      // Preview Imagem  
      setImageUrl(publicUrlData.publicUrl);
      
      // Entrega a URL
      if (onUploadSuccess) {
        onUploadSuccess(publicUrlData.publicUrl);
      }
    } catch (error) {
      alert('Erro no upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Adicione Imagem do Produto</h2>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900 dark:text-white">Imagens</label>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
          <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[24px]">cloud_upload</span>
          </div>
          <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleUpload} disabled={uploading} />
          {uploading && <p className="text-sm font-medium text-gray-900 dark:text-white">Enviando imagem...</p>}
          <p className="text-sm font-medium text-gray-900 dark:text-white">Clique para enviar</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">WEBP (Recomendado), PNG, JPEG (max. 1MB)</p>
          {imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-green-600 mb-2">Imagem Salva:</p>
              <img src={imageUrl} alt="Produto enviado" className="h-32 rounded-lg object-cover" />
            </div>
          )} 
        </div>
      </div>
    </div>
  );
}