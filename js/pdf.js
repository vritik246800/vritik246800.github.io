function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  
  // Título
  pdf.setFontSize(22);
  pdf.text("Vritik Valabdás", 10, 20);
  
  pdf.setFontSize(12);
  pdf.text("Desenvolvedor Java | Sistemas | Redes | GUI", 10, 30);
  
  // Linha separadora
  pdf.line(10, 35, 200, 35);
  
  // Projetos
  pdf.setFontSize(16);
  pdf.text("Projetos", 10, 45);
  
  pdf.setFontSize(11);
  let y = 55;
  
  const projetos = [
    {
      titulo: "Sistema de Ocorrências Policiais",
      descricao: "Gestão de ocorrências usando árvores binárias",
      tech: "Java • Estruturas de Dados • Árvores Binárias"
    },
    {
      titulo: "Gestão de Supermercado",
      descricao: "Sistema desktop para inventário e PDFs",
      tech: "Java • Swing • iText PDF"
    },
    {
      titulo: "Transferência de Ficheiros LAN",
      descricao: "Envio de ficheiros na rede local",
      tech: "Java • Sockets • LAN"
    },
    {
      titulo: "Browser Java",
      descricao: "Navegador Java com Chromium",
      tech: "Java • JCEF • Chromium"
    }
  ];
  
  projetos.forEach(proj => {
    pdf.setFont(undefined, 'bold');
    pdf.text(proj.titulo, 10, y);
    y += 6;
    
    pdf.setFont(undefined, 'normal');
    pdf.text(proj.descricao, 10, y);
    y += 5;
    
    pdf.setFontSize(9);
    pdf.setTextColor(100);
    pdf.text(proj.tech, 10, y);
    pdf.setTextColor(0);
    pdf.setFontSize(11);
    y += 10;
  });
  
  // Rodapé
  pdf.setFontSize(9);
  pdf.text("© 2026 - Portfólio Técnico", 10, 280);
  
  pdf.save("portfolio-vritik-valabdas.pdf");
}