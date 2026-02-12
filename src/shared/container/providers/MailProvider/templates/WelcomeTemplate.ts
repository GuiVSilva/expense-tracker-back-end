interface IWelcomeTemplateProps {
  userName: string
  email: string
  year?: number
}

export class WelcomeTemplate {
  static generate({
    userName,
    email,
    year = new Date().getFullYear()
  }: IWelcomeTemplateProps): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo ao ExpenseTracker! 🎉</title>
  <style>
    /* Reset e estilos base - baseados no seu tema */
    body {
      margin: 0;
      padding: 40px 20px;
      background-color: #0a0c0f;  /* background */
      font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #fafafa;  /* foreground */
      line-height: 1.6;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #12141c;  /* card */
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      border: 1px solid #2a2e3a;  /* border */
      overflow: hidden;
    }
    
    /* Header com gradiente usando suas cores */
    .header {
      background: linear-gradient(135deg, #1a1e28 0%, #0f1117 100%);
      padding: 48px 40px 40px;
      text-align: center;
      border-bottom: 1px solid #2a2e3a;
      position: relative;
      overflow: hidden;
    }
    
    /* Elementos decorativos - bolhas com suas cores */
    .header::before {
      content: '';
      position: absolute;
      top: -20px;
      right: -20px;
      width: 150px;
      height: 150px;
      background: rgba(74, 222, 128, 0.05);  /* primary com opacidade */
      border-radius: 50%;
      filter: blur(60px);
    }
    
    .header::after {
      content: '';
      position: absolute;
      bottom: -30px;
      left: -30px;
      width: 200px;
      height: 200px;
      background: rgba(251, 146, 60, 0.05);  /* accent com opacidade */
      border-radius: 50%;
      filter: blur(70px);
    }
    
    /* Logo container */
    .logo-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: rgba(74, 222, 128, 0.1);
      padding: 16px;
      border-radius: 20px;
      margin-bottom: 24px;
      border: 1px solid rgba(74, 222, 128, 0.2);
      backdrop-filter: blur(10px);
      position: relative;
      z-index: 1;
    }
    
    /* Títulos */
    h1 {
      color: #fafafa;
      margin: 0;
      font-size: 32px;
      font-weight: 600;
      letter-spacing: -0.02em;
      position: relative;
      z-index: 1;
    }
    
    .highlight {
      color: #4ade80;  /* primary */
      font-weight: 700;
    }
    
    .accent-text {
      color: #fb923c;  /* accent */
    }
    
    /* Conteúdo principal */
    .content {
      padding: 48px 40px;
      background: #12141c;
    }
    
    /* Card de boas-vindas */
    .welcome-card {
      background: #1a1e28;  /* secondary */
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 32px;
      border: 1px solid #2a2e3a;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    
    /* Avatar/ícone de boas-vindas */
    .welcome-icon {
      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
      width: 64px;
      height: 64px;
      border-radius: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      box-shadow: 0 10px 20px -5px rgba(74, 222, 128, 0.3);
    }
    
    /* Feature cards */
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 32px 0;
    }
    
    .feature-card {
      background: #0f1117;
      border: 1px solid #2a2e3a;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.3s ease;
    }
    
    .feature-card:hover {
      border-color: #4ade80;
      transform: translateY(-2px);
    }
    
    .feature-icon {
      font-size: 28px;
      margin-bottom: 12px;
      display: block;
    }
    
    .feature-title {
      color: #fafafa;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
    }
    
    .feature-desc {
      color: #94a3b8;  /* muted-foreground */
      font-size: 13px;
      margin: 0;
    }
    
