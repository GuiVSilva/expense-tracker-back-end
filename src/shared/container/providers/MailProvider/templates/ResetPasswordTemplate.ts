interface IResetPasswordTemplateProps {
  userName: string
  resetCode: string
  email: string
  expiresIn?: string
  year?: number
}

export class ResetPasswordTemplate {
  static generate({
    userName,
    resetCode,
    email,
    expiresIn = '20 minutos',
    year = new Date().getFullYear()
  }: IResetPasswordTemplateProps): string {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperação de Senha - ExpenseTracker</title>
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
    
    /* Header com gradiente escuro */
    .header {
      background: linear-gradient(135deg, #1a1e28 0%, #0f1117 100%);
      padding: 48px 40px 40px;
      text-align: center;
      border-bottom: 1px solid #2a2e3a;
      position: relative;
      overflow: hidden;
    }
    
    /* Elementos decorativos */
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
    
    /* Card de segurança */
    .security-card {
      background: #1a1e28;  /* secondary */
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 32px;
      border: 1px solid #2a2e3a;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }
    
    /* Ícone de segurança */
    .security-icon {
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
    
    /* Container do código */
    .code-container {
      background: #0f1117;
      border: 2px solid rgba(74, 222, 128, 0.2);
      border-radius: 16px;
      padding: 32px;
      margin: 32px 0;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .code-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(74, 222, 128, 0.03) 0%, transparent 70%);
      animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
    
    /* Código */
    .code {
      font-size: 52px;
      font-weight: 700;
      letter-spacing: 16px;
      color: #4ade80;  /* primary */
      font-family: 'Courier New', monospace;
      text-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
      position: relative;
      z-index: 1;
    }
    
    /* Email highlight */
    .email-highlight {
      background: #0f1117;
      border: 1px solid #2a2e3a;
      border-radius: 12px;
      padding: 16px;
      margin: 24px 0;
    }
    
    /* Botão */
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
    
    /* Instruções */
    .instructions {
      background: #1a1e28;
      border-radius: 16px;
      padding: 24px;
      margin: 32px 0;
      border: 1px solid #2a2e3a;
    }
    
    .instruction-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid #2a2e3a;
    }
    
    .instruction-item:last-child {
      border-bottom: none;
    }
    
    .instruction-number {
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
    
    /* Aviso de segurança */
    .security-warning {
      background: rgba(251, 146, 60, 0.05);  /* accent com opacidade */
      border: 1px solid rgba(251, 146, 60, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin-top: 32px;
    }
    
    /* Divider */
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #2a2e3a, transparent);
      margin: 32px 0;
    }
    
    /* Footer */
    .footer {
      background: #0f1117;
      padding: 40px;
      text-align: center;
      border-top: 1px solid #2a2e3a;
    }
    
    /* Timer */
    .timer {
      display: inline-block;
      background: rgba(74, 222, 128, 0.1);
      color: #4ade80;
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 14px;
      font-weight: 500;
      border: 1px solid rgba(74, 222, 128, 0.2);
      margin-top: 16px;
    }
    
    /* Textos */
    .text-muted {
      color: #94a3b8;  /* muted-foreground */
    }
    
    .text-foreground {
      color: #fafafa;
    }
    
    .text-primary {
      color: #4ade80;
    }
    
    /* Responsivo */
    @media only screen and (max-width: 600px) {
      body { padding: 20px 12px; }
      .header { padding: 40px 24px; }
      .content { padding: 32px 24px; }
      .code { font-size: 36px; letter-spacing: 10px; }
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
        <span class="highlight">ExpenseTracker</span>
      </h1>
      <p style="color: #94a3b8; font-size: 16px; margin-top: 12px; position: relative; z-index: 1;">
        🔐 Recuperação de Senha
      </p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Security Card -->
      <div class="security-card">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
          <div class="security-icon">
            <span style="font-size: 32px;">🔒</span>
          </div>
          <div>
            <h2 style="color: #fafafa; font-size: 24px; margin: 0;">
              Olá, <span class="highlight">${userName}</span>!
            </h2>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">
              Segurança em primeiro lugar
            </p>
          </div>
        </div>
        
        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0;">
          Recebemos uma solicitação de recuperação de senha para sua conta no 
          <strong class="highlight">ExpenseTracker</strong>.
        </p>
      </div>
      
      <!-- Email Highlight -->
      <div class="email-highlight">
        <p style="color: #94a3b8; margin: 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
          E-mail solicitado
        </p>
        <p style="color: #fafafa; font-size: 18px; font-weight: 500; margin: 8px 0 0 0;">
          ${email}
        </p>
      </div>
      
      <!-- Code Container -->
      <div class="code-container">
        <p style="color: #94a3b8; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 3px; font-size: 13px; font-weight: 500;">
          Código de verificação
        </p>
        <div class="code">
          ${resetCode}
        </div>
        <div class="timer">
          ⏱️ Válido por ${expiresIn}
        </div>
      </div>
      
      <!-- Instructions -->
      <div class="instructions">
        <h3 style="color: #fafafa; font-size: 18px; margin-top: 0; margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
          <span>📋</span> Como proceder:
        </h3>
        
        <div class="instruction-item">
          <span class="instruction-number">1</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Copie o código</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Use o código de 6 dígitos acima</p>
          </div>
        </div>
        
        <div class="instruction-item">
          <span class="instruction-number">2</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Volte ao app</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Acesse a página de recuperação</p>
          </div>
        </div>
        
        <div class="instruction-item">
          <span class="instruction-number">3</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Insira o código</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">E crie sua nova senha segura</p>
          </div>
        </div>
        
        <div class="instruction-item">
          <span class="instruction-number">4</span>
          <div style="flex: 1;">
            <p style="color: #fafafa; margin: 0; font-weight: 500;">Pronto!</p>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Sua senha foi redefinida</p>
          </div>
        </div>
      </div>
      
      
      <div class="divider"></div>
      
      <!-- Security Warning -->
      <div class="security-warning">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="font-size: 24px;">🔐</span>
          <div>
            <p style="color: #fb923c; font-size: 15px; font-weight: 600; margin: 0 0 4px 0;">
              Não foi você?
            </p>
            <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5;">
              Se você não solicitou esta recuperação, ignore este e-mail. 
              Nenhuma alteração será feita na sua conta.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Dica de segurança -->
      <div style="background: rgba(74, 222, 128, 0.05); border-radius: 12px; padding: 16px; margin-top: 24px; border: 1px solid rgba(74, 222, 128, 0.1);">
        <div style="display: flex; gap: 12px;">
          <span style="font-size: 20px;">💡</span>
          <div>
            <p style="color: #fafafa; margin: 0 0 4px 0; font-weight: 500;">
              Dica de segurança
            </p>
            <p style="color: #94a3b8; margin: 0; font-size: 13px;">
              Nunca compartilhe este código com ninguém. Nossa equipe nunca solicita seu código de verificação.
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
