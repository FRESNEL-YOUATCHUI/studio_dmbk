export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-white">
      <div className="text-center px-6">
        <h1 className="text-6xl font-display font-bold text-brand-black mb-4">404</h1>
        <h2 className="text-2xl font-display text-brand-gray mb-6">Page non trouvée</h2>
        <p className="text-brand-gray mb-8 max-w-md">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-6 py-3 bg-brand-black text-brand-white font-medium rounded-sm hover:bg-brand-gold transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
