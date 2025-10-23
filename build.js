const fs = require('fs');
const path = require('path');

const components = [
    'includes/head.html',
    'components/header.html',
    'components/hero.html',
    'components/tech-marquee.html',
    'components/services.html',
    'components/projects.html',
    'components/contact.html',
    'components/footer.html',
    'includes/scripts.html'
];

function buildIndex() {
    console.log('🔨 Building index.html from components...');

    let headContent = '';
    let bodyContent = '';
    let scriptsContent = '';

    // Читаем и добавляем компоненты
    components.forEach(component => {
        try {
            const componentPath = path.join(__dirname, component);
            console.log(`📖 Reading ${component} from ${componentPath}`);

            if (fs.existsSync(componentPath)) {
                let componentContent = fs.readFileSync(componentPath, 'utf8');

                // Обрабатываем разные типы компонентов
                if (component === 'includes/head.html') {
                    // Убираем DOCTYPE и HTML тег из head.html
                    componentContent = componentContent.replace(/<!doctype html>\s*<html lang="ru">/, '');
                    componentContent = componentContent.replace(/<\/head>\s*/, '');
                    headContent = componentContent;
                } else if (component === 'includes/scripts.html') {
                    // Убираем закрывающие теги из scripts.html
                    componentContent = componentContent.replace(/<\/body>\s*<\/html>/, '');
                    componentContent = componentContent.replace(/<script>/, '');
                    componentContent = componentContent.replace(/<\/script>/, '');
                    scriptsContent = componentContent;
                } else {
                    // Обычные компоненты добавляем в body
                    bodyContent += componentContent.trim() + '\n';
                }

                console.log(`✅ Added ${component}`);
            } else {
                console.log(`❌ File not found: ${componentPath}`);
            }
        } catch (error) {
            console.error(`❌ Error reading ${component}:`, error.message);
        }
    });

    // Создаем финальный HTML
    const content = `<!doctype html>
<html lang="ru">
${headContent}</head>

<body itemscope itemtype="https://schema.org/WebPage">
<canvas id="tsparticles" aria-hidden="true"></canvas>
<div class="noise" aria-hidden="true"></div>
<div class="grid-overlay" aria-hidden="true"></div>

<div id="boot-screen" role="dialog" aria-live="polite">
  <pre id="boot-text">Initializing DmitryOS v1.0...
Loading neural modules [▒▒▒▒▒▒▒▒▒▒] 0%</pre>
</div>

<div class="wrap">
  <main id="main" role="main">
${bodyContent}
  </main>
</div>

<noscript><style>#tsparticles,#boot-screen{display:none!important}</style></noscript>

<!-- External scripts -->
<script defer src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({once:true, duration:700});
  document.getElementById('year').textContent = new Date().getFullYear();

  new Typed("#typed", {
    strings: ["Дмитрий","инженер","программист","разработчик ИИ","создатель систем"],
    typeSpeed:90, backSpeed:45, backDelay:1600, loop:true, showCursor:false
  });

  tsParticles.load("tsparticles", {
    fpsLimit:60, background:{color:{value:"transparent"}},
    interactivity:{detectsOn:"canvas",events:{onHover:{enable:false},onClick:{enable:false},resize:true}},
    particles:{
      number:{value:120,density:{enable:true,value_area:900}},
      color:{value:["#00ffd0","#9eff55","#66ffb3"]},
      shape:{type:"circle"},
      opacity:{value:0.7,random:{enable:true,minimumValue:0.12},anim:{enable:true,speed:0.4,opacity_min:0.12,sync:false}},
      size:{value:{min:0.6,max:2.5},random:true},
      move:{enable:true,speed:0.8,random:true,straight:false,outModes:"out"},
      links:{enable:true,distance:140,color:"#00ffd0",opacity:0.08,width:1}
    }, detectRetina:true
  });

  const lines=["Initializing DmitryOS v1.0...","Loading neural modules [████▒▒▒▒▒▒] 40%","Calibrating perception layers...","Linking parsers & CV pipelines...","Boot complete. Welcome back, Dmitry."];
  let i=0; const el=document.getElementById("boot-text"); const screen=document.getElementById("boot-screen");
  const tick=()=>{el.textContent=lines[i]; i++; if(i<lines.length){setTimeout(tick,800)}else{setTimeout(()=>{screen.style.transition="opacity .8s ease";screen.style.opacity=0;setTimeout(()=>screen.remove(),800)},700)}};
  setTimeout(tick,500);
});
</script>

</body>
</html>`;

    // Записываем в index.html
    console.log('💾 Writing index.html...');
    fs.writeFileSync('index.html', content);
    console.log('🎉 index.html successfully built!');
    console.log(`📊 Components processed: ${components.length}`);
}

buildIndex();
