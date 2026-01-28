"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Globe, 
  Tag, 
  ShieldCheck, 
  Zap, 
  Star,
  Info,
  Check,
  Copy,
  Share2,
  Bookmark,
  Heart,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { TOOLS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = TOOLS.find((t) => t.slug === slug);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  if (!tool) {
    notFound();
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tool.name,
        text: tool.shortDescription,
        url: window.location.href,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950/20 text-zinc-900 dark:text-zinc-100">
      {/* Floating Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Header */}
      <motion.header 
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Directory
              </Link>
              <div className="h-5 w-px bg-zinc-300 dark:bg-zinc-700" />
              <span className="text-sm font-bold truncate max-w-[200px]">{tool.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBookmarked(!bookmarked)}
                className={cn(
                  "transition-colors",
                  bookmarked && "text-amber-600 dark:text-amber-500"
                )}
              >
                <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          style={{ scale: heroScale }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Directory
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white via-white to-indigo-50/30 dark:from-zinc-900 dark:via-zinc-900 dark:to-indigo-950/30 p-8 sm:p-12 shadow-2xl shadow-indigo-500/5 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl" />
            
            <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl ring-1 ring-zinc-900/5 dark:ring-white/10 shadow-xl"
              >
                <Image src={tool.image} alt={tool.name} fill className="object-cover" />
                {tool.featured && (
                  <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                )}
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h1 className="text-4xl sm:text-5xl font-black tracking-tight bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400 bg-clip-text text-transparent mb-2">
                        {tool.name}
                      </h1>
                      {tool.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg shadow-amber-500/25">
                          <Sparkles className="h-3.5 w-3.5" />
                          Featured Tool
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xl text-zinc-600 dark:text-zinc-300 font-medium leading-relaxed mb-6">
                    {tool.shortDescription}
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="h-9 w-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <ShieldCheck className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white capitalize">{tool.pricing}</p>
                        <p className="text-xs">Pricing</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">{tool.categories.length} Categories</p>
                        <p className="text-xs">Classification</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                      <div className="h-9 w-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Zap className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-white">Active</p>
                        <p className="text-xs">Status</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3 shrink-0"
              >
                <a href={tool.website} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full sm:w-auto h-12 px-8 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 group">
                    Visit Website
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setLiked(!liked)}
                    className={cn(
                      "h-12 w-12 rounded-xl border-2 transition-all",
                      liked ? "bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-600 dark:text-rose-500" : "border-zinc-200 dark:border-zinc-800 hover:border-rose-500"
                    )}
                  >
                    <Heart className={cn("h-5 w-5", liked && "fill-current")} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setBookmarked(!bookmarked)}
                    className={cn(
                      "h-12 w-12 rounded-xl border-2 transition-all",
                      bookmarked ? "bg-amber-50 dark:bg-amber-950/20 border-amber-500 text-amber-600 dark:text-amber-500" : "border-zinc-200 dark:border-zinc-800 hover:border-amber-500"
                    )}
                  >
                    <Bookmark className={cn("h-5 w-5", bookmarked && "fill-current")} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="h-12 w-12 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 transition-all"
                  >
                    {copied ? <Check className="h-5 w-5 text-emerald-600" /> : <Copy className="h-5 w-5" />}
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 shadow-lg shadow-zinc-900/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <Info className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">About {tool.name}</h2>
              </div>
              <div className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {tool.description}
                </p>
              </div>
            </motion.div>

            {/* Screenshots Gallery */}
            {tool.screenshots && tool.screenshots.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 shadow-lg shadow-zinc-900/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight">Screenshots</h2>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {tool.screenshots.map((s, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="group relative aspect-video overflow-hidden rounded-2xl ring-1 ring-zinc-900/5 dark:ring-white/10 shadow-xl hover:shadow-2xl transition-all"
                    >
                      <Image 
                        src={s} 
                        alt={`${tool.name} screenshot ${i + 1}`} 
                        fill 
                        className="object-cover transition duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white font-semibold text-sm">
                          Screenshot {i + 1}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Key Features (Mock Data) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 shadow-lg shadow-zinc-900/5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Key Features</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Easy Integration', 'Fast Performance', 'Secure & Reliable', 'Great Support', '24/7 Uptime', 'Regular Updates'].map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + i * 0.05 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25 group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-semibold text-zinc-900 dark:text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5 sticky top-24"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Quick Info
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Pricing Model
                    </span>
                  </div>
                  <span className="text-lg font-black capitalize bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {tool.pricing}
                  </span>
                </div>
                
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Website
                    </span>
                  </div>
                  <a 
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline truncate block group"
                  >
                    {new URL(tool.website).hostname}
                    <ExternalLink className="inline-block ml-1 h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              <a href={tool.website} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full h-12 text-base font-bold rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 group">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </motion.div>

            {/* Categories & Tags Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-6 flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Categories & Tags
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.categories.map((c, i) => (
                      <motion.span 
                        key={c}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + i * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/50 text-xs font-bold transition-all hover:scale-105 hover:shadow-md cursor-pointer border border-zinc-200 dark:border-zinc-700"
                      >
                        {c}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 mb-3 uppercase tracking-wider">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((t, i) => (
                      <motion.span 
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.05 }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-700 dark:text-indigo-300 text-xs font-bold ring-1 ring-inset ring-indigo-500/30 dark:ring-indigo-500/20 hover:scale-105 hover:shadow-md transition-all cursor-pointer"
                      >
                        #{t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Share Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-gradient-to-br from-white to-indigo-50/30 dark:from-zinc-900 dark:to-indigo-950/30 backdrop-blur-sm p-6 shadow-lg shadow-zinc-900/5"
            >
              <h3 className="text-sm font-black uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share This Tool
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Found this useful? Share it with your network!
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all font-bold"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all font-bold"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}