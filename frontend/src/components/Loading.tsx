import { createPortal } from "react-dom";
import useLoadingStore from "../stores/loadingStore";

const Loading=()=>{
  const { loading } = useLoadingStore()

  if (!loading) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50">
      <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
    </div>,
    document.body
  );
}

export default Loading;