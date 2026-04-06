'use client';

import { useState, useRef } from 'react';
import { Upload, Trash2, Save, Image as ImageIcon } from 'lucide-react';

export default function AdminHeroImagesPage() {
  // 1. State เก็บรูปภาพ
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'
  ]);
  
  // 2. State สำหรับทำ Effect ตอนลากไฟล์มาอยู่บนกล่อง (Drag & Drop)
  const [isDragging, setIsDragging] = useState(false);
  
  // 3. Ref สำหรับใช้จำลองการคลิก Input ที่ซ่อนอยู่
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- ฟังก์ชันสำหรับการเลือกไฟล์ด้วยการคลิก ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // --- ฟังก์ชันสำหรับ Drag & Drop ---
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // ป้องกันไม่ให้ Browser เปิดรูปแทน
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // --- ฟังก์ชันประมวลผลไฟล์ (แปลงไฟล์เป็น URL สำหรับ Preview) ---
  const processFiles = (files: FileList) => {
    const newImageUrls: string[] = [];
    
    // วนลูปอ่านไฟล์ที่อัปโหลด (รองรับการอัปโหลดทีละหลายรูป)
    Array.from(files).forEach((file) => {
      // เช็คว่าเป็นไฟล์รูปภาพเท่านั้น
      if (file.type.startsWith('image/')) {
        // สร้าง Temporary URL เพื่อให้ Preview รูปได้ทันที
        const imageUrl = URL.createObjectURL(file);
        newImageUrls.push(imageUrl);
      } else {
        alert(`ไฟล์ ${file.name} ไม่ใช่รูปภาพครับ`);
      }
    });

    // นำรูปล่าสุดไปต่อท้ายรูปเดิม
    if (newImageUrls.length > 0) {
      setImages((prev) => [...prev, ...newImageUrls]);
    }
  };

  // --- ฟังก์ชันลบรูป ---
  const handleRemoveImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // --- ฟังก์ชันบันทึก ---
  const handleSave = () => {
    // 💡 ตรงนี้คือจุดที่คุณต้องเอา Array `images` ส่งไปบันทึกที่ Database หรือ API
    console.log("Saving images:", images);
    alert('ระบบจำลองการบันทึกสำเร็จ! (ดูข้อมูลใน Console)');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header Section */}
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
          className="flex items-center gap-2 bg-[#f4511e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#d43e0e] transition-colors shadow-sm active:scale-95"
        >
          <Save size={18} />
          บันทึกการเปลี่ยนแปลง
        </button>
      </div>

      {/* 📍 Upload Section (อัปเกรดให้ลากไฟล์ลงได้แล้ว) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <div 
          onClick={() => fileInputRef.current?.click()} // คลิกกรอบนี้ ให้ไปทริกเกอร์ Input ที่ซ่อนอยู่
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-[#f4511e] bg-orange-50 scale-[1.02]' // Effect ตอนกำลังลากไฟล์มาอยู่บนกล่อง
              : 'border-slate-300 hover:bg-slate-50 hover:border-orange-300'
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? 'bg-[#f4511e] text-white scale-110' : 'bg-orange-50 text-[#f4511e]'}`}>
            <Upload size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">
            {isDragging ? 'ปล่อยเมาส์เพื่ออัปโหลดไฟล์เลย!' : 'คลิกเพื่ออัปโหลด หรือลากไฟล์มาวาง'}
          </h3>
          <p className="text-slate-500 text-sm">รองรับไฟล์ JPG, PNG, WEBP ขนาดไม่เกิน 5MB</p>
          
          {/* Input ไฟล์ที่ซ่อนไว้ */}
          <input 
            type="file" 
            ref={fileInputRef} // ผูก Ref ไว้ตรงนี้
            onChange={handleFileSelect} // ดักจับตอนเลือกไฟล์
            className="hidden" 
            multiple 
            accept="image/*" 
          />
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100 flex items-center justify-between">
          <span>รูปภาพที่ใช้งานอยู่ ({images.length} รูป)</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full hidden sm:block">
            เรียงลำดับการแสดงผลจากซ้ายไปขวา
          </span>
        </h3>
        
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((src, idx) => (
              <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-sm aspect-video bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={src} 
                  alt={`Hero ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Overlay Options on Hover */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <button 
                    onClick={() => handleRemoveImage(idx)}
                    className="bg-white text-red-500 p-2.5 rounded-xl hover:bg-red-50 hover:scale-110 transition-all shadow-lg flex items-center gap-2 font-bold text-sm"
                  >
                    <Trash2 size={18} /> ลบรูปนี้
                  </button>
                </div>
                
                {/* Image Number Badge */}
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