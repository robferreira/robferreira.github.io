var translations = {
    pt: {
        meta: {
            title: 'Robinson Ferreira'
        },
        nav: {
            home: 'Início',
            about: 'Sobre',
            experience: 'Experiência',
            blog: 'Blog',
            contact: 'Contato'
        },
        hero: {
            role: 'Gerente de Advanced Analytics e IA',
            bio: 'Olá, tenho <span id="my-age"></span> anos e atuo na área de TI desde 2012. Hoje lidero Advanced Analytics e IA na Cielo, com foco em experimentação com IA generativa, desenvolvimento de componentes e arquetipos reutilizáveis, arquiteturas de referência, segurança e performance. Minha trajetória em dados e Big Data, desde 2016, sustenta essa atuação em grandes empresas do setor financeiro.'
        },
        typewriter: ['IA Generativa', 'Advanced Analytics'],
        about: {
            subheading: 'Bem-vindo',
            title: 'Sobre mim',
            p1: 'Sou formado em Sistemas de Informação desde dezembro de 2015. Ao longo da minha carreira, sempre trabalhei próximo aos usuários, entendendo suas necessidades, solucionando problemas e transformando demandas em soluções práticas.',
            p2: 'Gosto de acompanhar as novidades do universo da tecnologia e estou sempre buscando novos conhecimentos para aplicá-los de forma efetiva nas áreas em que atuo. Tenho um perfil curioso e resolutivo: quando não sei algo, procuro aprender, compreender e encontrar a melhor solução. Sou especialmente apaixonado por desenvolvimento de software, dados e inteligência artificial.',
            p3: 'Fora do ambiente profissional, sou pai do Enrico e apaixonado por música. Toco instrumentos de corda desde os 12 anos, principalmente violão, guitarra e ukulele. Também me interesso por investimentos, tema que estudo e pratico desde 2016, sempre com "skin in the game".',
            p4: 'Os esportes também fazem parte da minha vida. Pratiquei patins street durante alguns anos, sempre gostei de jogar futebol e frequentar a academia e, atualmente, pratico muay thai.',
            pillar1Title: 'Advanced Analytics & IA',
            pillar1Text: 'Lidero a área de Advanced Analytics e IA, conduzindo experimentação, desenvolvimento e a adoção de soluções de inteligência artificial com impacto institucional.',
            pillar2Title: 'IA Generativa & Prototipagem',
            pillar2Text: 'Desenvolvo PoCs, arquetipos e componentes reutilizáveis que servem de base para toda a organização, acelerando a inovação com IA generativa.',
            pillar3Title: 'Arquitetura, Segurança & Performance',
            pillar3Text: 'Defino arquiteturas de referência e melhores práticas, priorizando segurança, performance e escalabilidade nas soluções de analytics e IA.'
        },
        experience: {
            subheading: 'Conquistas',
            title: 'Experiência profissional',
            subtitle: 'Cada empresa teve um papel importante no meu desenvolvimento profissional e pessoal. Sou grato por todas as experiências, aprendizados e pessoas que fizeram parte dessa trajetória.',
            totalExperience: '{years} anos {months} meses de experiência',
            summary: 'Já trabalhei em {companies} e tenho aproximadamente {duration} de experiência',
            companySingular: '1 empresa',
            companyPlural: '{count} empresas',
            active: 'Ativa',
            present: 'o momento',
            close: 'Fechar'
        },
        blog: {
            subheading: 'Blog',
            title: 'Artigos',
            subtitle: 'Compartilho aprendizados, experiências e reflexões sobre tecnologia, desenvolvimento de software, dados e inteligência artificial. Confira alguns dos conteúdos que publico no Medium.',
            section: {
                readArticle: 'Ler artigo',
                viewAll: 'Ver todos os artigos no Medium',
                emptyText: 'Os artigos podem ser acessados diretamente no Medium.',
                emptyCta: 'Ver artigos no Medium',
                minRead: '{min} min de leitura'
            }
        },
        contact: {
            subheading: 'Contato',
            title: 'Fale comigo',
            subtitle: 'Além das redes sociais, você pode entrar em contato por este formulário.',
            form: {
                nameLabel: 'Nome',
                namePlaceholder: 'Como podemos chamar você?',
                emailLabel: 'E-mail',
                emailPlaceholder: 'seuemail@exemplo.com',
                messageLabel: 'Mensagem',
                messagePlaceholder: 'Escreva sua mensagem...',
                submit: 'Enviar mensagem',
                sending: 'Enviando…',
                success: 'Mensagem enviada com sucesso! Em breve entrarei em contato.',
                error: 'Não foi possível enviar sua mensagem. Tente novamente em instantes.',
                errorConfig: 'O formulário ainda não está configurado. Configure o endpoint em js/config/contact.config.js.',
                privacy: 'Seus dados serão utilizados somente para responder ao seu contato.',
                charCount: '{current} caracteres (mín. {min})',
                errors: {
                    emailRequired: 'Informe seu e-mail.',
                    emailInvalid: 'Informe um e-mail válido.',
                    messageRequired: 'Escreva sua mensagem.',
                    messageTooShort: 'A mensagem deve ter pelo menos {min} caracteres.'
                }
            }
        },
        footer: {
            rights: 'Todos os direitos reservados'
        },
        timeline: {
            cielo: {
                company: 'CIELO S.A.',
                role: 'GERENTE DE ADVANCED ANALYTICS E IA',
                description: 'Liderança da área de Advanced Analytics e IA, com foco em experimentação em IA generativa, desenvolvimento de componentes e arquetipos reutilizáveis, e definição de arquiteturas, boas práticas, segurança e performance.'
            },
            safra: {
                company: 'BANCO SAFRA',
                role: 'ESPECIALISTA DE SISTEMAS II',
                description: 'Atuei na área core de Big Data, onde desenvolvi componentes e ferramentas que facilitavam e democratizavam o uso dos dados. Participei da implantação da plataforma de dados Cloudera, totalmente na cloud (AWS), e liderei tecnicamente um time que construiu uma plataforma DaaS para automatizar processos que o Cloudera não atendia nativamente.'
            },
            everis: {
                company: 'EVERIS BRASIL',
                role: 'DESENVOLVEDOR',
                engineering: 'Engenharia de Dados:',
                engineeringText: 'Desenvolvimento da plataforma de descentralização de ingestões e manipulação de dados no Santander, desenhando a arquitetura e fluxos para Squads integrarem dados ao Big Data de forma automatizada.',
                architecture: 'Arquitetura:',
                architectureText: 'Desenvolvimento na plataforma de Big Data do Santander, criando produtos arquiteturais para ingestão, consumo e manipulação de dados, automação de tarefas e configuração de collectors.'
            },
            ibm: {
                company: 'IBM BRASIL',
                role: 'ESPECIALISTA EM SISTEMAS',
                description: 'Desenvolvimento na plataforma de Big Data na Produban Brasil (Grupo Santander), com collectors, ferramentas de automação e configuração para facilitar o uso da plataforma.'
            },
            tecnoplast: {
                company: 'TECNOPLAST INDÚSTRIA E COMÉRCIO LTDA',
                role: 'ANALISTA DE SUPORTE TÉCNICO',
                description: 'Suporte ao usuário, manutenção de servidores, bancos Oracle e SQL Server, rede e computadores, suporte ao ERP (LOGIX - TOTVS), criação e manutenção do site e sistemas de Intranet.'
            }
        }
    },
    en: {
        meta: {
            title: 'Robinson Ferreira'
        },
        nav: {
            home: 'Home',
            about: 'About',
            experience: 'Experience',
            blog: 'Blog',
            contact: 'Contact'
        },
        hero: {
            role: 'Advanced Analytics & AI Manager',
            bio: 'Hello, I\'m <span id="my-age"></span> years old and have worked in IT since 2012. Today I lead Advanced Analytics and AI at Cielo, focusing on generative AI experimentation, reusable components and archetypes, reference architectures, security and performance. My data and Big Data journey since 2016 supports this work across large financial institutions.'
        },
        typewriter: ['Generative AI', 'Advanced Analytics'],
        about: {
            subheading: 'Welcome',
            title: 'About Me',
            p1: 'I hold a degree in Information Systems, earned in December 2015. Throughout my career, I have always worked closely with users—understanding their needs, solving problems, and turning requirements into practical solutions.',
            p2: 'I enjoy keeping up with new developments in the technology world and am always seeking new knowledge to apply effectively in the areas where I work. I have a curious and resourceful mindset: when I don\'t know something, I look to learn, understand, and find the best solution. I am especially passionate about software development, data, and artificial intelligence.',
            p3: 'Outside of work, I am Enrico\'s father and passionate about music. I have played string instruments since I was 12, mainly acoustic guitar, electric guitar, and ukulele. I am also interested in investments—a topic I have studied and practiced since 2016, always with "skin in the game."',
            p4: 'Sports are also part of my life. I practiced street inline skating for several years, have always enjoyed playing soccer and going to the gym, and currently practice Muay Thai.',
            pillar1Title: 'Advanced Analytics & AI Leadership',
            pillar1Text: 'I lead the Advanced Analytics and AI area, driving experimentation, development and adoption of artificial intelligence solutions with institutional impact.',
            pillar2Title: 'Generative AI & Prototyping',
            pillar2Text: 'I build PoCs, archetypes and reusable components that serve as a foundation for the entire organization, accelerating innovation with generative AI.',
            pillar3Title: 'Architecture, Security & Performance',
            pillar3Text: 'I define reference architectures and best practices, prioritizing security, performance and scalability in analytics and AI solutions.'
        },
        experience: {
            subheading: 'Accomplishments',
            title: 'Professional experience',
            subtitle: 'Each company played an important role in my professional and personal development. I am grateful for all the experiences, learnings, and people who have been part of this journey.',
            totalExperience: '{years} years {months} months of experience',
            summary: 'I have worked at {companies} and have approximately {duration} of experience',
            companySingular: '1 company',
            companyPlural: '{count} companies',
            active: 'Active',
            present: 'Present',
            close: 'Close'
        },
        blog: {
            subheading: 'Blog',
            title: 'Articles',
            subtitle: 'I share learnings, experiences, and reflections on technology, software development, data, and artificial intelligence. Browse some of the articles I publish on Medium.',
            section: {
                readArticle: 'Read article',
                viewAll: 'View all articles on Medium',
                emptyText: 'Articles can be accessed directly on Medium.',
                emptyCta: 'View articles on Medium',
                minRead: '{min} min read'
            }
        },
        contact: {
            subheading: 'Contact',
            title: 'Contact Me',
            subtitle: 'In addition to social media, you can reach me through this form.',
            form: {
                nameLabel: 'Name',
                namePlaceholder: 'What should we call you?',
                emailLabel: 'Email',
                emailPlaceholder: 'you@example.com',
                messageLabel: 'Message',
                messagePlaceholder: 'Write your message...',
                submit: 'Send message',
                sending: 'Sending…',
                success: 'Message sent successfully! I will get back to you soon.',
                error: 'Could not send your message. Please try again shortly.',
                errorConfig: 'The form is not configured yet. Set the endpoint in js/config/contact.config.js.',
                privacy: 'Your data will only be used to respond to your contact.',
                charCount: '{current} characters (min. {min})',
                errors: {
                    emailRequired: 'Please enter your email.',
                    emailInvalid: 'Please enter a valid email.',
                    messageRequired: 'Please write your message.',
                    messageTooShort: 'Message must be at least {min} characters.'
                }
            }
        },
        footer: {
            rights: 'All rights reserved'
        },
        timeline: {
            cielo: {
                company: 'CIELO S.A.',
                role: 'ADVANCED ANALYTICS & AI MANAGER',
                description: 'Leading the Advanced Analytics and AI area, focusing on generative AI experimentation, reusable components and archetypes, and defining architectures, best practices, security and performance.'
            },
            safra: {
                company: 'BANCO SAFRA',
                role: 'SYSTEMS SPECIALIST II',
                description: 'Worked in the core Big Data area, developing components and tools that facilitated and democratized data usage. Contributed to the implementation of the Cloudera data platform fully on AWS cloud, and technically led a team that built a DaaS platform to automate processes not natively covered by Cloudera.'
            },
            everis: {
                company: 'EVERIS BRASIL',
                role: 'DEVELOPER',
                engineering: 'Data Engineering:',
                engineeringText: 'Development of the decentralization platform for ingestions and data handling at Santander, designing architecture and data flows for Squads to integrate data into Big Data in an automated way.',
                architecture: 'Architecture:',
                architectureText: 'Development on Santander\'s Big Data platform, creating architectural products for ingestion, consumption and data handling, task automation tools and collector configurations.'
            },
            ibm: {
                company: 'IBM BRASIL',
                role: 'SYSTEMS SPECIALIST',
                description: 'Development on the Big Data platform at Produban Brasil (Santander Group), building collectors, automation tools and configurations to facilitate platform usability.'
            },
            tecnoplast: {
                company: 'TECNOPLAST INDÚSTRIA E COMÉRCIO LTDA',
                role: 'TECHNICAL SUPPORT ANALYST',
                description: 'User support, server maintenance, Oracle and SQL Server databases, network and computer maintenance, ERP support (LOGIX - TOTVS), website and Intranet systems creation and maintenance.'
            }
        }
    }
};
