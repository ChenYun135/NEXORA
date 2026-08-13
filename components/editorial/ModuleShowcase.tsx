"use client";
import {useEffect,useRef,useState} from "react";
import Link from "@/components/safe-link";
import styles from "./module-showcase.module.css";

type Lang="en"|"zh";
export interface ShowcaseModule{id:string;href:string;art:string;name:Record<Lang,string>;question:Record<Lang,string>;body:Record<Lang,string>;highlights:Record<Lang,readonly string[]>}

export function ModuleShowcase({items,lang}:{items:readonly ShowcaseModule[];lang:Lang}){
 const [active,setActive]=useState(0),viewport=useRef<HTMLDivElement>(null),tabs=useRef<(HTMLButtonElement|null)[]>([]),raf=useRef(0);
 const go=(index:number,focus=false)=>{const next=(index+items.length)%items.length,set=viewport.current,slide=set?.children[next] as HTMLElement|undefined;setActive(next);if(set&&slide)set.scrollTo({left:slide.offsetLeft,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});if(focus)tabs.current[next]?.focus()};
 useEffect(()=>()=>cancelAnimationFrame(raf.current),[]);
 return <div className={styles.showcase}>
  <div className={styles.tabs} role="tablist" tabIndex={-1} aria-label={lang==="en"?"Research modules":"研究模块"} onKeyDown={e=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();const i=e.key==="Home"?0:e.key==="End"?items.length-1:active+(e.key==="ArrowRight"?1:-1);go(i,true)}}>{items.map((m,i)=><button ref={el=>{tabs.current[i]=el}} id={`module-tab-${m.id}`} aria-controls={`module-panel-${m.id}`} aria-selected={active===i} role="tab" tabIndex={active===i?0:-1} onClick={()=>go(i)} key={m.id}><span>{String(i+1).padStart(2,"0")}</span>{m.name[lang]}</button>)}</div>
  <div className={styles.viewport} ref={viewport} onScroll={()=>{cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(()=>{const el=viewport.current;if(!el)return;let best=0,distance=Infinity;Array.from(el.children).forEach((child,i)=>{const d=Math.abs((child as HTMLElement).offsetLeft-el.scrollLeft);if(d<distance){distance=d;best=i}});setActive(best)})}}>{items.map((m,i)=><article className={styles.slide} id={`module-panel-${m.id}`} role="tabpanel" aria-labelledby={`module-tab-${m.id}`} aria-hidden={active!==i} key={m.id}>
   <img src={`/hero/${m.art}-hero-art.webp`} alt="" loading={i===0?"eager":"lazy"}/><div className={styles.scrim}/><div className={styles.copy}><span>NEXORA / {m.id.toUpperCase()}</span><h3>{m.question[lang]}</h3><p>{m.body[lang]}</p><ul>{m.highlights[lang].map(x=><li key={x}>{x}</li>)}</ul><Link href={m.href} tabIndex={active===i?0:-1}>{lang==="en"?`Enter ${m.name.en}`:`进入${m.name.zh}`} →</Link></div>
  </article>)}</div>
  <footer><p className="sr-only" aria-live="polite">{lang==="en"?`${items[active].name.en}, slide ${active+1} of ${items.length}`:`${items[active].name.zh}，第 ${active+1} 项，共 ${items.length} 项`}</p><span>{String(active+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span><div><button aria-label={lang==="en"?"Previous module":"上一个模块"} onClick={()=>go(active-1)}>←</button><button aria-label={lang==="en"?"Next module":"下一个模块"} onClick={()=>go(active+1)}>→</button></div></footer>
 </div>
}
