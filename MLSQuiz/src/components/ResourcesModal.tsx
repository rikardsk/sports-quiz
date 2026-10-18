import React, { useState, useEffect, useMemo } from 'react';
import {
  MLSResource,
  MLS_RESOURCES,
  ResourceCategory,
  RESOURCE_CATEGORIES,
  CATEGORY_BADGES,
} from '../data/mlsResourcesData';
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
      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
        <Globe className="w-4 h-4" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 leading-tight">Vital MLS Resources & Links</h2>
        <p className="text-xs text-slate-500">Official portals, analytics databases, player salaries, and youth development</p>
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

const SearchBar: React.FC<{
  search: string;
  onSearchChange: (val: string) => void;
}> = ({ search, onSearchChange }) => (
  <div className="search-bar-wrapper mb-3.5">
    <Search className="search-icon" />
    <input
      type="text"
      placeholder="Search resources by name, topic, or keyword..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
    {search && (
      <button
        onClick={() => onSearchChange('')}
        className="search-clear-button"
        aria-label="Clear search"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

const ResourceCard: React.FC<{ item: MLSResource }> = ({ item }) => {
  const badgeClass = CATEGORY_BADGES[item.category] ?? 'bg-slate-100 text-slate-700';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-sm bg-white hover:bg-emerald-50/20 text-left transition-all flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
              {item.name}
            </span>
            {item.popular && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                <Sparkles className="w-2.5 h-2.5" /> Key
              </span>
            )}
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${badgeClass}`}>
            {item.category}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.description}</p>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
        <span className="font-mono truncate">{item.domain}</span>
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 group-hover:underline">
          <span>Visit</span>
          <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </a>
  );
};

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('All');

  useEscapeKey(isOpen, onClose);

  const filteredResources = useMemo(() => {
    return MLS_RESOURCES.filter((res) => {
      const matchCat = category === 'All' || res.category === category;
      if (!matchCat) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        res.name.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.domain.toLowerCase().includes(q)
      );
    });
  }, [search, category]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <ResourcesModalHeader onClose={onClose} />

        <div className="py-3 border-b border-slate-100">
          <SearchBar search={search} onSearchChange={setSearch} />
          <CategoryPills currentCategory={category} onSelectCategory={setCategory} />
        </div>

        <div className="modal-body-scroll pt-3">
          {filteredResources.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-sm font-medium">No resources found matching your search</p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('All');
                }}
                className="mt-2 text-xs text-emerald-600 font-bold hover:underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
              {filteredResources.map((res) => (
                <ResourceCard key={res.id} item={res} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200 mt-auto text-xs text-slate-500">
          <span>{filteredResources.length} resources available • Links open in new tab</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
