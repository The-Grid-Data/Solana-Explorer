import { Badge } from '@/components/ui/badge';

export const Hero = () => {
  return (
    <section className="container mx-auto flex max-w-4xl flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-12">
      <Badge className="my-2 text-center" variant="secondary">
        This is an opensource UI to show data.
      </Badge>

      <h1 className="scroll-m-20 text-balance text-center text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl lg:leading-[1.1]">
        Explore and discover Solana projects, products and assets.
      </h1>
      <p className="max-w-xl text-center text-lg font-light text-foreground">
        Browse Solana's ecosystem via <a href="https://thegrid.id">The Grids</a> data.<br></br> Filter to find what matters to you or intergrate this data into your own product using the API.
      </p>
    </section>
  );
};
