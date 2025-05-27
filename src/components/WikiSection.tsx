import type { WikiInfo } from '../store/useBookStore';

interface WikiSectionProps {
  wikiInfo: WikiInfo;
}

const WikiSection = ({ wikiInfo }: WikiSectionProps) => {
  if (!wikiInfo || (!wikiInfo.extract && !wikiInfo.thumbnail)) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/32px-Wikipedia-logo-v2.svg.png"
          alt="Wikipedia"
          className="w-6 h-6 mr-2"
        />
        Informations Wikipedia
      </h3>
      
      <div className="flex flex-col md:flex-row gap-6">
        {wikiInfo.thumbnail && (
          <div className="md:w-1/3">
            <img
              src={wikiInfo.thumbnail}
              alt="Illustration"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        )}
        
        <div className={`${wikiInfo.thumbnail ? 'md:w-2/3' : 'w-full'}`}>
          {wikiInfo.extract && (
            <p className="text-gray-600 mb-4 leading-relaxed">
              {wikiInfo.extract}
            </p>
          )}
          
          {wikiInfo.categories && wikiInfo.categories.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Catégories :</h4>
              <div className="flex flex-wrap gap-2">
                {wikiInfo.categories.map((category) => (
                  <span
                    key={category}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {wikiInfo.langlinks && Object.keys(wikiInfo.langlinks).length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Disponible en :</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(wikiInfo.langlinks).map(([lang, url]) => (
                  <a
                    key={lang}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {lang.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          )}

          {wikiInfo.url && (
            <div className="mt-4">
              <a
                href={wikiInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
              >
                Lire l'article complet
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WikiSection; 