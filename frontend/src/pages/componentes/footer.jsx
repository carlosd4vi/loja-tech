const Footer = () => {
    return ( 
    <footer className="bg-white dark:bg-[#1a2634] border-t border-[#f0f2f4] dark:border-[#2a3b4d] mt-auto">
<div className="max-w-[1440px] mx-auto px-4 md:px-10 py-10">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="flex flex-col gap-4">
<div className="flex items-center gap-2">
<div className="size-6 text-primary flex items-center justify-center">
<img src="src/img/logo/lojatech.png" />
</div>
<h2 className="text-base font-bold text-[#111418] dark:text-white">Loja Tech</h2>
</div>
<p className="text-sm text-[#617289] dark:text-[#9ca3af]">
                        Sua loja completa para os mais recentes eletrônicos. Qualidade garantida.
                    </p>
</div>
<div>
<h3 className="font-bold text-[#111418] dark:text-white mb-4">Contato</h3>
<div className="flex flex-col gap-2">
<a className="text-sm text-[#617289] hover:text-primary dark:text-[#9ca3af]" href="#">Central de ajuda</a>
<a className="text-sm text-[#617289] hover:text-primary dark:text-[#9ca3af]" href="#">Envio &amp; Devoluções</a>
<a className="text-sm text-[#617289] hover:text-primary dark:text-[#9ca3af]" href="#">Trabalhe conosco</a>
<a className="text-sm text-[#617289] hover:text-primary dark:text-[#9ca3af]" href="#">Política de Privacidade</a>
</div>
</div>
</div>
<div className="border-t border-[#f0f2f4] dark:border-[#2a3b4d] mt-10 pt-6 text-center text-sm text-[#617289] dark:text-[#9ca3af]">
                © 2026 Loja Tech LTDA. Todos os direitos reservados.
            </div>
</div>
</footer> );
}
 
export default Footer;