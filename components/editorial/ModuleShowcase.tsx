"use client";
/* eslint-disable @next/next/no-img-element -- approved local WebP artwork is intentionally preserved without a runtime image service. */
import {useEffect,useRef,useState} from "react";
import Link from "@/components/safe-link";
import styles from "./module-showcase.module.css";

type Lang="en"|"zh";
export interface ShowcaseModule{id:string;href:string;art:string;name:Record<Lang,string>;question:Record<Lang,string>;body:Record<Lang,string>;highlights:Record<Lang,readonly string[]>}

export function ModuleShowcase({items,lang}:{items:readonly ShowcaseModule[];lang:Lang}){
 const [active,setActive]=useState(0),tabs=useRef<(HTMLButtonElement|null)[]>([]),pointerStart=useRef<number|null>(null);
 const go=(index:number,focus=false)=>{const next=Math.max(0,Math.min(items.length-1,index));setActive(next);if(focus)tabs.current[next]?.focus()};
 useEffect(()=>{tabs.current[active]?.scrollIntoView({block:"nearest",inline:"nearest",behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})},[active]);
 return <div className={styles.showcase}>
  <div className={styles.tabs} role="tablist" tabIndex={-1} aria-label={lang==="en"?"Research modules":"研究模块"} onKeyDown={e=>{if(!["ArrowLeft","ArrowRight","Home","End"].includes(e.key))return;e.preventDefault();const i=e.key==="Home"?0:e.key==="End"?items.length-1:active+(e.key==="ArrowRight"?1:-1);go(i,true)}}>{items.map((m,i)=><button ref={el=>{tabs.current[i]=el}} id={`module-tab-${m.id}`} aria-controls={`module-panel-${m.id}`} aria-selected={active===i} role="tab" tabIndex={active===i?0:-1} onClick={()=>go(i)} key={m.id}><span>{String(i+1).padStart(2,"0")}</span>{m.name[lang]}</button>)}</div>
  <div className={styles.viewport} onPointerDown={e=>{if(e.pointerType!=="mouse")pointerStart.current=e.clientX}} onPointerUp={e=>{if(pointerStart.current===null)return;const delta=e.clientX-pointerStart.current;pointerStart.current=null;if(Math.abs(delta)>48)go(active+(delta<0?1:-1))}} onPointerCancel={()=>{pointerStart.current=null}}>
   <div className={styles.track} style={{transform:`translate3d(-${active*100}%,0,0)`}}>{items.map((m,i)=><article className={styles.slide} id={`module-panel-${m.id}`} role="tabpanel" aria-labelledby={`module-tab-${m.id}`} aria-hidden={active!==i} key={m.id}>
    <img src={`/hero/${m.art}-hero-art.webp`} alt="" loading={i===0?"eager":"lazy"} fetchPriority={i===0?"high":"low"}/><div className={styles.scrim}/><div className={styles.copy}><span>NEXORA / {m.id.toUpperCase()}</span><h3>{m.question[lang]}</h3><p>{m.body[lang]}</p><ul>{m.highlights[lang].map(x=><li key={x}>{x}</li>)}</ul><Link href={m.href} tabIndex={active===i?0:-1}>{lang==="en"?`Enter ${m.name.en}`:`进入${m.name.zh}`} →</Link></div>
   </article>)}</div>
  </div>
  <footer><p className="sr-only" aria-live="polite">{lang==="en"?`${items[active].name.en}, slide ${active+1} of ${items.length}`:`${items[active].name.zh}，第 ${active+1} 项，共 ${items.length} 项`}</p><span>{String(active+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span><div className={styles.dots} aria-hidden="true">{items.map((m,i)=><i className={active===i?styles.dotOn:""} key={m.id}/>)}</div><div><button disabled={active===0} aria-label={lang==="en"?"Previous module":"上一个模块"} onClick={()=>go(active-1)}>←</button><button disabled={active===items.length-1} aria-label={lang==="en"?"Next module":"下一个模块"} onClick={()=>go(active+1)}>→</button></div></footer>
 </div>
}
