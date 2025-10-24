import React from "react";

interface WikiData {
  extract: string | null;
  content_urls?: {
    desktop?: {
      page: string;
    };
  };
}

export default function WikiIntro({ wiki, name }: { wiki: WikiData | null; name: string }) {
  if (!wiki || wiki.extract == null) {
    return (
      <div>
        <p>Ingen introduktion tillgänglig från Wikipedia.</p>
      </div>
    );
  }

  return (
    <article aria-label={`Wikipedia introduction for ${name}`} className="prose max-w-none">
      <p>{wiki.extract}</p>
      {wiki.content_urls?.desktop?.page && (
        <p className="text-sm">
          Källa:{" "}
          <a href={wiki.content_urls.desktop.page} target="_blank" rel="noreferrer">
            Wikipedia
          </a>
        </p>
      )}
    </article>
  );
}