    /* Botão CTA */
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
      color: #0a0c0f !important;
      font-weight: 600;
      text-decoration: none;
      padding: 16px 32px;
      border-radius: 12px;
      font-size: 16px;
      box-shadow: 0 10px 20px -5px rgba(74, 222, 128, 0.3);
      transition: all 0.3s ease;
      border: none;
      letter-spacing: -0.01em;
    }
    
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 30px -5px rgba(74, 222, 128, 0.4);
    }
    
    /* Quick actions */
    .quick-actions {
      background: #1a1e28;
      border-radius: 16px;
      padding: 24px;
      margin: 32px 0;
      border: 1px solid #2a2e3a;
    }
    
    .action-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid #2a2e3a;
    }
    
    .action-item:last-child {
      border-bottom: none;
    }
    
    .action-number {
      background: rgba(74, 222, 128, 0.1);
      color: #4ade80;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      border: 1px solid rgba(74, 222, 128, 0.2);
    }
    
    /* Divider */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #2a2e3a, transparent);
      margin: 32px 0;
    }
    
    /* Stats section */
    .stats-section {
      background: #0f1117;
      border-radius: 20px;
      padding: 24px;
      margin: 32px 0;
      border: 1px solid #2a2e3a;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      color: #4ade80;
      font-size: 28px;
      font-weight: 700;
      margin: 0;
    }
    
    .stat-label {
      color: #94a3b8;
      font-size: 12px;
      margin: 4px 0 0 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    /* Footer */
    .footer {
      background: #0f1117;
      padding: 40px;
      text-align: center;
      border-top: 1px solid #2a2e3a;
    }
    
    .social-links {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin-bottom: 24px;
    }
    
    .social-link {
      color: #94a3b8;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;
    }
    
    .social-link:hover {
      color: #4ade80;
    }
    
    /* Tipografia */
    .text-gradient {
      background: linear-gradient(135deg, #4ade80 0%, #fb923c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    /* Responsivo */
    @media only screen and (max-width: 600px) {
      body { padding: 20px 12px; }
      .header { padding: 40px 24px; }
      .content { padding: 32px 24px; }
      .feature-grid { grid-template-columns: 1fr; }
      .footer { padding: 32px 24px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo-wrapper">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="#4ade80"/>
        </svg>
      </div>
      <h1>
        Bem-vindo ao <span class="highlight">ExpenseTracker</span>
      </h1>
      <p style="color: #94a3b8; font-size: 16px; margin-top: 12px; position: relative; z-index: 1;">
        Sua jornada financeira começa aqui 🚀
      </p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Welcome Card -->
      <div class="welcome-card">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div class="welcome-icon">
            <span style="font-size: 32px;">🎉</span>
          </div>
          <div>
            <h2 style="color: #fafafa; font-size: 24px; margin: 0;">
              Olá, <span class="highlight">${userName}</span>!
            </h2>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">
              ${email}
            </p>
          </div>
        </div>
        
        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0;">
          Estamos muito felizes em ter você conosco! Sua conta foi criada com sucesso e 
          agora você pode começar a ter <span class="accent-text">controle total</span> sobre suas finanças.
        </p>
      </div>
      
      <!-- Features Grid -->
      <h3 style="color: #fafafa; font-size: 18px; margin-bottom: 16px;">
        ✨ O que você pode fazer:
      </h3>
      
      <div class="feature-grid">
        <div class="feature-card">
          <span class="feature-icon">📊</span>
          <h4 class="feature-title">Dashboard</h4>
          <p class="feature-desc">Visão completa das suas finanças</p>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">💰</span>
          <h4 class="feature-title">Receitas</h4>
          <p class="feature-desc">Controle seus ganhos</p>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">💳</span>
          <h4 class="feature-title">Despesas</h4>
          <p class="feature-desc">Categorize seus gastos</p>
        </div>
        
        <div class="feature-card">
          <span class="feature-icon">🎯</span>
          <h4 class="feature-title">Metas</h4>
          <p class="feature-desc">Defina objetivos financeiros</p>
        </div>
      </div>
      
      <!-- Quick Start Guide -->
      <div class="quick-actions">
        <h3 style="color: #fafafa; font-size: 18px; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
          <span>⚡</span> Comece em 3 passos:
        </h3>
        
        <div class="action-item">
          <span class="action-number">1</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Complete seu perfil</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Adicione suas informações</p>
          </div>
        </div>
        
        <div class="action-item">
          <span class="action-number">2</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Conecte suas contas</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Adicione receitas e despesas</p>
          </div>
        </div>
        
        <div class="action-item">
          <span class="action-number">3</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Acompanhe seu progresso</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Veja gráficos e relatórios</p>
          </div>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <!-- Tips -->
      <div style="background: rgba(74, 222, 128, 0.05); border-radius: 12px; padding: 20px; border: 1px solid rgba(74, 222, 128, 0.1);">
        <div style="display: flex; gap: 12px;">
          <span style="font-size: 24px;">💡</span>
          <div>
            <p style="color: #fafafa; margin: 0 0 4px 0; font-weight: 600;">
              Dica do dia
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 14px;">
              Comece registrando suas despesas fixas do mês para ter uma visão clara dos seus gastos essenciais.
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div style="margin-bottom: 24px;">
        <span style="color: #4ade80; font-size: 20px; font-weight: 700;">ExpenseTracker</span>
        <p style="color: #94a3b8; font-size: 13px; margin-top: 8px;">
          Controle financeiro simples e eficiente
        </p>
      </div>
      
      
      <div style="border-top: 1px solid #2a2e3a; padding-top: 24px;">
        <p style="color: #64748b; font-size: 12px; margin: 0 0 8px 0;">
          © ${year} ExpenseTracker. Todos os direitos reservados.
        </p>
        <p style="color: #475569; font-size: 11px; margin: 0;">
                          Este é um e-mail automático. Por favor, não responda a esta mensagem.
        </p>
      </div>
    </div>
  </div>
</body>
</html>`
  }
}
