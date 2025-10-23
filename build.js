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

    let content = '';

    // Добавляем DOCTYPE и HTML
    content += '<!doctype html>\n<html lang="ru">\n';

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
                } else if (component === 'includes/scripts.html') {
                    // Убираем закрывающие теги из scripts.html
                    componentContent = componentContent.replace(/<\/body>\s*<\/html>/, '');
                    componentContent = componentContent.replace(/<script>/, '');
                    componentContent = componentContent.replace(/<\/script>/, '');
                } else {
                    // Обычные компоненты
                    componentContent = componentContent.trim();
                }

                content += componentContent + '\n';

                console.log(`✅ Added ${component}`);
            } else {
                console.log(`❌ File not found: ${componentPath}`);
            }
        } catch (error) {
            console.error(`❌ Error reading ${component}:`, error.message);
        }
    });

    // Добавляем закрывающие теги
    content += '</head>\n\n';
    content += '<body itemscope itemtype="https://schema.org/WebPage">\n';
    content += '<canvas id="tsparticles" aria-hidden="true"></canvas>\n';
    content += '<div class="noise" aria-hidden="true"></div>\n';
    content += '<div class="grid-overlay" aria-hidden="true"></div>\n\n';
    content += '<div id="boot-screen" role="dialog" aria-live="polite">\n';
    content += '  <pre id="boot-text">Initializing DmitryOS v1.0...\nLoading neural modules [▒▒▒▒▒▒▒▒▒▒] 0%</pre>\n';
    content += '</div>\n\n';
    content += '<div class="wrap">\n';
    content += '  <main id="main" role="main">\n';

    // Добавляем содержимое между header и footer (пока заглушка)
    content += '\n    <!-- Content sections will be inserted here -->\n\n';

    content += '  </main>\n\n';
    content += '  <footer role="contentinfo">© <span id="year"></span> Dmitry Kollen</footer>\n';
    content += '</div>\n\n';
    content += '<noscript><style>#tsparticles,#boot-screen{display:none!important}</style></noscript>\n\n';
    content += '<!-- External scripts -->\n';
    content += '<script defer src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>\n';
    content += '<script defer src="https://cdn.jsdelivr.net/npm/tsparticles@2.12.0/tsparticles.bundle.min.js"></script>\n';
    content += '<script defer src="https://cdn.jsdelivr.net/npm/typed.js@2.1.0/dist/typed.umd.js"></script>\n\n';
    content += '<script>\n';
    content += 'document.addEventListener(\'DOMContentLoaded\', function() {\n';
    content += '  AOS.init({once:true, duration:700});\n';
    content += '  document.getElementById(\'year\').textContent = new Date().getFullYear();\n\n';
    content += '  new Typed("#typed", {\n';
    content += '    strings: ["Дмитрий","инженер","программист","разработчик ИИ","создатель систем"],\n';
    content += '    typeSpeed:90, backSpeed:45, backDelay:1600, loop:true, showCursor:false\n';
    content += '  });\n\n';
    content += '  tsParticles.load("tsparticles", {\n';
    content += '    fpsLimit:60, background:{color:{value:"transparent"}},\n';
    content += '    interactivity:{detectsOn:"canvas",events:{onHover:{enable:false},onClick:{enable:false},resize:true}},\n';
    content += '    particles:{\n';
    content += '      number:{value:120,density:{enable:true,value_area:900}},\n';
    content += '      color:{value:["#00ffd0","#9eff55","#66ffb3"]},\n';
    content += '      shape:{type:"circle"},\n';
    content += '      opacity:{value:0.7,random:{enable:true,minimumValue:0.12},anim:{enable:true,speed:0.4,opacity_min:0.12,sync:false}},\n';
    content += '      size:{value:{min:0.6,max:2.5},random:true},\n';
    content += '      move:{enable:true,speed:0.8,random:true,straight:false,outModes:"out"},\n';
    content += '      links:{enable:true,distance:140,color:"#00ffd0",opacity:0.08,width:1}\n';
    content += '    }, detectRetina:true\n';
    content += '  });\n\n';
    content += '  const lines=["Initializing DmitryOS v1.0...","Loading neural modules [████▒▒▒▒▒▒] 40%","Calibrating perception layers...","Linking parsers & CV pipelines...","Boot complete. Welcome back, Dmitry."];\n';
    content += '  let i=0; const el=document.getElementById("boot-text"); const screen=document.getElementById("boot-screen");\n';
    content += '  const tick=()=>{el.textContent=lines[i]; i++; if(i<lines.length){setTimeout(tick,800)}else{setTimeout(()=>{screen.style.transition="opacity .8s ease";screen.style.opacity=0;setTimeout(()=>screen.remove(),800)},700)}};\n';
    content += '  setTimeout(tick,500);\n';
    content += '});\n';
    content += '</script>\n';
    content += '</body>\n';
    content += '</html>';

    // Записываем в index.html
    console.log('💾 Writing index.html...');
    fs.writeFileSync('index.html', content);
    console.log('🎉 index.html successfully built!');
    console.log(`📊 Components processed: ${components.length}`);
}

buildIndex();
