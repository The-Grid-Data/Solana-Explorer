export const Banner = () => {
  return (
    <section className="flex justify-center bg-foreground p-2">
      <span className="text-center text-sm font-light text-muted/70">
        Experience
        <a
          target="_blank"
          href="https://thegrid.id/legal/web-services-terms"
          className="underline"
        >
          The Grid&apos;s
        </a>{' '}
        validated Solana data layer which is in Beta
      </span>
    </section>
  );
};
