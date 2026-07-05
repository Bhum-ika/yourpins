export default function LoadingButton({ loading, text, loadingText }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="bg-black text-white rounded-xl py-2.5 text-sm cursor-pointer mt-1 hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed w-full transition-all"
    >
      {loading ? loadingText : text}
    </button>
  );
}