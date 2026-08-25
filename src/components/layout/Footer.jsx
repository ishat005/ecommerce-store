export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
}