import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';

const ProductPage = () => {
  const userId = "123"; // À récupérer depuis le contexte utilisateur
  const productId = "pegasio_basic";

  return (
    <div className="p-4">
      <h2>PEGASIO Basic</h2>
      {/* Ajouter un avis */}
      <ReviewForm userId={userId} productId={productId} />
      {/* Liste des avis */}
      <ReviewList productId={productId} />
    </div>
  );
};
