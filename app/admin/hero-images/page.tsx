'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Save, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function AdminHeroImagesPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // โหลด heroImages จาก settings
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        setImages(data.heroImages || []);
        setIsLoading(false);
      });
  }, []);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      alert(`ไฟล์ ${file.name} ไม่ใช่รูปภาพ`);
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(`ไฟล์ ${file.name} ใหญ่เกิน 5MB`);
      return null;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket', 'hero-images');

    const res = await fetch('/api/upload', { method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) { alert(`Upload ไม่สำเร็จ: ${data.error}`); return null; }
    return data.url;
  };

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadFile(file);
      if (url) newUrls.push(url);
    }
    if (newUrls.length > 0) setImages((prev) => [...prev, ...newUrls]);
    setIsUploading(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) processFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.length > 0) processFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = async (idx: number) => {
    const url = images[idx];
    setImages(images.filter((_, i) => i !== idx));

    // ลบจาก Supabase Storage ด้วย (เฉพาะ URL ที่มาจาก Supabase)
    if (url.includes('/storage/v1/object/public/')) {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, bucket: 'hero-images' }),
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ heroImages: images }),
    });
    setIsSaving(false);
    if (res.ok) alert('บันทึกสำเร็จ!');
    else alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="text-[#f4511e]" />
            จัดการรูปภาพหน้าแรก (Hero Slider)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            อัปโหลดรูปภาพเพื่อแสดงผลเป็นสไลด์โชว์ในหน้าแรกของเว็บไซต์ (แนะนำขนาด 1920x1080px)
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#f4511e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#d43e0e] transition-colors shadow-sm active:scale-95 disabled:opacity-60"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>

      {/* Upload Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-[#f4511e] bg-orange-50 scale-[1.02]'
              : 'border-slate-300 hover:bg-slate-50 hover:border-orange-300'
          } ${isUploading ? 'opacity-60 pointer-events-none' : ''}`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? 'bg-[#f4511e] text-white scale-110' : 'bg-orange-50 text-[#f4511e]'}`}>
            {isUploading ? <Loader2 size={28} className="animate-spin" /> : <Upload size={28} />}
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">
            {isUploading ? 'กำลังอัปโหลด...' : isDragging ? 'ปล่อยเมาส์เพื่ออัปโหลดเลย!' : 'คลิกเพื่ออัปโหลด หรือลากไฟล์มาวาง'}
          </h3>
          <p className="text-slate-500 text-sm">รองรับไฟล์ JPG, PNG, WEBP ขนาดไม่เกิน 5MB</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            multiple
            accept="image/*"
          />
        </div>
      </div>

      {/* Image Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100 flex items-center justify-between">
          <span>รูปภาพที่ใช้งานอยู่ ({images.length} รูป)</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full hidden sm:block">
            เรียงลำดับการแสดงผลจากซ้ายไปขวา
          </span>
        </h3>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-slate-300" />
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Hero ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="bg-white text-red-500 p-2.5 rounded-xl hover:bg-red-50 hover:scale-110 transition-all shadow-lg flex items-center gap-2 font-bold text-sm"
                  >
                    <Trash2 size={18} /> ลบรูปนี้
                  </button>
                </div>
                <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold w-6 h-6 rounded-md flex items-center justify-center backdrop-blur-sm">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400">
            <ImageIcon size={48} className="mx-auto mb-3 opacity-20" />
            <p>ยังไม่มีรูปภาพ กรุณาอัปโหลดรูปภาพเพื่อแสดงผลในหน้าแรก</p>
          </div>
        )}
      </div>
    </div>
  );
}
