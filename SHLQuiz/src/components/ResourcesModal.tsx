import React, { useState, useEffect, useMemo } from 'react';
import {
  SHLResource,
  SHL_RESOURCES,
  ResourceCategory,
  RESOURCE_CATEGORIES,
  CATEGORY_BADGES,
} from '../data/shlResourcesData';
import { X, Search, ExternalLink, Globe } from 'lucide-react';

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
        <h2 className="text-xl font-bold text-slate-900 leading-tight">SHL Resurser & Länkar</h2>
        <p className="text-xs text-slate-500">Officiella portaler, tabeller, sändningskanaler och supporterforum</p>
      </div>
    </div>
    <button
      onClick={onClose}
      className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
      aria-label="Stäng modalfönster"
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
      placeholder="Sök resurser efter namn eller nyckelord..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="search-input"
    />
    {search && (
      <button
        onClick={() => onSearchChange('')}
        className="search-clear-button"
        aria-label="Rensa sökning"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

const ResourceCard: React.FC<{ item: SHLResource }> = ({ item }) => {
  const badgeClass = CATEGORY_BADGES[item.category] ?? 'bg-slate-100 text-slate-700';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3.5 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all flex flex-col justify-between group shadow-2xs"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
            {item.name}
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
            {item.category}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{item.description}</p>
      </div>
      <div className="text-[11px] text-slate-400 mt-2 font-mono truncate">{item.url}</div>
    </a>
  );
};

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All');
  const [search, setSearch] = useState('');

  useEscapeKey(isOpen, onClose);

  const filtered = useMemo(() => {
    return SHL_RESOURCES.filter((res) => {
      const matchCat = selectedCategory === 'All' || res.category === selectedCategory;
      const matchSearch =
        !search.trim() ||
        res.name.toLowerCase().includes(search.toLowerCase()) ||
        res.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, search]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container resources-modal-container max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <ResourcesModalHeader onClose={onClose} />
        <div className="mt-4 mb-3 space-y-3">
          <SearchBar search={search} onSearchChange={setSearch} />
          <CategoryPills currentCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </div>
        <div className="flex-1 overflow-y-auto space-y-2.5 my-2 pr-1 custom-scrollbar max-h-[55vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">Inga resurser matchade din sökning</div>
          ) : (
            filtered.map((item) => <ResourceCard key={item.id} item={item} />)
          )}
        </div>
      </div>
    </div>
  );
};
