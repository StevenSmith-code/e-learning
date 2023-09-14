import { AlertTriangle } from "lucide-react";

interface BannerProps {
  label: string;
}

export const Banner = ({ label }: BannerProps) => {
  return (
    <div className="bg-yellow-400/40 border-yellow-400/50 border text-center text-slate-800 p-4 text-sm rounded-b-md flex items-center w-full">
      <AlertTriangle className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};
