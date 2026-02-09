import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadPhoto, deletePhoto } from "@/lib/storage";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  currentUrl?: string | null;
  folder: string;
  onUploaded: (url: string) => void;
  onRemoved?: () => void;
}

const PhotoUpload = ({ currentUrl, folder, onUploaded, onRemoved }: PhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPhoto(file, folder);
      onUploaded(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (currentUrl) {
      try { await deletePhoto(currentUrl); } catch {}
    }
    onRemoved?.();
  };

  return (
    <div className="space-y-2">
      {currentUrl ? (
        <div className="relative inline-block">
          <img src={currentUrl} alt="" className="w-32 h-32 object-cover rounded-lg border border-border" />
          <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6" onClick={handleRemove}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
          {uploading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /> : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground mb-1" />
              <span className="text-xs text-muted-foreground">Nahrát</span>
            </>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      )}
    </div>
  );
};

export default PhotoUpload;
