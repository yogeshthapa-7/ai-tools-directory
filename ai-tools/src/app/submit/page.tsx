"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CATEGORIES, TAGS } from "@/lib/data";
import {
  Upload,
  Link as LinkIcon,
  FileText,
  Tag,
  DollarSign,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Loader2,
  ImageIcon,
  ArrowRight,
  TrendingUp
} from "lucide-react";

export default function SubmitPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    category: "",
    pricing: "",
    tags: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Tool name is required";
    if (!formData.website.trim()) newErrors.website = "Website URL is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.pricing) newErrors.pricing = "Please select a pricing model";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1500);
  }

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-slate-900 dark:to-indigo-950/20">
      <main className="mx-auto w-full max-w-4xl px-4 pt-32 pb-20 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-5 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-6 ring-1 ring-inset ring-indigo-500/20 shadow-lg shadow-indigo-500/10">
            <Sparkles className="h-4 w-4" />
            <span>Share Your Tool</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Submit Your AI Tool
            </span>
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
            Join our curated directory and get your AI tool discovered by thousands of users every month.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-8 sm:p-12 shadow-2xl shadow-zinc-900/5"
        >
          <form onSubmit={onSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-black">Basic Information</h2>
              </div>

              {/* Tool Name */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Tool Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., ChatGPT, Midjourney, Claude"
                    className={`w-full rounded-xl border-2 ${errors.name
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                      } bg-white dark:bg-zinc-900/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 transition-all placeholder:text-zinc-400 font-medium`}
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.name}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Website URL */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Website URL <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className={`w-full rounded-xl border-2 ${errors.website
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                      } bg-white dark:bg-zinc-900/50 pl-11 pr-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 transition-all placeholder:text-zinc-400 font-medium`}
                  />
                  {errors.website && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.website}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Short Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what makes your tool unique and valuable..."
                  rows={4}
                  className={`w-full rounded-xl border-2 ${errors.description
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                    : "border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                    } bg-white dark:bg-zinc-900/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 transition-all placeholder:text-zinc-400 font-medium resize-none`}
                />
                {errors.description && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.description}
                  </motion.div>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  {formData.description.length}/280 characters
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

            {/* Classification */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Tag className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-black">Classification</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full rounded-xl border-2 ${errors.category
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                      } bg-white dark:bg-zinc-900/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 transition-all font-medium`}
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.category}
                    </motion.div>
                  )}
                </div>

                {/* Pricing */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Pricing Model <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.pricing}
                    onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                    className={`w-full rounded-xl border-2 ${errors.pricing
                      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/10"
                      : "border-zinc-200 dark:border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                      } bg-white dark:bg-zinc-900/50 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none focus:ring-4 transition-all font-medium`}
                  >
                    <option value="">Select pricing</option>
                    <option value="free">Free</option>
                    <option value="freemium">Freemium</option>
                    <option value="paid">Paid</option>
                  </select>
                  {errors.pricing && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 font-semibold"
                    >
                      <AlertCircle className="h-3 w-3" />
                      {errors.pricing}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <motion.button
                    key={t}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTag(t)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-all ${formData.tags.includes(t)
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                  >
                    {formData.tags.includes(t) && <CheckCircle className="h-3.5 w-3.5" />}
                    #{t}
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Selected {formData.tags.length} tags
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-4 text-base font-black text-white shadow-xl shadow-indigo-500/25 transition-all hover:shadow-2xl hover:shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Tool
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="sm:w-auto rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 px-8 py-4 text-base font-bold text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/70 hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid gap-4 sm:grid-cols-3"
        >
          {[
            { icon: Sparkles, title: "Free Listing", desc: "No cost to submit" },
            { icon: CheckCircle, title: "Fast Review", desc: "Approved within 24h" },
            { icon: TrendingUp, title: "Get Discovered", desc: "Reach 50k+ users" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm p-6 text-center shadow-lg shadow-zinc-900/5"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-3 shadow-lg shadow-indigo-500/25">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-black text-zinc-900 dark:text-white mb-1">{item.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </main>

      {/* Background */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] -left-[5%] h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-[100px] dark:bg-indigo-500/10" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[800px] w-[800px] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/10" />
      </div>
    </div>
  );
}