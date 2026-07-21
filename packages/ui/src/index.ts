export { cn } from "./lib/utils";

// Lightweight UI primitives - safe to barrel export
export * from "./components/ui/accordion";
export * from "./components/ui/alert";
export * from "./components/ui/avatar";
export * from "./components/ui/badge";
export * from "./components/ui/breadcrumb";
export * from "./components/ui/button";
export * from "./components/ui/card";
export * from "./components/ui/checkbox";
export * from "./components/ui/dialog";
export * from "./components/ui/drawer";
export * from "./components/ui/dropdown-menu";
export * from "./components/ui/form";
export * from "./components/ui/input";
export * from "./components/ui/label";
export * from "./components/ui/pagination";
export * from "./components/ui/popover";
export * from "./components/ui/radio-group";
export * from "./components/ui/select";
export * from "./components/ui/separator";
export * from "./components/ui/skeleton";
export * from "./components/ui/switch";
export * from "./components/ui/table";
export * from "./components/ui/tabs";
export * from "./components/ui/textarea";
export * from "./components/ui/toast";
export * from "./components/ui/toaster";
export * from "./components/ui/tooltip";
export * from "./components/ui/navigation-menu";
export * from "./components/ui/toggle";

// Lightweight custom components - safe to barrel export
export * from "./components/custom/container";
export * from "./components/custom/section";
export * from "./components/custom/grid";
export * from "./components/custom/icon-button";
export * from "./components/custom/loading-spinner";
export * from "./components/custom/empty-state";
export * from "./components/custom/blog-card";
export * from "./components/custom/career-card";
export * from "./components/custom/project-card";
export * from "./components/custom/pricing-card";
export * from "./components/custom/team-card";
export * from "./components/custom/faq-component";
export * from "./components/custom/statistics";
export * from "./components/custom/footer";
export * from "./components/custom/navbar";
export * from "./components/custom/page-transition";

// HEAVY components - import directly from "@voryent/ui/src/components/custom/<name>"
// to avoid bundling them in every page:
// - ai-chat-widget (AI chat, large)
// - charts-wrapper (Recharts, heavy)
// - command-palette (cmdk, heavy)
// - cookie-banner
// - hero-component
// - mega-menu
// - sidebar
