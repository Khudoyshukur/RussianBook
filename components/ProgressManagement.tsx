'use client';

import { useState, useRef } from 'react';
import { resetProgress, exportProgress, importProgress } from '@/lib/progress';

export default function ProgressManagement() {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    resetProgress();
    setShowConfirmReset(false);
    window.location.reload(); // Reload to reflect changes
  };

  const handleExport = () => {
    exportProgress();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    setImportSuccess(false);

    try {
      await importProgress(file);
      setImportSuccess(true);
      setTimeout(() => {
        window.location.reload(); // Reload to reflect imported progress
      }, 1500);
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import progress');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Progress Management</h2>

      <div className="space-y-4">
        {/* Export Progress */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Export Progress</h3>
            <p className="text-sm text-gray-600">Download your progress as a JSON file</p>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Export
          </button>
        </div>

        {/* Import Progress */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-semibold text-gray-800">Import Progress</h3>
            <p className="text-sm text-gray-600">Upload a previously exported progress file</p>
            {importSuccess && (
              <p className="text-sm text-green-600 mt-1">✓ Progress imported successfully! Reloading...</p>
            )}
            {importError && (
              <p className="text-sm text-red-600 mt-1">✗ {importError}</p>
            )}
          </div>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={handleImportClick}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Import
            </button>
          </div>
        </div>

        {/* Reset Progress */}
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
          <div>
            <h3 className="font-semibold text-red-800">Reset Progress</h3>
            <p className="text-sm text-red-600">Clear all progress and start over</p>
          </div>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Reset</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to reset all progress? This action cannot be undone.
              Make sure to export your progress first if you want to save it!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
