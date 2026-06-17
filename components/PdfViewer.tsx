"use client";

import { useEffect, useRef, useState, KeyboardEvent } from "react";

type Props = {
  fileURL: string;
  title?: string;
  author?: string;
  onClose: () => void;
};

export default function PdfViewer({ fileURL, title, author, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        // Worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).href;

        const loadingTask = pdfjsLib.getDocument({ url: fileURL });
        const pdf = await loadingTask.promise;
        if (!mounted) return;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setPageNumber(1);
      } catch (e) {
        console.error("Failed to load PDF:", e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [fileURL]);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      if (!pdfDoc || !canvasRef.current) return;
      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * devicePixelRatio);
        canvas.height = Math.floor(viewport.height * devicePixelRatio);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const renderContext = {
          canvasContext: context,
          viewport: page.getViewport({ scale, },),
        };

        const renderTask = page.render(renderContext as any);
        await renderTask.promise;
        if (cancelled) return;
      } catch (e) {
        console.error("Failed to render PDF page:", e);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, pageNumber, scale]);

  // Prevent common save/print keyboard shortcuts and right-click
  useEffect(() => {
    const onKey = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
      const ctrl = (e as any).ctrlKey || (e as any).metaKey;
      const key = (e as any).key?.toLowerCase?.();
      if (ctrl && (key === "s" || key === "p")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handler = (ev: KeyboardEvent) => onKey(ev);
    window.addEventListener("keydown", handler as any, true);
    return () => window.removeEventListener("keydown", handler as any, true);
  }, []);

  const prev = () => setPageNumber((p) => Math.max(1, p - 1));
  const next = () => setPageNumber((p) => Math.min(totalPages, p + 1));

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Reading PDF</p>
            <p className="text-xs text-slate-500">{title} {author ? `— ${author}` : ""}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button onClick={prev} className="rounded bg-slate-100 px-3 py-1 text-sm">Prev</button>
              <span className="text-sm text-slate-700">{pageNumber}/{totalPages || "—"}</span>
              <button onClick={next} className="rounded bg-slate-100 px-3 py-1 text-sm">Next</button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScale((s) => Math.max(0.5, s - 0.25))} className="rounded bg-slate-100 px-3 py-1 text-sm">-</button>
              <button onClick={() => setScale((s) => Math.min(3, s + 0.25))} className="rounded bg-slate-100 px-3 py-1 text-sm">+</button>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-slate-200 px-3 py-1 text-sm font-medium text-slate-800 hover:bg-slate-300"
            >
              Close
            </button>
          </div>
        </div>

        <div className="relative h-[calc(100%-3.5rem)] w-full flex items-center justify-center overflow-auto bg-slate-100">
          <canvas ref={canvasRef} className="select-none pointer-events-none" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rotate-[-25deg] opacity-20 text-3xl font-bold text-slate-700 select-none">PROPRIETARY</div>
          </div>
        </div>
      </div>
    </div>
  );
}
