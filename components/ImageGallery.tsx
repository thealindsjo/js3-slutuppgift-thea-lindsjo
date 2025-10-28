import Image from "next/image";
import { UnsplashImage } from "@/types/unsplash";

export default function ImageGallery({
  images,
  fallbackName,
}: {
  images: UnsplashImage[];
  fallbackName: string;
}) {
  if (!images || images.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 border rounded">
          Inga bilder från Unsplash hittades.
        </div>
      </div>
    );
  }

  const show = images.slice(0, 6);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {show.map((img: UnsplashImage) => (
        <div key={img.id} className="rounded overflow-hidden bg-gray-50">
          <Image
            src={img.url}
            alt={img.alt || fallbackName}
            width={800}
            height={600}
            className="object-cover w-full h-48"
          />
        </div>
      ))}
    </div>
  );
}
