"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyCKWBVMTorgguQB203TzJErX9Eu0d0l4J4",
    authDomain: "voryent-solutions.firebaseapp.com",
    projectId: "voryent-solutions",
    storageBucket: "voryent-solutions.firebasestorage.app",
    messagingSenderId: "880427890600",
    appId: "1:880427890600:web:f905900ce7f3a3d38b8f9d",
    measurementId: "G-7D2FPP431D"
};
var app = (0, app_1.getApps)().length === 0 ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApp)();
var auth = (0, auth_1.getAuth)(app);
var db = (0, firestore_1.getFirestore)(app);
var pages = [
    {
        id: "homepage",
        title: "Voryent Solutions - Enterprise Software Development",
        slug: "/",
        content: {
            hero: { title: "Transforming Businesses with Modern Software", subtitle: "We build scalable, secure, and intuitive digital experiences." },
        },
        seo: { title: "Voryent Solutions | Enterprise Software", description: "Voryent Solutions is a premier enterprise software development company.", keywords: "software development, enterprise, SaaS" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "about",
        title: "About Us",
        slug: "about",
        content: {
            hero: { title: "Our Mission & Vision", subtitle: "Innovating for a better digital tomorrow." },
        },
        seo: { title: "About | Voryent Solutions", description: "Learn more about Voryent Solutions.", keywords: "about us, voryent team" },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
var services = [
    {
        id: "custom-software",
        title: "Custom Software Development",
        slug: "custom-software",
        shortDescription: "Tailored software solutions to address your unique business challenges.",
        seo: { title: "Custom Software | Voryent Solutions", description: "Bespoke software development services." },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "cloud-architecture",
        title: "Cloud Architecture",
        slug: "cloud-architecture",
        shortDescription: "Scalable and secure cloud infrastructure design and migration.",
        seo: { title: "Cloud Architecture | Voryent Solutions", description: "AWS, Azure, and GCP cloud architecture services." },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
var industries = [
    {
        id: "finance",
        title: "Financial Services",
        slug: "finance",
        shortDescription: "Secure, compliant tech for modern finance.",
        seo: { title: "Financial Services | Voryent Solutions", description: "Fintech solutions and secure financial software." },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "healthcare",
        title: "Healthcare",
        slug: "healthcare",
        shortDescription: "HIPAA-compliant platforms for the healthcare industry.",
        seo: { title: "Healthcare | Voryent Solutions", description: "Healthcare software development." },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
var faqs = [
    {
        id: "faq-1",
        question: "What is your typical project timeline?",
        answer: "Our project timelines vary depending on complexity, but most MVP projects take between 3 to 6 months.",
        category: "General",
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "faq-2",
        question: "Do you offer post-launch support?",
        answer: "Yes, we offer comprehensive SLA-based support and maintenance packages.",
        category: "Support",
        order: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
var resources = [
    {
        id: "cloud-migration-guide",
        title: "The Ultimate Cloud Migration Guide",
        slug: "cloud-migration-guide",
        type: "Whitepaper",
        description: "Learn how to successfully migrate legacy systems to the cloud without downtime.",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
var blogs = Array.from({ length: 10 }).map(function (_, i) { return ({
    id: "blog-post-".concat(i + 1),
    title: "The Future of Enterprise Tech ".concat(i + 1),
    slug: "future-enterprise-tech-".concat(i + 1),
    excerpt: "An in-depth look at how emerging technologies are reshaping the enterprise landscape in part ".concat(i + 1, "."),
    content: "This is the full markdown content for the blog post ".concat(i + 1, ". We cover AI, cloud, and security."),
    author: "Admin User",
    category: "Technology",
    tags: ["AI", "Cloud", "Enterprise"],
    publishedAt: new Date().toISOString(),
    seo: { title: "Future of Enterprise Tech ".concat(i + 1, " | Voryent Solutions"), description: "A deep dive into emerging tech trends." },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}); });
function seedData() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, authErr_1, collections, _i, collections_1, coll, _a, _b, item, docRef, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    console.log("Signing in...");
                    email = process.env.ADMIN_EMAIL || "admin@voryent.com";
                    password = process.env.ADMIN_PASSWORD || "admin123";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, auth_1.signInWithEmailAndPassword)(auth, email, password)];
                case 2:
                    _c.sent();
                    console.log("Signed in successfully. Seeding data...");
                    return [3 /*break*/, 4];
                case 3:
                    authErr_1 = _c.sent();
                    console.warn("Could not sign in automatically. If you have strict Firestore rules, seeding might fail.");
                    console.warn("Error:", authErr_1.message);
                    return [3 /*break*/, 4];
                case 4:
                    collections = [
                        { name: "pages", data: pages },
                        { name: "services", data: services },
                        { name: "industries", data: industries },
                        { name: "faqs", data: faqs },
                        { name: "resources", data: resources },
                        { name: "blogs", data: blogs },
                    ];
                    _i = 0, collections_1 = collections;
                    _c.label = 5;
                case 5:
                    if (!(_i < collections_1.length)) return [3 /*break*/, 10];
                    coll = collections_1[_i];
                    console.log("Seeding ".concat(coll.name, "..."));
                    _a = 0, _b = coll.data;
                    _c.label = 6;
                case 6:
                    if (!(_a < _b.length)) return [3 /*break*/, 9];
                    item = _b[_a];
                    docRef = (0, firestore_1.doc)(db, coll.name, item.id);
                    return [4 /*yield*/, (0, firestore_1.setDoc)(docRef, item)];
                case 7:
                    _c.sent();
                    _c.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9:
                    _i++;
                    return [3 /*break*/, 5];
                case 10:
                    console.log("Seeding completed successfully!");
                    process.exit(0);
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _c.sent();
                    console.error("Error seeding data:", error_1);
                    process.exit(1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
seedData();
