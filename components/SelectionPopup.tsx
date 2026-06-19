'use client';

import { useEffect, useRef, useState } from 'react';
import FlashcardModal from './FlashcardModal';

export default function SelectionPopup() {
  const [popupPos, setPopupPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const pendingText = useRef('');

  useEffect(() => {
    function handleSelectionChange() {
      const sel = window.getSelection();
      const text = sel?.toString().trim() ?? '';
      if (!text) {
        setPopupPos(null);
        setSelectedText('');
        return;
      }

      const range = sel!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setPopupPos({
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + window.scrollY - 8,
      });
    }

    function handleMouseUp() {
      // Small delay so selection is finalized
      setTimeout(handleSelectionChange, 10);
    }

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  function handleAdd() {
    pendingText.current = selectedText;
    window.getSelection()?.removeAllRanges();
    setPopupPos(null);
    setShowModal(true);
  }

  if (!popupPos && !showModal) return null;

  return (
    <>
      {popupPos && !showModal && (
        <div
          style={{
            position: 'absolute',
            left: popupPos.x,
            top: popupPos.y,
            transform: 'translate(-50%, -100%)',
            zIndex: 9999,
          }}
          // Prevent mousedown from clearing the selection before click fires
          onMouseDown={(e) => e.preventDefault()}
        >
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg hover:bg-blue-700 active:scale-95 transition-all whitespace-nowrap"
          >
            🗂️ Add to flashcards
          </button>
          {/* Arrow */}
          <div className="flex justify-center">
            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-blue-600" />
          </div>
        </div>
      )}

      {showModal && (
        <FlashcardModal
          initialFront={pendingText.current}
          onClose={() => setShowModal(false)}
          onSaved={() => setShowModal(false)}
        />
      )}
    </>
  );
}
