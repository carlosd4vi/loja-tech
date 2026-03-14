import { Header } from "./componentes/header";
import { Section } from "./componentes/header";
import HomeProdutos from "../script/HomeProdutos";
import Footer from "./componentes/footer";

function Home() {
  return (
    <>
      <Header />
      <Section />
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-10 pb-12">
        <HomeProdutos />
      </main>
      <Footer />
    </>
  );
}

export default Home;