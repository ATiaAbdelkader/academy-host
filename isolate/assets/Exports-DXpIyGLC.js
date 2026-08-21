import{j as e}from"./framer-motion-CzqMM4Kv.js";import{c as $,u as M,a as b,b as y,t as u}from"./index-WAwnzqzP.js";import{A}from"./AppHeader-DfJsQiHc.js";import{B as j}from"./button-DcBst6gS.js";import{u as z}from"./use-catalog-9achy8gf.js";import{L as N}from"./react-vendor-KgAAZzzj.js";import{F as L}from"./file-text-Cvgbyldh.js";import{A as P}from"./award-B8imZG4H.js";import{D as w}from"./download-DSRKa7Ps.js";import"./radix-ui-BOX2WDct.js";import"./sun-Hljosb2G.js";import"./bell-C-EH_vxZ.js";import"./leaf-DVE0lqOe.js";import"./charts-CdDPdltI.js";const E=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],B=$("list-checks",E);const I=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",key:"1dfntj"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5",key:"6s6qgf"}]],_=$("sticky-note",I);function Z(){const{user:l}=M(),r=b(y.progress.myProgress),c=z(),n=b(y.gamification.myStats),m=b(y.insights.myQuizInsights),p=()=>{const s=(r??[]).filter(t=>t.note&&t.note.trim().length>0).map(t=>`# ${(c??[]).find(d=>d._id===t.courseId)?.title??"Course"}

${t.note}
`);if(s.length===0){u.error("No notes to export yet.");return}const a=`# AgriSkills Academy — My Study Notes

Exported on ${new Date().toLocaleDateString()}

${"─".repeat(60)}

${s.join(`
`+"─".repeat(60)+`

`)}`;f(a,"agriskills-study-notes.md","text/markdown"),u.success("Study notes downloaded as Markdown.")},v=()=>{const s=(r??[]).filter(o=>o.status==="completed").length,a=(c??[]).filter(o=>o.published).length;let t=`# AgriSkills Academy — Progress Report

`;t+=`Student: ${l?.name??l?.email??"N/A"}
`,t+=`Generated: ${new Date().toLocaleDateString()}
`,t+=`Courses completed: ${s}/${a}
`,t+=`Points: ${n?.points??0}
`,t+=`Current streak: ${n?.streakDays??0} days
`,t+=`Best streak: ${n?.bestStreak??0} days
`,t+=`Badges earned: ${n?.badges?.length??0}

`,t+=`${"─".repeat(60)}

`,t+=`## Course Progress

`,t+=`| Course | Status | Module | Last Updated |
`,t+=`|--------|--------|--------|--------------|
`,(r??[]).forEach(o=>{const d=(c??[]).find(g=>g._id===o.courseId),x=d?.title??"Course",i=d?.modules?.length??0;t+=`| ${x} | ${o.status.toUpperCase()} | ${i>0?`${(o.lastModuleIndex??0)+1}/${i}`:"—"} | ${new Date(o.updatedAt).toLocaleDateString()} |
`}),m&&m.length>0&&(t+=`
## Quiz Performance

`,t+=`| Course | Attempts | Best Score | Pass Rate |
`,t+=`|--------|----------|------------|----------|
`,m.forEach(o=>{const d=o.attempts>0?Math.round(o.passed/o.attempts*100):0;t+=`| ${o.courseTitle} | ${o.attempts} | ${o.bestScore}% | ${d}% |
`})),n&&n.badges.length>0&&(t+=`
## Badges Earned

`,n.badges.forEach(o=>{t+=`- ${o.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())}
`})),f(t,"agriskills-progress-report.md","text/markdown"),u.success("Progress report downloaded.")},S=()=>{const s=(r??[]).filter(t=>t.status!=="completed"&&t.lastModuleIndex!=null&&(t.lastModuleIndex??0)>0);if(s.length===0){u.error("No active study plans to export.");return}let a=`# AgriSkills Academy — Study Plan

`;a+=`Student: ${l?.name??l?.email??"N/A"}
`,a+=`Generated: ${new Date().toLocaleDateString()}

`,a+=`${"─".repeat(60)}

`,s.forEach(t=>{const o=(c??[]).find(i=>i._id===t.courseId),d=o?.modules??[],x=t.lastModuleIndex??0;a+=`## ${o?.title??"Course"}

`,a+=`Progress: Module ${x+1} of ${d.length}

`,a+=`### Remaining Modules

`;for(let i=x;i<d.length;i++){const g=d[i],k=i===x;a+=`${k?"▶":"○"} **Module ${i+1}: ${g.title}**
`,k&&(a+=`  → Currently in progress
`),g.content.some(D=>D.type==="quiz")&&(a+=`  → Module quiz (pass to continue)
`),a+=`
`}}),a+=`
${"─".repeat(60)}
`,a+=`
*Keep pushing forward — every module completed is progress earned.*
`,f(a,"agriskills-study-plan.md","text/markdown"),u.success("Study plan downloaded.")},C=()=>{if(!n||n.badges.length===0){u.error("No badges earned yet to export.");return}let s=`# AgriSkills Academy — Badge Collection

`;s+=`Student: ${l?.name??l?.email??"N/A"}
`,s+=`Total points: ${n.points}
`,s+=`Generated: ${new Date().toLocaleDateString()}

`,s+=`${"─".repeat(60)}

`,n.badges.forEach((a,t)=>{const o=a.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase());s+=`${t+1}. **${o}** ✓
`}),s+=`
${"─".repeat(60)}
`,s+=`
*Points earned: ${n.points} | Best streak: ${n.bestStreak} days*
`,f(s,"agriskills-badges.md","text/markdown"),u.success("Badge collection downloaded.")};return e.jsxs("main",{className:"min-h-screen bg-background text-foreground",children:[e.jsx(A,{path:"~/exports"}),e.jsxs("div",{className:"mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",children:[e.jsx("p",{className:"text-xs text-term-green",children:"[ok] export center — download your learning data"}),e.jsx("h1",{className:"mt-3 text-3xl font-bold tracking-tight",children:"Export & Downloads"}),e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Download your study notes, progress reports, certificates, and study plans as clean Markdown files."}),e.jsxs("div",{className:"mt-8 grid gap-4 sm:grid-cols-2",children:[e.jsx(h,{icon:e.jsx(_,{className:"size-5 text-term-green"}),title:"Study Notes",description:"Download all your private course notes as a single Markdown file.",action:"download notes",onClick:p}),e.jsx(h,{icon:e.jsx(L,{className:"size-5 text-term-green"}),title:"Progress Report",description:"Full progress report with quiz scores, badges earned, and course completion status.",action:"download report",onClick:v}),e.jsx(h,{icon:e.jsx(B,{className:"size-5 text-term-amber"}),title:"Study Plan",description:"Export your active study plans with remaining modules and quiz milestones.",action:"download plan",onClick:S}),e.jsx(h,{icon:e.jsx(P,{className:"size-5 text-term-amber"}),title:"Badge Collection",description:"Export your earned badges and total points as a shareable document.",action:"download badges",onClick:C})]}),e.jsxs("div",{className:"mt-8 border border-border bg-card",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-muted px-4 py-2.5",children:[e.jsx("span",{className:"text-xs font-semibold",children:"certificate gallery"}),e.jsxs("span",{className:"text-[11px] text-muted-foreground",children:[r?.filter(s=>s.status==="completed").length??0," ","certificates earned"]})]}),r===void 0&&e.jsxs("div",{className:"space-y-2 p-4",children:[e.jsx("div",{className:"h-4 animate-pulse bg-muted"}),e.jsx("div",{className:"h-4 animate-pulse bg-muted"})]}),r!=null&&r.filter(s=>s.status==="completed").length===0&&e.jsxs("div",{className:"px-4 py-10 text-center text-sm text-muted-foreground",children:[e.jsxs("p",{children:[e.jsx("span",{className:"text-term-green",children:"[ok]"})," complete a course to earn your first certificate."]}),e.jsx(j,{asChild:!0,variant:"outline",size:"sm",className:"mt-4 text-xs",children:e.jsx(N,{to:"/courses",children:"browse catalog"})})]}),r!=null&&r.filter(s=>s.status==="completed").length>0&&e.jsx("div",{children:r.filter(s=>s.status==="completed").map(s=>{const a=(c??[]).find(t=>t._id===s.courseId);return e.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30",children:[e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-sm font-medium",children:a?.title??"Course"}),e.jsxs("span",{className:"mt-0.5 block text-[11px] text-muted-foreground",children:[a?.category??""," · completed"," ",new Date(s.updatedAt).toLocaleDateString()]})]}),e.jsx(j,{asChild:!0,variant:"outline",size:"sm",className:"gap-1.5 text-xs",children:e.jsxs(N,{to:`/certificate/${s.courseId}`,children:[e.jsx(w,{className:"size-3.5"}),"download"]})})]},s._id)})})]}),e.jsxs("p",{className:"mt-6 text-xs text-muted-foreground",children:[e.jsx("span",{className:"text-term-green",children:"[ok]"})," all exports are Markdown files — open them in any text editor or converter"]})]})]})}function h({icon:l,title:r,description:c,action:n,onClick:m}){return e.jsxs("div",{className:"border border-border bg-card",children:[e.jsxs("div",{className:"flex items-start gap-3 border-b border-border bg-muted px-4 py-3",children:[l,e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold",children:r}),e.jsx("p",{className:"mt-0.5 text-xs text-muted-foreground",children:c})]})]}),e.jsxs("div",{className:"flex items-center justify-between px-4 py-3",children:[e.jsx("span",{className:"text-[11px] text-muted-foreground",children:".md format · readable anywhere"}),e.jsxs(j,{variant:"outline",size:"sm",className:"gap-1.5 text-xs",onClick:m,children:[e.jsx(w,{className:"size-3.5"}),n]})]})]})}function f(l,r,c){const n=new Blob([l],{type:c}),m=URL.createObjectURL(n),p=document.createElement("a");p.href=m,p.download=r,p.click(),URL.revokeObjectURL(m)}export{Z as default};
