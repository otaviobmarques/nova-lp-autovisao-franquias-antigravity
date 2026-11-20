(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. Scroll Progress & Back-to-Top
     ------------------------------------------------------------------------ */
  const progressBar = document.getElementById('scrollProgress');
  const fabTop = document.getElementById('fabTop');

  const onScroll = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    if (fabTop) fabTop.classList.toggle('is-visible', doc.scrollTop > 520);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (fabTop) {
    fabTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ------------------------------------------------------------------------
     2. Mobile Drawer
     ------------------------------------------------------------------------ */
  const drawer = document.getElementById('mobileDrawer');
  const openBtn = document.getElementById('menuToggle');
  const closeBtn = document.getElementById('drawerClose');

  const setDrawer = (open) => {
    if (!drawer) return;
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (openBtn) openBtn.addEventListener('click', () => setDrawer(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setDrawer(false));
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer || e.target.closest('a')) setDrawer(false);
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setDrawer(false);
  });

  /* ------------------------------------------------------------------------
     3. Scroll Reveal & KPI Counters
     ------------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-in'));
  }

  const counters = document.querySelectorAll('[data-counter]');
  const animateCounter = (el) => {
    const target = Number(el.dataset.counter);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(target * eased);
      el.textContent = `${prefix}${val.toLocaleString('pt-BR')}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ------------------------------------------------------------------------
     4. Interactive 12-Area Support Hub (#estrutura)
     ------------------------------------------------------------------------ */
  const AREAS = [
    {
      phase: 'Para abrir · 1 de 3',
      title: 'Documentação da Loja',
      desc: 'Departamento dedicado a toda a documentação e credenciamento da unidade junto aos Órgãos Oficiais.',
      practice: 'Você não enfrenta sozinho a burocracia de abertura e credenciamento.'
    },
    {
      phase: 'Para abrir · 2 de 3',
      title: 'Departamento Jurídico',
      desc: 'Orientação jurídica, proteção contratual e práticas seguras para a operação regular da unidade.',
      practice: 'Operação respaldada por especialistas no setor de vistorias e franquias.'
    },
    {
      phase: 'Para abrir · 3 de 3',
      title: 'Recursos Humanos (RH)',
      desc: 'Apoio na contratação de vistoriadores, integração da equipe e documentação trabalhista.',
      practice: 'Você monta o time certo desde o primeiro dia com critérios já testados.'
    },
    {
      phase: 'Para operar · 1 de 4',
      title: 'Treinamento e Reciclagem',
      desc: 'Formação inicial completa e reciclagem contínua dos vistoriadores nos padrões da rede.',
      practice: 'Não é preciso ser mecânico: a matriz forma e atualiza sua equipe técnica.'
    },
    {
      phase: 'Para operar · 2 de 4',
      title: 'Suporte Técnico',
      desc: 'Atendimento ágil para dúvidas de procedimentos, identificação veicular e legislação de trânsito.',
      practice: 'Se surgir um caso complexo no pátio, você tem retaguarda técnica imediata.'
    },
    {
      phase: 'Para operar · 3 de 4',
      title: 'Mesa de Análise',
      desc: 'Equipe centralizada de analistas que revisa cada laudo emitido pela loja antes da entrega.',
      practice: 'Camada extra de segurança que reduz drasticamente o risco de erros.'
    },
    {
      phase: 'Para operar · 4 de 4',
      title: 'Sistema Próprio de Laudos',
      desc: 'Plataforma proprietária integrada para emissão de laudos, consultas e gestão de pesquisas.',
      practice: 'Laudos padronizados, rápidos e confiáveis para particulares e lojistas.'
    },
    {
      phase: 'Para vender · 1 de 3',
      title: 'Departamento Comercial',
      desc: 'Equipe focada em prospecção de clientes corporativos, lojistas e visitas em campo.',
      practice: 'Apoio ativo para conquistar revendas, concessionárias e frotistas locais.'
    },
    {
      phase: 'Para vender · 2 de 3',
      title: 'Setor de Marketing',
      desc: 'Padronização visual da loja, campanhas, criativos oficiais e estratégias de tráfego pago.',
      practice: 'Sua unidade nasce com comunicação profissional e geração contínua de demanda.'
    },
    {
      phase: 'Para vender · 3 de 3',
      title: 'Assessoria de Imprensa',
      desc: 'Presença estratégica da marca em portais, jornais, revistas e mídia nacional e regional.',
      practice: 'Autoridade institucional que fortalece a confiança do consumidor na sua cidade.'
    },
    {
      phase: 'Para gerir · 1 de 2',
      title: 'Sucesso do Licenciado',
      desc: 'Acompanhamento de indicadores da loja, análise concorrencial e evolução do mix de serviços.',
      practice: 'Consultoria contínua para sua unidade performar acima da média do mercado.'
    },
    {
      phase: 'Para gerir · 2 de 2',
      title: 'Departamento de TI',
      desc: 'Gestão completa de canais digitais, aplicativos, webmail corporativo e infraestrutura.',
      practice: 'Tecnologia estável para você focar no crescimento da sua operação.'
    }
  ];

  const orbitalNodes = document.querySelectorAll('.orbital-node');
  const hubPills = document.querySelectorAll('.hub-pill');
  const hubPhase = document.getElementById('hubPhase');
  const hubCount = document.getElementById('hubCount');
  const hubTitle = document.getElementById('hubTitle');
  const hubDesc = document.getElementById('hubDesc');
  const hubPractice = document.getElementById('hubPractice');
  const hubIcon = document.getElementById('hubIcon');
  const hubCenterPhase = document.getElementById('hubCenterPhase');
  const hubPrev = document.getElementById('hubPrev');
  const hubNext = document.getElementById('hubNext');

  let activeIdx = 0;

  // Position orbital nodes around the center circle
  orbitalNodes.forEach((node, idx) => {
    const angle = ((idx / AREAS.length) * 2 * Math.PI) - Math.PI / 2;
    const radiusPct = 37;
    const x = 50 + radiusPct * Math.cos(angle);
    const y = 50 + radiusPct * Math.sin(angle);
    node.style.left = `${x.toFixed(2)}%`;
    node.style.top = `${y.toFixed(2)}%`;
  });

  const setActiveArea = (idx) => {
    activeIdx = (idx + AREAS.length) % AREAS.length;
    const area = AREAS[activeIdx];
    const numStr = String(activeIdx + 1).padStart(2, '0');

    if (hubPhase) hubPhase.textContent = area.phase;
    if (hubCount) hubCount.textContent = `${numStr}/12`;
    if (hubTitle) hubTitle.textContent = area.title;
    if (hubDesc) hubDesc.textContent = area.desc;
    if (hubPractice) hubPractice.textContent = area.practice;
    if (hubCenterPhase) hubCenterPhase.textContent = area.phase.split(' · ')[0];

    orbitalNodes.forEach((n, i) => {
      const isCurrent = i === activeIdx;
      n.classList.toggle('is-active', isCurrent);
      n.setAttribute('aria-selected', String(isCurrent));
      if (isCurrent && hubIcon) {
        hubIcon.innerHTML = n.innerHTML;
      }
    });

    hubPills.forEach((p, i) => {
      p.classList.toggle('is-active', i === activeIdx);
    });
  };

  orbitalNodes.forEach((node, idx) => node.addEventListener('click', () => setActiveArea(idx)));
  hubPills.forEach((pill, idx) => pill.addEventListener('click', () => setActiveArea(idx)));
  if (hubPrev) hubPrev.addEventListener('click', () => setActiveArea(activeIdx - 1));
  if (hubNext) hubNext.addEventListener('click', () => setActiveArea(activeIdx + 1));

  if (orbitalNodes.length) setActiveArea(0);

  /* ------------------------------------------------------------------------
     5. Services Filter Tabs (#servicos)
     ------------------------------------------------------------------------ */
  const stabs = document.querySelectorAll('.stab');
  const srvCards = document.querySelectorAll('.srv-card');

  stabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      stabs.forEach((t) => t.classList.toggle('is-active', t === tab));
      srvCards.forEach((card) => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ------------------------------------------------------------------------
     6. Lead Form -> WhatsApp Pre-filled Submission
     ------------------------------------------------------------------------ */
  const form = document.getElementById('leadForm');
  const feedback = document.getElementById('formFeedback');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const nome = String(data.get('nome') || '').trim();
      const whatsapp = String(data.get('whatsapp') || '').trim();
      const email = String(data.get('email') || '').trim();
      const estado = String(data.get('estado') || '').trim();
      const cidade = String(data.get('cidade') || '').trim();
      const prazo = String(data.get('prazo') || '').trim();
      const mensagem = String(data.get('mensagem') || '').trim();

      const lines = [
        'Olá! Gostaria de receber informações para fazer parte da Rede Auto Visão (Licenciamento de Marca).',
        '',
        `*Nome:* ${nome}`,
        `*WhatsApp:* ${whatsapp}`,
        `*E-mail:* ${email}`,
        `*Cidade/UF:* ${cidade} - ${estado}`,
        `*Previsão de abertura:* ${prazo}`,
        mensagem ? `*Observações:* ${mensagem}` : ''
      ].filter(Boolean);

      const url = `https://wa.me/5519983668000?text=${encodeURIComponent(lines.join('\n'))}`;
      window.open(url, '_blank', 'noopener,noreferrer');

      if (feedback) {
        feedback.classList.add('is-visible');
      }
    });
  }
})();
