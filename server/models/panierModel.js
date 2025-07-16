import mongoose from "mongoose";

const panierSchema = new mongoose.Schema({
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      produit: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
      quantite: { type: Number, default: 1 }
    }
  ]
});

const Panier = mongoose.models.Panier || mongoose.model("Panier", panierSchema);
export default Panier;
