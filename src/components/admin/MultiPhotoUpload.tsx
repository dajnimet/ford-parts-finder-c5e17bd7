import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadPhoto, deletePhoto } from "@/lib/storage";
import { Button } from "@/components/ui/button";

interface MultiPhotoUploadProps {
  photos: { id?: string; url: string }[];
  folder: string;
  onAdded: (url: string) => void;
  onRemoved: (url: string, id?: string) => void;
}

const MultiPhotoUpload = ({ photos, folder, onAdded, onRemoved }: MultiPhotoUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadPhoto(file, folder);
      onAdded(url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (url: string, id?: string) => {
    try { await deletePhoto(url); } catch {}
    onRemoved(url, id);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {photos.map((photo, i) => (
        <div key={i} className="relative">
          <img src={photo.url} alt="" className="w-24 h-24 object-cover rounded-lg border border-border" />
          <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-5 w-5" onClick={() => handleRemove(photo.url, photo.id)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
        {uploading ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> : (
          <>
            <Upload className="h-5 w-5 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Přidat</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
    </div>
  );
};

export default MultiPhotoUpload;
