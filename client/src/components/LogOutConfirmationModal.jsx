export default function LogOutConfirmationModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-white/80 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 transition-all">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white text-center">
          Se Déconnecter
        </h2>

        {/* Message */}
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          Êtes-vous sûr de vouloir{" "}
          <span className="text-red-600 dark:text-red-400 font-semibold">vous déconnecter</span> ?
          Cette action mettra fin à votre session.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold hover:opacity-90 transition"
          >
            Oui, Se Déconnecter
          </button>
        </div>
      </div>
    </div>
  );

}
