'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={36} className="text-[#f4511e]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a2d6b] mb-3">เกิดข้อผิดพลาด</h1>
        <p className="text-gray-500 mb-8">
          ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 bg-[#f4511e] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#d43e0e]"
          >
            <RefreshCw size={16} />
            ลองใหม่
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-100"
          >
            <Home size={16} />
            หน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
