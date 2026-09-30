'use client';
import { useEffect, useRef, useState } from 'react';
import { navigation, contact } from '@/lib/content';
import { Arrow } from './Icon';

export default function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus(); };
  return <>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="ASAKAN กลับสู่ด้านบน"><img src="/media/logo.png" alt="" width="36" height="36" /><span>ASAKAN<small>SPACE FOR YOUR LIFE</small></span></a>
      <nav className="desktop-nav" aria-label="เมนูหลัก">{navigation.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
      <div className="header-actions"><a className="header-contact" href="#contact">นัดหมายเยี่ยมชม <Arrow diagonal /></a><button ref={trigger} className="menu-toggle" aria-label="เปิดเมนู" aria-haspopup="dialog" aria-expanded={open} aria-controls="main-menu" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span/><span/></button></div>
    </header>
    <dialog ref={dialog} id="main-menu" className="menu-dialog" aria-label="เมนูเว็บไซต์" onCancel={close} onClose={() => setOpen(false)}>
      <div className="menu-top"><span className="wordmark">ASAKAN</span><button className="close-button" onClick={close} aria-label="ปิดเมนู">ปิด <span>×</span></button></div>
      <nav aria-label="เมนูทั้งหมด">{navigation.map((n, i) => <a href={n.href} key={n.href} onClick={close}><small>0{i+1}</small><span>{n.label}<em>{n.en}</em></span><Arrow diagonal /></a>)}</nav>
      <div className="menu-bottom"><a href="/promotion">โปรโมชั่น</a><a href="/news">ข่าวสาร</a><a href="/member">ASAKAN Member</a><a href={`tel:${contact.tel}`}>{contact.phone}</a></div>
    </dialog>
  </>;
}
