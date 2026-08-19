import{j as e}from"./framer-motion-CzqMM4Kv.js";import{c as k,u as z,a as b,b as y,t as u}from"./index-D9jl3W8D.js";import{A as D}from"./AppHeader-CpsC4JUP.js";import{B as j}from"./button-DcBst6gS.js";import{u as A}from"./use-catalog-D6EZEsA2.js";import{L as $}from"./react-vendor-KgAAZzzj.js";import{A as L}from"./award-BzxuKHN5.js";import{D as w}from"./download-HSPpir8u.js";import"./radix-ui-BOX2WDct.js";import"./charts-CdDPdltI.js";const P=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],E=k("file-text",P);const _=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],B=k("list-checks",_);const I=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z",key:"1dfntj"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5",key:"6s6qgf"}]],R=k("sticky-note",I);function W(){const{user:l}=z(),r=b(y.progress.myProgress),c=A(),n=b(y.gamification.myStats),m=b(y.insights.myQuizInsights),p=()=>{const s=(r??[]).filter(t=>t.note&&t.note.trim().length>0).map(t=>`# ${(c??[]).find(d=>d._id===t.courseId)?.title??"Course"}

${t.note}
`);if(s.length===0){u.error("No notes to export yet.");return}const o=`# AgriSkills Academy — My Study Notes

Exported on ${new Date().toLocaleDateString()}

${"─".repeat(60)}

${s.join(`
`+"─".repeat(60)+`

`)}`;f(o,"agriskills-study-notes.md","text/markdown"),u.success("Study notes downloaded as Markdown.")},v=()=>{const s=(r??[]).filter(a=>a.status==="completed").length,o=(c??[]).filter(a=>a.published).length;let t=`# AgriSkills Academy — Progress Report

`;t+=`Student: ${l?.name??l?.email??"N/A"}
`,t+=`Generated: ${new Date().toLocaleDateString()}
`,t+=`Courses completed: ${s}/${o}
`,t+=`Points: ${n?.points??0}
`,t+=`Current streak: ${n?.streakDays??0} days
`,t+=`Best streak: ${n?.bestStreak??0} days
`,t+=`Badges earned: ${n?.badges?.length??0}

`,t+=`${"─".repeat(60)}

`,t+=`## Course Progress

`,t+=`| Course | Status | Module | Last Updated |
`,t+=`|--------|--------|--------|--------------|
`,(r??[]).forEach(a=>{const d=(c??[]).find(g=>g._id===a.courseId),x=d?.title??"Course",i=d?.modules?.length??0;t+=`| ${x} | ${a.status.toUpperCase()} | ${i>0?`${(a.lastModuleIndex??0)+1}/${i}`:"—"} | ${new Date(a.updatedAt).toLocaleDateString()} |
`}),m&&m.length>0&&(t+=`
## Quiz Performance

`,t+=`| Course | Attempts | Best Score | Pass Rate |
`,t+=`|--------|----------|------------|----------|
`,m.forEach(a=>{const d=a.attempts>0?Math.round(a.passed/a.attempts*100):0;t+=`| ${a.courseTitle} | ${a.attempts} | ${a.bestScore}% | ${d}% |
`})),n&&n.badges.length>0&&(t+=`
## Badges Earned

`,n.badges.forEach(a=>{t+=`- ${a.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase())}
`})),f(t,"agriskills-progress-report.md","text/markdown"),u.success("Progress report downloaded.")},S=()=>{const s=(r??[]).filter(t=>t.status!=="completed"&&t.lastModuleIndex!=null&&(t.lastModuleIndex??0)>0);if(s.length===0){u.error("No active study plans to export.");return}let o=`# AgriSkills Academy — Study Plan

`;o+=`Student: ${l?.name??l?.email??"N/A"}
`,o+=`Generated: ${new Date().toLocaleDateString()}

`,o+=`${"─".repeat(60)}

`,s.forEach(t=>{const a=(c??[]).find(i=>i._id===t.courseId),d=a?.modules??[],x=t.lastModuleIndex??0;o+=`## ${a?.title??"Course"}

`,o+=`Progress: Module ${x+1} of ${d.length}

`,o+=`### Remaining Modules

`;for(let i=x;i<d.length;i++){const g=d[i],N=i===x;o+=`${N?"▶":"○"} **Module ${i+1}: ${g.title}**
`,N&&(o+=`  → Currently in progress
`),g.content.some(C=>C.type==="quiz")&&(o+=`  → Module quiz (pass to continue)
`),o+=`
`}}),o+=`
${"─".repeat(60)}
`,o+=`
*Keep pushing forward — every module completed is progress earned.*
`,f(o,"agriskills-study-plan.md","text/markdown"),u.success("Study plan downloaded.")},M=()=>{if(!n||n.badges.length===0){u.error("No badges earned yet to export.");return}let s=`# AgriSkills Academy — Badge Collection

`;s+=`Student: ${l?.name??l?.email??"N/A"}
`,s+=`Total points: ${n.points}
`,s+=`Generated: ${new Date().toLocaleDateString()}

`,s+=`${"─".repeat(60)}

`,n.badges.forEach((o,t)=>{const a=o.replace(/_/g," ").replace(/\b\w/g,d=>d.toUpperCase());s+=`${t+1}. **${a}** ✓
`}),s+=`
${"─".repeat(60)}
`,s+=`
*Points earned: ${n.points} | Best streak: ${n.bestStreak} days*
`,f(s,"agriskills-badges.md","text/markdown"),u.success("Badge collection downloaded.")};return e.jsxs("main",{className:"min-h-screen bg-background text-foreground",children:[e.jsx(D,{path:"~/exports"}),e.jsxs("div",{className:"mx-auto w-full max-w-4xl px-4 py-10 sm:px-6",children:[e.jsx("p",{className:"text-xs text-term-green",children:"[ok] export center — download your learning data"}),e.jsx("h1",{className:"mt-3 text-3xl font-bold tracking-tight",children:"Export & Downloads"}),e.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Download your study notes, progress reports, certificates, and study plans as clean Markdown files."}),e.jsxs("div",{className:"mt-8 grid gap-4 sm:grid-cols-2",children:[e.jsx(h,{icon:e.jsx(R,{className:"size-5 text-term-green"}),title:"Study Notes",description:"Download all your private course notes as a single Markdown file.",action:"download notes",onClick:p}),e.jsx(h,{icon:e.jsx(E,{className:"size-5 text-term-green"}),title:"Progress Report",description:"Full progress report with quiz scores, badges earned, and course completion status.",action:"download report",onClick:v}),e.jsx(h,{icon:e.jsx(B,{className:"size-5 text-term-amber"}),title:"Study Plan",description:"Export your active study plans with remaining modules and quiz milestones.",action:"download plan",onClick:S}),e.jsx(h,{icon:e.jsx(L,{className:"size-5 text-term-amber"}),title:"Badge Collection",description:"Export your earned badges and total points as a shareable document.",action:"download badges",onClick:M})]}),e.jsxs("div",{className:"mt-8 border border-border bg-card",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-border bg-muted px-4 py-2.5",children:[e.jsx("span",{className:"text-xs font-semibold",children:"certificate gallery"}),e.jsxs("span",{className:"text-[11px] text-muted-foreground",children:[r?.filter(s=>s.status==="completed").length??0," ","certificates earned"]})]}),r===void 0&&e.jsxs("div",{className:"space-y-2 p-4",children:[e.jsx("div",{className:"h-4 animate-pulse bg-muted"}),e.jsx("div",{className:"h-4 animate-pulse bg-muted"})]}),r!=null&&r.filter(s=>s.status==="completed").length===0&&e.jsxs("div",{className:"px-4 py-10 text-center text-sm text-muted-foreground",children:[e.jsxs("p",{children:[e.jsx("span",{className:"text-term-green",children:"[ok]"})," complete a course to earn your first certificate."]}),e.jsx(j,{asChild:!0,variant:"outline",size:"sm",className:"mt-4 text-xs",children:e.jsx($,{to:"/courses",children:"browse catalog"})})]}),r!=null&&r.filter(s=>s.status==="completed").length>0&&e.jsx("div",{children:r.filter(s=>s.status==="completed").map(s=>{const o=(c??[]).find(t=>t._id===s.courseId);return e.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-accent/30",children:[e.jsxs("span",{className:"min-w-0",children:[e.jsx("span",{className:"block truncate text-sm font-medium",children:o?.title??"Course"}),e.jsxs("span",{className:"mt-0.5 block text-[11px] text-muted-foreground",children:[o?.category??""," · completed"," ",new Date(s.updatedAt).toLocaleDateString()]})]}),e.jsx(j,{asChild:!0,variant:"outline",size:"sm",className:"gap-1.5 text-xs",children:e.jsxs($,{to:`/certificate/${s.courseId}`,children:[e.jsx(w,{className:"size-3.5"}),"download"]})})]},s._id)})})]}),e.jsxs("p",{className:"mt-6 text-xs text-muted-foreground",children:[e.jsx("span",{className:"text-term-green",children:"[ok]"})," all exports are Markdown files — open them in any text editor or converter"]})]})]})}function h({icon:l,title:r,description:c,action:n,onClick:m}){return e.jsxs("div",{className:"border border-border bg-card",children:[e.jsxs("div",{className:"flex items-start gap-3 border-b border-border bg-muted px-4 py-3",children:[l,e.jsxs("div",{children:[e.jsx("h3",{className:"text-sm font-semibold",children:r}),e.jsx("p",{className:"mt-0.5 text-xs text-muted-foreground",children:c})]})]}),e.jsxs("div",{className:"flex items-center justify-between px-4 py-3",children:[e.jsx("span",{className:"text-[11px] text-muted-foreground",children:".md format · readable anywhere"}),e.jsxs(j,{variant:"outline",size:"sm",className:"gap-1.5 text-xs",onClick:m,children:[e.jsx(w,{className:"size-3.5"}),n]})]})]})}function f(l,r,c){const n=new Blob([l],{type:c}),m=URL.createObjectURL(n),p=document.createElement("a");p.href=m,p.download=r,p.click(),URL.revokeObjectURL(m)}export{W as default};
