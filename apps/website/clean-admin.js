
const fs = require('fs');
const file = 'src/app/admin/dashboard/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove projectsService import
content = content.replace(/import \{ projectsService \} from "@/lib/admin/services/projects.service";\n/, '');

// 2. Remove useQuery for projects
content = content.replace(/const \{ data: projects = \[\], isLoading: loadingProjects \} = useQuery\(\{ queryKey: \["projects"\], queryFn: \(\) => projectsService.getAll\(\) \}\);\n/, '');

// 3. Remove loadingProjects from loading
content = content.replace(/loadingProjects \|\| /, '');

// 4. Remove Total Projects card
content = content.replace(/\{ name: "Total Projects", value: projects.length.toString\(\), icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-500/10" \},\n/, '');

// 5. Remove Add Project quick action
content = content.replace(/\s*<Link href="\/admin\/dashboard\/projects\/create">[\s\S]*?<\/Link>/, '');

fs.writeFileSync(file, content);
console.log('Admin dashboard cleaned up');

