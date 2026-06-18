'use client';

import { useRef, useState } from 'react';
import { exportFlashcards, importFlashcards, resetFlashcards } from '@/lib/flashcards';

export default function FlashcardManagement() {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportError(null);
    setImportSuccess(false);
    try {
      await importFlashcards(file);
      setImportSuccess(true);
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : 'Failed to import');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    resetFlashcards();
    setShowConfirmReset(false);
    window.location.reload();
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Flashcard Management</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border-2 border-gray-300">
          <div>
            <h4 className="font-bold text-sm text-gray-900">Export Flashcards</h4>
            <p className="text-xs text-gray-700">Download as JSON</p>
          </div>
          <button
            onClick={exportFlashcards}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg border-2 border-gray-300">
          <div>
            <h4 className="font-bold text-sm text-gray-900">Import Flashcards</h4>
            <p className="text-xs text-gray-700">Upload JSON file</p>
            {importSuccess && <p className="text-xs text-green-700 font-medium mt-1">✓ Imported! Reloading...</p>}
            {importError && <p className="text-xs text-red-700 font-medium mt-1">✗ {importError}</p>}
          </div>
          <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            Import
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg border-2 border-red-300">
          <div>
            <h4 className="font-bold text-sm text-red-900">Reset Flashcards</h4>
            <p className="text-xs text-red-700">Delete all cards</p>
          </div>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Reset</h3>
            <p className="text-gray-700 mb-6">
              This will delete all flashcards and their review history. This cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-medium rounded-lg hover:bg-gray-300 border-2 border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
