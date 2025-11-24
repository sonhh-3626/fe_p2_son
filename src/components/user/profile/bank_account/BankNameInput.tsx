'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { Bank, searchBanks } from '@/constants/bankings';

interface BankNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function BankNameInput({ value, onChange, error }: BankNameInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update search when value changes externally
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Filter banks when search query changes
  useEffect(() => {
    const results = searchBanks(searchQuery);
    setFilteredBanks(results);
    setHighlightedIndex(-1);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleSelectBank = (bank: Bank) => {
    onChange(bank.shortName);
    setSearchQuery(bank.shortName);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredBanks.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredBanks.length) {
          handleSelectBank(filteredBanks[highlightedIndex]);
        } else if (filteredBanks.length > 0) {
          handleSelectBank(filteredBanks[0]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  const isExactMatch = filteredBanks.some(
    (bank) => bank.shortName.toLowerCase() === searchQuery.toLowerCase()
  );

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tên ngân hàng <span className="text-red-500">*</span>
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Tìm hoặc nhập tên ngân hàng..."
          autoComplete="off"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
          tabIndex={-1}
        >
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredBanks.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Không tìm thấy ngân hàng phù hợp
            </div>
          ) : (
            <ul className="py-1">
              {filteredBanks.map((bank, index) => {
                const isSelected = bank.shortName.toLowerCase() === searchQuery.toLowerCase();
                const isHighlighted = index === highlightedIndex;

                return (
                  <li key={bank.code}>
                    <button
                      type="button"
                      onClick={() => handleSelectBank(bank)}
                      className={`w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors ${
                        isHighlighted ? 'bg-blue-50' : ''
                      } ${isSelected ? 'bg-blue-100' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {bank.shortName}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">
                              {bank.code}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {bank.fullName}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {!isExactMatch && searchQuery.trim().length > 0 && (
            <div className="border-t border-gray-200 px-4 py-2 bg-gray-50">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  inputRef.current?.blur();
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Sử dụng "{searchQuery}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
