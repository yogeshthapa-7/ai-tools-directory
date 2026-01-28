// Mock data for AI tools, categories, and tags
export type Pricing = "free" | "freemium" | "paid";
export type Tool = {
  id: string;
  name: string;
  slug: string;
  image: string; // path in public/images
  shortDescription: string;
  description: string;
  categories: string[];
  tags: string[];
  pricing: Pricing;
  website: string;
  featured?: boolean;
  screenshots?: string[]; // image paths
};

export const CATEGORIES = [
  "Content Generation",
  "Design",
  "Developer Tools",
  "Productivity",
  "Marketing",
  "Audio/Video",
  "Research",
  "Education",
  "Analytics",
  "Automation",
  "Search",
] as const;

export const TAGS = [
  "GPT-4",
  "Image",
  "Video",
  "Audio",
  "No-code",
  "Open Source",
  "Browser Extension",
  "API",
  "Chrome",
  "MacOS",
  "Windows",
  "Developer",
  "Automation",
] as const;

export const TOOLS: Tool[] = [
 {
    id: "scribe",
    name: "Scribe",
    slug: "scribe",
    image: "https://d3m1fwcc59lqhy.cloudfront.net/images/icons/scribe.png",
    shortDescription:
      "Automatically turn workflows into clear, step-by-step visual guides.",
    description:
      "Scribe records your on-screen actions and instantly converts them into professional step-by-step documentation with screenshots. Ideal for SOPs, onboarding, training, and knowledge sharing across teams.",
    categories: ["Productivity"],
    tags: ["No-code", "Chrome", "Windows", "Automation", "Documentation"],
    pricing: "freemium",
    website: "https://scribehow.com",
    featured: true,
    screenshots: ["https://crxdl.com/screenshots/o/okfkdaglfjjjfefdcppliegebpoegaii_screenshot_3.jpg", 
      "https://cdn-images-1.medium.com/max/1600/0*isNQchemBqZIqXXo.jpg"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    slug: "chatgpt",
    image: "https://cdn.imgbin.com/19/20/25/chatgpt-logo-Yh9M6DVq.jpg",
    shortDescription:
      "Conversational AI for writing, coding, learning, and problem-solving.",
    description:
      "ChatGPT is a powerful AI assistant capable of generating text, answering questions, writing code, brainstorming ideas, tutoring, and assisting across research, education, and productivity use cases.",
    categories: ["Content Generation", "Research", "Education"],
    tags: ["GPT-4", "Browser Extension", "Writing", "Coding", "AI Assistant"],
    pricing: "freemium",
    website: "https://chatgpt.com",
    featured: true,
     screenshots: ["https://images.ctfassets.net/kftzwdyauwt9/40in10B8KtAGrQvwRv5cop/8241bb17c283dced48ea034a41d7464a/chatgpt_diagram_light.png?w=3840&q=90&fm=webp", 
      "https://images.ctfassets.net/kftzwdyauwt9/2TGxQkhDFLiCHyxUZZKzC/5c0aa7b1c3424a6c3f1ab291c3e7b8f7/Summarize.jpg?q=90&fm=webp"],
  },
  {
    id: "claude",
    name: "Claude",
    slug: "claude",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/1280px-Claude_AI_symbol.svg.png",
    shortDescription:
      "Advanced AI assistant focused on reasoning, safety, and long-form tasks.",
    description:
      "Claude is an AI assistant by Anthropic designed for deep reasoning, document analysis, coding help, and long-context conversations while prioritizing helpfulness and safety.",
    categories: ["Content Generation", "Research", "Developer Tools"],
    tags: ["API", "No-code", "Long Context", "AI Assistant"],
    pricing: "freemium",
    website: "https://claude.ai",
    featured: true,
     screenshots: ["https://cdn.prod.website-files.com/67053868fc01e494462e71c9/6710cb65b09ebb5f7d6f30aa_66c852f043460eba98fe3b50_claude-ai.jpeg", 
      "https://mintcdn.com/claude-code/-YhHHmtSxwr7W8gy/images/vs-code-extension-interface.jpg?fit=max&auto=format&n=-YhHHmtSxwr7W8gy&q=85&s=300652d5678c63905e6b0ea9e50835f8"],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    slug: "midjourney",
    image: "https://pngdownloads.wordpress.com/wp-content/uploads/2023/05/midjourney-logo-png.jpg?w=640",
    shortDescription:
      "Create high-quality, artistic images from text prompts.",
    description:
      "Midjourney is a powerful text-to-image AI known for producing visually striking, artistic, and cinematic images used by designers, artists, and creators.",
    categories: ["Design"],
    tags: ["Image", "Art", "Creative", "Generative AI"],
    pricing: "paid",
    website: "https://www.midjourney.com",
    featured: true,
     screenshots: ["https://www.researchgate.net/publication/366594739/figure/fig3/AS:11431281109517389@1672073146281/User-Interface-of-Midjourney.png", 
      "https://s3-alpha.figma.com/hub/file/3212514503/18ac0e70-c717-4115-83b2-36248372c356-cover.png"],
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    slug: "openai-api",
    image: "https://pnglove.com/data/img/1942_is6N.jpg",
    shortDescription:
      "Developer APIs for text, image, audio, and multimodal AI models.",
    description:
      "OpenAI API provides access to state-of-the-art AI models for text generation, embeddings, image creation, speech-to-text, and more, enabling developers to build AI-powered applications.",
    categories: ["Developer Tools"],
    tags: ["API", "GPT-4", "Developer", "AI Infrastructure"],
    pricing: "paid",
    website: "https://platform.openai.com",
     screenshots: ["https://images.ctfassets.net/lzny33ho1g45/5UKNTpC5JpB3HpfaxO0vFX/38d3e31c1157936b224993281d8b2016/openai-api-image28.png", 
      "https://content.pstmn.io/39a27206-d751-40b3-b9bd-2f7287aea9b6/U2NyZWVuc2hvdCAyMDI0LTA4LTAyIGF0IDcuNDcuMDLigK9QTS5wbmc="],
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    slug: "notion-ai",
    image: "https://freight.cargo.site/t/original/i/7178a3fc03cf5db48f708b3bcb104ff9caa04ccae48df379f681099b8176469e/Frame-2.png",
    shortDescription:
      "AI writing, summarization, and brainstorming inside Notion.",
    description:
      "Notion AI helps users write, summarize, rewrite, and brainstorm directly within Notion documents, making productivity workflows faster and more efficient.",
    categories: ["Productivity"],
    tags: ["No-code", "Writing", "Knowledge Base"],
    pricing: "paid",
    website: "https://notion.so",
     screenshots: ["https://cdn.dribbble.com/userupload/11792204/file/original-b1e1b0bb0d1170b45eacb69460ef593e.jpg?format=webp&resize=400x300&vertical=center", 
      "https://i.ytimg.com/vi/3ye-ocvVrKA/maxresdefault.jpg"],
  },
  {
    id: "obsidian",
    name: "Obsidian Copilot",
    slug: "obsidian-copilot",
    image: "https://cdn2.steamgriddb.com/logo_thumb/35effc542dc36933a9c7ba0d56006380.png",
    shortDescription:
      "AI assistance for navigating and understanding your notes.",
    description:
      "Obsidian Copilot uses AI to analyze your personal knowledge base, surface connections between notes, and answer questions directly from your Obsidian vault.",
    categories: ["Research", "Productivity"],
    tags: ["Windows", "MacOS", "Knowledge Management"],
    pricing: "freemium",
    website: "https://obsidian.md",
     screenshots: ["https://blogs.nvidia.com/wp-content/uploads/2024/11/what-to-do-in-lunar-city.png", 
      "https://assets.superblog.ai/site_cuid_cl495vqej08071jpawt8inf39/images/obsidian-vault-1686829687937-compressed.png"],
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    slug: "perplexity-ai",
    image: "https://static.vecteezy.com/system/resources/thumbnails/067/941/679/small_2x/perplexity-ai-logo-rounded-hd-free-png.png",
    shortDescription:
      "AI search engine that delivers answers with cited sources.",
    description:
      "Perplexity AI combines large language models with real-time web search to provide accurate, concise answers backed by citations, making research faster and more reliable.",
    categories: ["Research", "Search"],
    tags: ["GPT-4", "Browser Extension", "Search", "Citations"],
    pricing: "freemium",
    website: "https://www.perplexity.ai",
    featured: true,
     screenshots: ["https://cdn.dribbble.com/userupload/13953016/file/original-bc158034d4febdbe2706b1f6ffd0451b.jpg", 
      "https://knowtechie.com/wp-content/uploads/2025/05/perplexity-jpg.webp"],
  },
  {
    id: "runway",
    name: "Runway ML",
    slug: "runway-ml",
    image: "https://freebiehive.com/wp-content/uploads/2024/04/Runway-Ai-Black-Symbol-Logo-PNG.jpg",
    shortDescription:
      "Professional AI tools for video generation and editing.",
    description:
      "Runway ML offers advanced AI-powered video tools including text-to-video, image-to-video, background removal, and creative effects for filmmakers and creators.",
    categories: ["Audio/Video", "Design"],
    tags: ["Video", "Image", "Creative", "Generative AI"],
    pricing: "freemium",
    website: "https://runwayml.com",
    featured: true,
     screenshots: ["https://miro.medium.com/1*yb1hP1busX3sjjCufZbhPw.png", 
      "https://nofilmschool.com/media-library/runway.jpg?id=34048061&width=800&quality=50"],
  },
  {
    id: "cursor",
    name: "Cursor AI",
    slug: "cursor-ai",
    image: "https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/brand/brand-logo-2.svg",
    shortDescription:
      "AI-powered code editor built for modern developers.",
    description:
      "Cursor is a developer-focused code editor that integrates AI deeply into the coding workflow, enabling fast code generation, refactoring, and intelligent debugging.",
    categories: ["Developer Tools"],
    tags: ["Developer", "API", "Code Editor", "AI Coding"],
    pricing: "freemium",
    website: "https://cursor.sh",
    featured: true,
     screenshots: ["https://cdn.prod.website-files.com/6542d8f9e468531067fe9978/68711ec046bc57b16a1c2b59_AD_4nXcbLPspUVHKY2FIAAM3s6PhzpL8nizgpJ_zsg1SMkXiSJXhFOEMy3O1f_lfwBS6YwpINeGuInGWL5YCePY7oVm5kDP1olRjBkkrmMJZEZh0kaklgCyocgjay5_mVdyntenmH0mTsQ.webp", 
      "https://substackcdn.com/image/fetch/$s_!IEHE!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27253e8e-2d70-41e0-99f1-f9e5a684f1a3_2918x1855.jpeg"],
  },
  {
    id: "replit-ai",
    name: "Replit AI",
    slug: "replit-ai",
    image: "https://cdn.sanity.io/images/bj34pdbp/migration/3c2f2d404a571d2c9fbca934360352698d63433a-1920x900.png?w=3840&q=75&fit=clip&auto=format",
    shortDescription:
      "AI coding assistant inside an online IDE.",
    description:
      "Replit AI helps developers write, explain, debug, and optimize code directly in the browser, making it ideal for learning, prototyping, and collaboration.",
    categories: ["Developer Tools", "Education"],
    tags: ["Browser Extension", "Developer", "Online IDE"],
    pricing: "freemium",
    website: "https://replit.com",
     screenshots: ["https://cdn.sanity.io/images/q0fo807q/production/f4e55b4fa97ba6a36842a6ed7f434b628330fd09-3648x2208.png?w=1200&q=100&fit=max&auto=format", 
      "https://cdn.sanity.io/images/bj34pdbp/migration/20f6f38883eb8ae50af130fb105db63d6fe7ee40-4936x2777.png?w=3840&q=100&fit=max&auto=format"],
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    slug: "elevenlabs",
    image: "https://original.fontsinuse.com/fontsinuse.com/use-images/N229/229981/229981.jpeg",
    shortDescription:
      "Generate ultra-realistic AI voices and speech.",
    description:
      "ElevenLabs provides state-of-the-art text-to-speech and voice cloning technology, widely used for audiobooks, videos, games, and voice assistants.",
    categories: ["Audio/Video"],
    tags: ["Audio", "API", "Text-to-Speech", "Voice AI"],
    pricing: "freemium",
    website: "https://elevenlabs.io",
    featured: true,
     screenshots: ["https://elevenlabs.io/_next/image?url=https%3A%2F%2Feleven-public-cdn.elevenlabs.io%2Fpayloadcms%2F1f7cu8icv75-elevenlabs-ui.webp&w=3840&q=95", 
      "https://images.ctfassets.net/lzny33ho1g45/5yFF9EYxFHRN9rvq37YT7/98f72a40ac88b2c35243a87069804d3d/elevenlabs-image12.png"],
  },
  {
    id: "jasper",
    name: "Jasper AI",
    slug: "jasper-ai",
    image: "https://logowik.com/content/uploads/images/jasper2487.logowik.com.webp",
    shortDescription:
      "Enterprise-focused AI writing for marketing teams.",
    description:
      "Jasper AI helps marketing teams create high-quality content such as blogs, ads, emails, and SEO copy with brand consistency and collaboration features.",
    categories: ["Marketing", "Content Generation"],
    tags: ["GPT-4", "Marketing", "Copywriting"],
    pricing: "paid",
    website: "https://www.jasper.ai",
     screenshots: ["https://gdm-catalog-fmapi-prod.imgix.net/ProductScreenshot/7ebbab00-2353-4c6a-90f3-a9a65a047974.jpeg", 
      "https://cdn.prod.website-files.com/6807f44ec8a964d38a705332/6839889df8aae87923c8af70_655e762576726fc74814b815_Blog%2520Hero%2520New-min.png"],
  },
  {
    id: "canva-ai",
    name: "Canva AI",
    slug: "canva-ai",
    image: "https://www.pngall.com/wp-content/uploads/13/Canva-Logo-PNG.png",
    shortDescription:
      "Design faster using AI-powered creative tools.",
    description:
      "Canva AI brings text-to-image, Magic Write, AI presentations, and smart design suggestions into an easy-to-use visual design platform.",
    categories: ["Design", "Productivity"],
    tags: ["Image", "No-code", "Design Tools"],
    pricing: "freemium",
    website: "https://www.canva.com",
    featured: true,
     screenshots: ["https://static-cse.canva.com/blob/1647143/Leonardo.ai.png", 
      "https://images.ctfassets.net/kftzwdyauwt9/bcyEWNucFNbUsrKs9mTHf/28f330217e84323f4804a1380ffa59d2/3.jpg?w=3840&q=90&fm=webp"],
  },
  {
    id: "zapier-ai",
    name: "Zapier AI",
    slug: "zapier-ai",
    image: "https://toppng.com/uploads/preview/zapier-logo-11609384024iqadesape3.png",
    shortDescription:
      "Automate workflows using AI and natural language.",
    description:
      "Zapier AI allows users to create and manage automated workflows across thousands of apps using simple natural-language instructions.",
    categories: ["Productivity", "Automation"],
    tags: ["No-code", "Automation", "Workflow"],
    pricing: "freemium",
    website: "https://zapier.com",
     screenshots: ["https://s3-alpha.figma.com/hub/file/4889105070/3aac7ef0-3241-42c9-8b18-74952ee93b55-cover.png", 
      "https://images.ctfassets.net/lzny33ho1g45/48ONiCyILj0iJODZY9rYEW/2b13901288d07d07357a4f5971a6e84a/Screenshot_2023-11-05_at_7.45.17_AM.png"],
  },
  {
    id: "synthesia",
    name: "Synthesia",
    slug: "synthesia",
    image: "https://static.wixstatic.com/media/f0863f_b0ce8f7a524f4e29aa83537f1cfb1903~mv2.png/v1/fill/w_478,h_334,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bullhorn_edited.png",
    shortDescription:
      "Create professional videos with AI avatars.",
    description:
      "Synthesia enables users to create studio-quality videos using AI avatars and voices without cameras, actors, or complex editing.",
    categories: ["Audio/Video", "Marketing"],
    tags: ["Video", "Marketing", "AI Avatars"],
    pricing: "paid",
    website: "https://www.synthesia.io",
     screenshots: ["https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d70e/688731d81bfa52469d473301_667973bf3aa7470a12038d22_imp1k9cc0l.webp", 
      "https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,quality=80,format=auto,onerror=redirect/uploads/asset/file/42d840e9-6e5c-4f3b-9ac0-bc9d6dd0cc38/Synthesia_Launches_AI-Powered_Personal_Avatars_for_Videos.png"],
  },
  {
    id: "phind",
    name: "Phind",
    slug: "phind",
    image: "https://res.cloudinary.com/apideck/image/upload/v1675972652/marketplaces/ckhg56iu1mkpc0b66vj7fsj3o/listings/9cd50202-8ffe-4e0a-8f4e-0f843dd85a2a_1_yazpkm.png",
    shortDescription:
      "AI-powered search built specifically for developers.",
    description:
      "Phind helps developers find accurate programming answers, explanations, and code snippets faster using AI-enhanced search.",
    categories: ["Developer Tools", "Search"],
    tags: ["Developer", "API", "Programming"],
    pricing: "freemium",
    website: "https://www.phind.com",
     screenshots: ["https://blogs.novita.ai/wp-content/uploads/2024/12/1-36-1-1.png", 
      "https://cdn.prod.website-files.com/643e89c2fc0b09a30ab40ca7/6656aa880b9510425f6d5291_capture-decran-du-site-Phind.webp"],
  },
];
