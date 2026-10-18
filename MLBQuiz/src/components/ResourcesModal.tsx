import React, { useState, useEffect, useMemo } from 'react';
import {
  MLBResource,
  MLB_RESOURCES,
  ResourceCategory,
  RESOURCE_CATEGORIES,
  CATEGORY_BADGES,
} from '../data/mlbResourcesData';
import { X, Search, ExternalLink, Globe, Sparkles } from 'lucide-react';

export interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function useEscapeKey(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

const ResourcesModalHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
        <Globe className="w-4 h-4" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 leading-tight">Vital MLB Resources & Links</h2>
        <p className="text-xs text-slate-500">Official portals, sabermetrics databases, payrolls, and prospect draft boards</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
      aria-label="Close modal"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);

const CategoryPills: React.FC<{
  currentCategory: ResourceCategory;
  onSelectCategory: (cat: ResourceCategory) => void;
}> = ({ currentCategory, onSelectCategory }) => (
  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
    {RESOURCE_CATEGORIES.map((cat) => (
      <button
        key={cat}
        onClick={() => onSelectCategory(cat)}
        className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
          currentCategory === cat
            ? 'bg-slate-900 text-white shadow-sm'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

const ResourceCard: React.FC<{ resource: MLBResource }> = ({ resource }) => (
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between group"
  >
    <div>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${CATEGORY_BADGES[resource.category]}`}>
          {resource.category}
        </span>
        {resource.popular && (
          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            Top Pick
          </span>
        )}
      </div>
      <h3 className="font-bold text-sm text-slate-900 group-hover:text-rose-600 transition-colors flex items-center gap-1.5">
        <span>{resource.name}</span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0" />
      </h3>
      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{resource.description}</p>
    </div>
    <span className="text-[11px] font-mono font-medium text-slate-400 mt-3 block truncate">
      {resource.domain}
    </span>
  </a>
);

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('All');

  useEscapeKey(isOpen, onClose);

  const filteredResources = useMemo(() => {
    return MLB_RESOURCES.filter((res) => {
      const matchCategory = category === 'All' || res.category === category;
      const matchSearch =
        !search.trim() ||
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.description.toLowerCase().includes(search.toLowerCase()) ||
        res.domain.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <ResourcesModalHeader onClose={onClose} />

        <div className="p-4 border-b border-slate-100 space-y-3">
          <div className="search-bar-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search resources, databases, statistics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="search-clear-button"
                aria-label="Clear search"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <CategoryPills currentCategory={category} onSelectCategory={setCategory} />
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No MLB resources found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {filteredResources.map((res) => (
                <ResourceCard key={res.id} resource={res} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
