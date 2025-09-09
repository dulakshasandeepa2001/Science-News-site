import React from 'react';
import { Atlas_Comet_Confirmation } from './data/articles/Atlas_Comet_Confirmation';

// Log to see the structure of the article
console.log("Atlas article object:", Atlas_Comet_Confirmation);
console.log("Atlas article ID:", Atlas_Comet_Confirmation.id);
console.log("Atlas article ID type:", typeof Atlas_Comet_Confirmation.id);

export default function DebugArticle() {
  return <div>Debug Article</div>;
}
