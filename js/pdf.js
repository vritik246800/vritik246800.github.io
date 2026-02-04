function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  let y = 20;

  /* HEADER */
  pdf.setFontSize(24);
  pdf.setFont(undefined, "bold");
  pdf.text("Vritik Valabdás", 10, y);

  y += 8;
  pdf.setFontSize(12);
  pdf.setFont(undefined, "normal");
  pdf.text("Desenvolvedor Java | Sistemas | Redes | GUI", 10, y);

  y += 6;
  pdf.setDrawColor(160, 120, 255); // lilás
  pdf.line(10, y, 200, y);

  /* === SOBRE / PERFIL === */
  y += 10;
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text("Perfil Profissional", 10, y);

  y += 7;
  pdf.setFontSize(11);
  pdf.setFont(undefined, "normal");
  pdf.text(
    "Desenvolvedor focado em soluções robustas em Java, com forte base em estruturas de dados, sistemas desktop, redes e automação. Experiência prática em projetos académicos e técnicos com foco em performance, organização e escalabilidade.",
    10,
    y,
    { maxWidth: 190 }
  );

  /* === TIMELINE === */
  y += 20;
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text("Timeline Académica & Técnica", 10, y);

  y += 8;
  pdf.setFontSize(11);

  const timeline = [
    {
      ano: "2024",
      titulo: "Sistema de Ocorrências Policiais",
      desc: "Projeto académico com árvores binárias para gestão eficiente de ocorrências."
    },
    {
      ano: "2025",
      titulo: "Gestão de Supermercado",
      desc: "Sistema desktop completo com Swing, PDFs, estatísticas e persistência."
    },
    {
      ano: "2025",
      titulo: "Transferência de Ficheiros LAN",
      desc: "Comunicação entre máquinas em rede local usando sockets Java."
    },
    {
      ano: "2026",
      titulo: "Projetos Avançados & Portfólio",
      desc: "Exploração de interfaces, automação, UI/UX e apresentação profissional."
    }
  ];

  timeline.forEach(item => {
    pdf.setTextColor(160, 120, 255);
    pdf.text("●", 10, y);
    pdf.setTextColor(0);

    pdf.setFont(undefined, "bold");
    pdf.text(`${item.ano} — ${item.titulo}`, 14, y);

    y += 6;
    pdf.setFont(undefined, "normal");
    pdf.text(item.desc, 14, y, { maxWidth: 185 });

    y += 10;
  });

  /* === PROJETOS === */
  y += 5;
  pdf.setFontSize(16);
  pdf.setFont(undefined, "bold");
  pdf.text("Projetos Técnicos", 10, y);

  y += 8;
  pdf.setFontSize(11);

  const projetos = [
    {
      titulo: "Sistema de Ocorrências Policiais",
      descricao: "Gestão estruturada de ocorrências com foco em eficiência e organização.",
      tech: "Java • Estruturas de Dados • Árvores Binárias"
    },
    {
      titulo: "Gestão de Supermercado",
      descricao: "Aplicação desktop para gestão de produtos, clientes, faturas e PDFs.",
      tech: "Java • Swing • iText PDF"
    },
    {
      titulo: "Transferência de Ficheiros LAN",
      descricao: "Envio e receção de ficheiros numa rede local.",
      tech: "Java • Sockets • Networking"
    },
    {
      titulo: "Browser Java",
      descricao: "Navegador desktop usando motor Chromium integrado.",
      tech: "Java • JCEF • UI"
    }
  ];

  projetos.forEach(p => {
    pdf.setDrawColor(200);
    pdf.line(10, y - 2, 200, y - 2);

    pdf.setFont(undefined, "bold");
    pdf.text(p.titulo, 10, y);

    y += 6;
    pdf.setFont(undefined, "normal");
    pdf.text(p.descricao, 10, y, { maxWidth: 190 });

    y += 6;
    pdf.setFontSize(9);
    pdf.setTextColor(120);
    pdf.text(p.tech, 10, y);

    pdf.setTextColor(0);
    pdf.setFontSize(11);
    y += 10;
  });

  /* FOOTER */
  pdf.setFontSize(9);
  pdf.setTextColor(120);
  pdf.text("© 2026 • Portfólio Técnico • Vritik Valabdás", 10, 285);

  pdf.save("portfolio-vritik-valabdas.pdf");
}
