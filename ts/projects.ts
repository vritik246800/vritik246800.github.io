export interface Project {
    title: string;
    description: string;
    tech: string[];
    category: string;
}

export const projects: Project[] = [

    {
        title: "Sistema de Ocorrências Policiais",
        description: "Sistema académico usando árvore binária para gestão de ocorrências.",
        tech: ["Java", "Estruturas de Dados", "Árvore Binária"],
        category: "academic"
    },

    {
        title: "Gestão de Supermercado",
        description: "Sistema com clientes, produtos, IVA, PDFs e persistência.",
        tech: ["Java", "Swing", "PDF"],
        category: "java"
    },

    {
        title: "Transferência de Ficheiros em Rede LAN",
        description: "Aplicação para detetar dispositivos e enviar ficheiros.",
        tech: ["Java", "Sockets", "LAN"],
        category: "network"
    },

    {
        title: "Chat LAN com Áudio",
        description: "Sistema de mensagens em rede local com envio de áudio.",
        tech: ["Java", "Audio", "Sockets"],
        category: "network"
    },

    {
        title: "Browser em Java com JCEF",
        description: "Browser funcional usando Chromium Embedded Framework.",
        tech: ["Java", "JCEF", "Chromium"],
        category: "java"
    },

    {
        title: "Editor tipo Obsidian",
        description: "Editor de notas com markdown e estrutura modular.",
        tech: ["Java", "Swing", "Text Editor"],
        category: "java"
    }
];
