import Link from "@/components/safe-link";

export const metadata = { title: "Page Not Found — NEXORA", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main className="module-shell">
      <div className="module-grid" />
      <Link href="/" className="module-back">← NEXORA / HOME · 首页</Link>
      <div className="module-code">404</div>
      <div className="module-content">
        <span>ROUTE NOT FOUND · 页面未找到</span>
        <h1>Signal unavailable<small>请求的页面不存在或已移动</small></h1>
        <p>Return to the intelligence overview and continue through the verified product routes.<br />请返回情报总览，并从已验证的产品路径继续。</p>
        <div className="btns"><Link className="btn primary" href="/">Open NEXORA / 打开首页 →</Link><Link className="btn" href="/data-status">Data Status / 数据状态</Link></div>
      </div>
    </main>
  );
}
