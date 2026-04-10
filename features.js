
(function(){
var css = document.createElement('style');
css.textContent = ".plan-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 10px;border-radius:50px;font-size:9px;font-weight:800}.plan-badge-free{background:rgba(85,97,119,0.2);color:#556177;border:1px solid rgba(85,97,119,0.3)}.plan-badge-trial{background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid rgba(59,130,246,0.3)}.plan-badge-pro{background:rgba(245,197,24,0.15);color:#f5c518;border:1px solid rgba(245,197,24,0.3)}.plan-badge-premium{background:linear-gradient(135deg,rgba(192,132,252,0.2),rgba(245,197,24,0.2));color:#c084fc;border:1px solid rgba(192,132,252,0.3)}.plan-badge-vip{background:linear-gradient(135deg,rgba(245,158,11,0.25),rgba(245,197,24,0.25));color:#f59e0b;border:1px solid rgba(245,158,11,0.4)}.pricing-card{background:var(--bg-card);border:2px solid var(--border);border-radius:20px;padding:24px;text-align:center;position:relative;overflow:hidden}.pricing-card.featured{border-color:#f5c518}.pricing-price{font-size:32px;font-weight:800;margin:12px 0 4px}.pricing-price span{font-size:14px;color:var(--text-muted)}.pricing-features{text-align:left;margin:16px 0;display:flex;flex-direction:column;gap:8px}.pricing-feature{font-size:11px;color:var(--text-secondary);display:flex;align-items:center;gap:8px}.pricing-feature.disabled{color:var(--text-dim);text-decoration:line-through}.plans-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.paywall-overlay{position:absolute;inset:0;z-index:10;background:rgba(6,9,26,0.85);backdrop-filter:blur(8px);border-radius:inherit;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px}.paywall-btn{padding:10px 24px;border-radius:14px;border:none;background:linear-gradient(145deg,#f5c518,#d4a910);color:#0a3558;font-size:13px;font-weight:700;cursor:pointer}.chat-container{display:flex;flex-direction:column;height:calc(100vh - 200px);min-height:400px;max-height:700px}.chat-messages{flex:1;overflow-y:auto;padding:16px 0;display:flex;flex-direction:column;gap:12px}.chat-bubble{max-width:85%;padding:12px 16px;border-radius:16px;font-size:13px;line-height:1.7;word-wrap:break-word}.chat-bubble-user{align-self:flex-end;background:linear-gradient(145deg,#1a6fb5,#0a3558);color:#fff;border-bottom-right-radius:4px}.chat-bubble-ai{align-self:flex-start;background:rgba(255,255,255,0.05);border:1px solid var(--border);color:var(--text-secondary);border-bottom-left-radius:4px}.chat-input-bar{display:flex;gap:8px;padding:12px 0 0;border-top:1px solid var(--border)}.chat-input{flex:1;padding:12px 16px;background:var(--bg-input);border:1px solid var(--border);border-radius:14px;color:var(--text-primary);font-size:13px;outline:none;resize:none;min-height:44px}.chat-input\:focus{border-color:#f5c518}.chat-send-btn{padding:0 18px;border-radius:14px;border:none;background:linear-gradient(145deg,#f5c518,#d4a910);color:#0a3558;font-size:16px;font-weight:700;cursor:pointer}.chat-send-btn\:disabled{opacity:0.4;cursor:not-allowed}.chat-suggestion{padding:6px 14px;border-radius:50px;border:1px solid var(--border);background:var(--glass);color:var(--text-secondary);font-size:11px;cursor:pointer}.toast-container{position:fixed;bottom:20px;right:20px;z-index:3000;display:flex;flex-direction:column-reverse;gap:8px;pointer-events:none;max-width:380px;width:calc(100% - 40px)}.toast{pointer-events:all;background:rgba(10,16,36,0.95);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 18px;backdrop-filter:blur(30px);box-shadow:0 10px 40px rgba(0,0,0,0.5);display:flex;align-items:center;gap:12px;position:relative;overflow:hidden}.toast-success{border-left:3px solid #22c997}.toast-error{border-left:3px solid #f0465a}.toast-info{border-left:3px solid #3b82f6}.toast-warning{border-left:3px solid #f5c518}@media(max-width:900px){.plans-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:640px){.plans-grid{grid-template-columns:1fr}.toast-container{right:10px;left:10px;bottom:10px;width:auto;max-width:none}}";
document.head.appendChild(css);
var tc=document.createElement('div');tc.className='toast-container';tc.id='toast-container';document.body.appendChild(tc);
var pb=document.createElement('div');pb.id='header-plan-badge';var hi=document.getElementById('header-user-info');if(hi&&hi.parentNode)hi.parentNode.insertBefore(pb,hi.nextSibling);
var authErr=document.getElementById('auth-error');if(authErr&&authErr.parentNode){var fpDiv=document.createElement('div');fpDiv.style.cssText='text-align:right;margin-top:-10px;margin-bottom:12px';fpDiv.innerHTML='<button onclick="showForgotPassword()" style="background:none;border:none;color:#3b82f6;font-size:11px;cursor:pointer">Esqueceu a senha?</button>';authErr.parentNode.insertBefore(fpDiv,authErr);}
})();


function showToast(type, title, msg, duration) {
  duration = duration || 3500;
  const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
  let container = document.querySelector('.toast-container');
  if(!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML =
    '<span class="toast-icon">' + (icons[type]||'ℹ️') + '</span>' +
    '<div class="toast-body">' +
      '<div class="toast-title">' + title + '</div>' +
      (msg ? '<div class="toast-msg">' + msg + '</div>' : '') +
    '</div>' +
    '<button class="toast-close" onclick="dismissToast(this)">✕</button>' +
    '<div class="toast-progress" style="animation-duration:' + duration + 'ms"></div>';
  container.appendChild(toast);
  setTimeout(function() { dismissToast(toast.querySelector('.toast-close')); }, duration);
  
  var toasts = container.querySelectorAll('.toast:not(.toast-out)');
  if(toasts.length > 4) dismissToast(toasts[0].querySelector('.toast-close'));
}

function dismissToast(el) {
  var toast = el && el.closest ? el.closest('.toast') : el;
  if(!toast || toast.classList.contains('toast-out')) return;
  toast.classList.add('toast-out');
  setTimeout(function() { toast.remove(); }, 300);
}


function showForgotPassword() {
  document.getElementById('auth-login-view').style.display='none';
  document.getElementById('auth-register-view').style.display='none';
  document.getElementById('auth-error').style.display='none';

  var fpView = document.getElementById('auth-forgot-view');
  if(fpView) { fpView.style.display='block'; return; }

  fpView = document.createElement('div');
  fpView.id = 'auth-forgot-view';
  fpView.innerHTML =
    '<div style="font-size:14px;font-weight:700;color:#f5c518;margin-bottom:8px;text-align:center">Recuperar senha</div>' +
    '<p style="font-size:11px;color:#5a6577;text-align:center;margin-bottom:16px;line-height:1.6">Digite seu email e enviaremos um link para redefinir sua senha.</p>' +
    '<div style="margin-bottom:16px">' +
      '<label style="font-size:11px;color:#5a6577;font-weight:600;display:block;margin-bottom:6px">Email cadastrado</label>' +
      '<input type="email" id="forgot-email" placeholder="seu@email.com" onkeydown="if(event.key===\'Enter\')sendPasswordReset()" style="width:100%;padding:13px 16px;background:rgba(6,9,26,0.8);border:1px solid rgba(255,255,255,0.07);border-radius:14px;color:#eef0f6;font-size:14px;font-family:\'Plus Jakarta Sans\',sans-serif;outline:none;box-sizing:border-box;transition:all 0.25s ease;box-shadow:inset 0 2px 4px rgba(0,0,0,0.3)" onfocus="this.style.borderColor=\'#f5c518\'" onblur="this.style.borderColor=\'rgba(255,255,255,0.07)\'">' +
    '</div>' +
    '<div id="forgot-error" style="display:none;padding:10px 14px;background:rgba(240,70,90,0.08);border:1px solid rgba(240,70,90,0.2);border-radius:10px;color:#f0465a;font-size:12px;margin-bottom:14px"></div>' +
    '<div id="forgot-success" style="display:none;padding:10px 14px;background:rgba(34,201,151,0.08);border:1px solid rgba(34,201,151,0.2);border-radius:10px;color:#22c997;font-size:12px;margin-bottom:14px"></div>' +
    '<button onclick="sendPasswordReset()" style="width:100%;padding:14px;border-radius:16px;border:none;background:linear-gradient(145deg,#1a6fb5,#0a3558);color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px;font-family:\'Plus Jakarta Sans\',sans-serif;box-shadow:0 4px 20px rgba(26,111,181,0.3),inset 0 1px 0 rgba(255,255,255,0.15);transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1)" onmouseover="this.style.transform=\'translateY(-2px) scale(1.02)\'" onmouseout="this.style.transform=\'\'">Enviar link de recuperação</button>' +
    '<button onclick="backToLoginFromForgot()" style="width:100%;padding:14px;border-radius:16px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#9ba4b8;font-size:13px;font-weight:600;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;transition:all 0.3s ease" onmouseover="this.style.borderColor=\'rgba(255,255,255,0.15)\'" onmouseout="this.style.borderColor=\'rgba(255,255,255,0.08)\'">← Voltar ao login</button>';

  document.getElementById('auth-form').appendChild(fpView);
}

function backToLoginFromForgot() {
  var fpView = document.getElementById('auth-forgot-view');
  if(fpView) fpView.style.display='none';
  document.getElementById('auth-login-view').style.display='block';
}

async function sendPasswordReset() {
  var email = document.getElementById('forgot-email').value.trim();
  var errEl = document.getElementById('forgot-error');
  var succEl = document.getElementById('forgot-success');
  errEl.style.display='none';
  succEl.style.display='none';

  if(!email) { errEl.textContent='Preencha o email.'; errEl.style.display='block'; return; }
  if(!useFirebase) { errEl.textContent='Recuperação disponível apenas com conta online.'; errEl.style.display='block'; return; }

  try {
    await firebase.auth().sendPasswordResetEmail(email);
    succEl.innerHTML='<strong>Email enviado!</strong> Verifique sua caixa de entrada (e spam) para o link de redefinição de senha.';
    succEl.style.display='block';
    showToast('success','Email enviado!','Verifique sua caixa de entrada para redefinir a senha.');
  } catch(e) {
    var msgs = {
      'auth/user-not-found':'Nenhuma conta encontrada com este email.',
      'auth/invalid-email':'Email inválido.',
      'auth/too-many-requests':'Muitas tentativas. Aguarde alguns minutos.'
    };
    errEl.textContent = msgs[e.code] || 'Erro: ' + e.message;
    errEl.style.display='block';
  }
}


let onboardingStep = 0;
let onboardingSelectedProgs = [];

function shouldShowOnboarding() {
  if(!currentUser) return false;
  if(state.transactions.length > 0) return false;
  if(localStorage.getItem('onboarding-done-'+currentUser.uid)) return false;
  return true;
}

function showOnboarding() {
  onboardingStep = 0;
  onboardingSelectedProgs = [];
  var overlay = document.createElement('div');
  overlay.className = 'onboarding-overlay';
  overlay.id = 'onboarding-overlay';
  overlay.innerHTML = '<div class="onboarding-card" id="onboarding-card"></div>';
  document.body.appendChild(overlay);
  renderOnboardingStep();
}

function renderOnboardingStep() {
  var card = document.getElementById('onboarding-card');
  if(!card) return;
  var totalSteps = 4;

  var dots = '<div class="onboarding-dots">';
  for(var i=0;i<totalSteps;i++) dots += '<div class="onboarding-dot '+(i===onboardingStep?'active':'')+'"></div>';
  dots += '</div>';

  var skipBtn = '<button onclick="finishOnboarding()" style="background:none;border:none;color:#3a4558;font-size:10px;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;margin-top:12px;text-decoration:underline">Pular tutorial</button>';

  if(onboardingStep === 0) {
    card.innerHTML =
      '<div style="text-align:center">' +
        '<div style="font-size:48px;margin-bottom:16px">✈️</div>' +
        '<h2 style="font-size:22px;font-weight:800;margin-bottom:8px"><span style="color:#f5c518">Couri</span> Mile<span style="color:#f5c518;font-size:26px">$</span></h2>' +
        '<p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:4px">Bem-vindo à sua plataforma de gestão inteligente de milhas aéreas!</p>' +
        '<p style="font-size:11px;color:var(--text-muted);line-height:1.6;margin-bottom:24px">Aqui você controla acúmulo, vendas, transferências e resgates com análise de rentabilidade em tempo real.</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px;text-align:left;background:rgba(0,0,0,0.2);border-radius:14px;padding:16px;margin-bottom:20px">' +
          '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:16px">📊</span><span style="font-size:12px;color:var(--text-secondary)">Dashboard com visão geral do seu patrimônio em milhas</span></div>' +
          '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:16px">💰</span><span style="font-size:12px;color:var(--text-secondary)">Análise de custo, lucro e rentabilidade por programa</span></div>' +
          '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:16px">✈️</span><span style="font-size:12px;color:var(--text-secondary)">Simulador: compare emitir com milhas vs dinheiro</span></div>' +
          '<div style="display:flex;align-items:center;gap:10px"><span style="font-size:16px">🔥</span><span style="font-size:12px;color:var(--text-secondary)">Promoções de milhas atualizadas em tempo real</span></div>' +
        '</div>' +
        '<button onclick="nextOnboarding()" style="width:100%;padding:14px;border-radius:16px;border:none;background:linear-gradient(145deg,#f5c518,#d4a910);color:#0a3558;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;box-shadow:0 4px 20px rgba(245,197,24,0.3)">Vamos começar! →</button>' +
        skipBtn + dots +
      '</div>';
  }
  else if(onboardingStep === 1) {
    var progsHTML = PROGRAMS.map(function(p) {
      var sel = onboardingSelectedProgs.indexOf(p.id) >= 0;
      return '<div class="onboarding-prog-item '+(sel?'selected':'')+'" onclick="toggleOnboardingProg(\''+p.id+'\')">' +
        logoHTML(p,28) +
        '<span class="prog-name">'+p.name+'</span>' +
        (sel?'<span style="color:#f5c518;font-size:14px;margin-left:auto">✓</span>':'') +
      '</div>';
    }).join('');

    card.innerHTML =
      '<div style="text-align:center">' +
        '<div style="font-size:36px;margin-bottom:12px">🎯</div>' +
        '<h3 style="font-size:18px;font-weight:800;margin-bottom:6px;color:var(--text-primary)">Quais programas você usa?</h3>' +
        '<p style="font-size:11px;color:var(--text-muted);margin-bottom:16px">Selecione os programas de fidelidade que você participa. Pode alterar depois.</p>' +
        '<div class="onboarding-prog-grid">' + progsHTML + '</div>' +
        '<div style="display:flex;gap:10px;margin-top:20px">' +
          '<button onclick="prevOnboarding()" style="flex:1;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#9ba4b8;font-size:13px;font-weight:600;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif">← Voltar</button>' +
          '<button onclick="nextOnboarding()" style="flex:2;padding:12px;border-radius:14px;border:none;background:linear-gradient(145deg,#1a6fb5,#0a3558);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;box-shadow:0 3px 12px rgba(26,111,181,0.3)">Continuar →</button>' +
        '</div>' +
        skipBtn + dots +
      '</div>';
  }
  else if(onboardingStep === 2) {
    var balInputs = (onboardingSelectedProgs.length > 0 ? onboardingSelectedProgs : PROGRAMS.map(function(p){return p.id;})).map(function(pid) {
      var p = PROGRAMS.find(function(pr){return pr.id===pid;});
      if(!p) return '';
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">' +
        logoHTML(p,28) +
        '<span style="font-size:12px;font-weight:600;color:var(--text-secondary);flex:1">'+p.name+'</span>' +
        '<input type="number" class="form-input" id="ob-bal-'+p.id+'" placeholder="0" style="width:120px;padding:8px 10px;font-size:13px;text-align:right">' +
      '</div>';
    }).join('');

    card.innerHTML =
      '<div style="text-align:center">' +
        '<div style="font-size:36px;margin-bottom:12px">💎</div>' +
        '<h3 style="font-size:18px;font-weight:800;margin-bottom:6px;color:var(--text-primary)">Seus saldos atuais</h3>' +
        '<p style="font-size:11px;color:var(--text-muted);margin-bottom:16px">Informe quantas milhas/pontos você tem em cada programa. Pode deixar em branco e preencher depois.</p>' +
        '<div style="text-align:left;background:rgba(0,0,0,0.2);border-radius:14px;padding:16px">' + balInputs + '</div>' +
        '<div style="display:flex;gap:10px;margin-top:20px">' +
          '<button onclick="prevOnboarding()" style="flex:1;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#9ba4b8;font-size:13px;font-weight:600;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif">← Voltar</button>' +
          '<button onclick="saveOnboardingBalances();nextOnboarding()" style="flex:2;padding:12px;border-radius:14px;border:none;background:linear-gradient(145deg,#1a6fb5,#0a3558);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;box-shadow:0 3px 12px rgba(26,111,181,0.3)">Continuar →</button>' +
        '</div>' +
        skipBtn + dots +
      '</div>';
  }
  else if(onboardingStep === 3) {
    card.innerHTML =
      '<div style="text-align:center">' +
        '<div style="font-size:48px;margin-bottom:16px">🚀</div>' +
        '<h3 style="font-size:18px;font-weight:800;margin-bottom:6px;color:var(--text-primary)">Tudo pronto!</h3>' +
        '<p style="font-size:12px;color:var(--text-secondary);line-height:1.7;margin-bottom:20px">Seu Couri Mile$ está configurado. Aqui vão algumas dicas:</p>' +
        '<div style="display:flex;flex-direction:column;gap:10px;text-align:left;margin-bottom:24px">' +
          '<div style="padding:12px;background:rgba(245,197,24,0.06);border:1px solid rgba(245,197,24,0.15);border-radius:12px;display:flex;align-items:center;gap:10px">' +
            '<span style="font-size:20px">➕</span>' +
            '<div><div style="font-size:12px;font-weight:700;color:#f5c518">Registre cada movimentação</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px">Use o botão "+ Lançar" no topo para registrar compras, vendas e resgates.</div></div>' +
          '</div>' +
          '<div style="padding:12px;background:rgba(26,111,181,0.06);border:1px solid rgba(26,111,181,0.15);border-radius:12px;display:flex;align-items:center;gap:10px">' +
            '<span style="font-size:20px">📂</span>' +
            '<div><div style="font-size:12px;font-weight:700;color:#3b82f6">Importe seus extratos</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px">Use "Importar" para carregar extratos em Excel ou CSV dos programas.</div></div>' +
          '</div>' +
          '<div style="padding:12px;background:rgba(34,201,151,0.06);border:1px solid rgba(34,201,151,0.15);border-radius:12px;display:flex;align-items:center;gap:10px">' +
            '<span style="font-size:20px">✈️</span>' +
            '<div><div style="font-size:12px;font-weight:700;color:#22c997">Simule antes de emitir</div><div style="font-size:10px;color:var(--text-muted);margin-top:2px">Use o Simulador para comparar se vale mais usar milhas ou dinheiro.</div></div>' +
          '</div>' +
        '</div>' +
        '<button onclick="finishOnboarding()" style="width:100%;padding:14px;border-radius:16px;border:none;background:linear-gradient(145deg,#f5c518,#d4a910);color:#0a3558;font-size:15px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif;box-shadow:0 4px 20px rgba(245,197,24,0.3)">Começar a usar! 🎉</button>' +
        dots +
      '</div>';
  }
}

function toggleOnboardingProg(pid) {
  var idx = onboardingSelectedProgs.indexOf(pid);
  if(idx >= 0) onboardingSelectedProgs.splice(idx,1);
  else onboardingSelectedProgs.push(pid);
  renderOnboardingStep();
}

function nextOnboarding() { onboardingStep++; renderOnboardingStep(); }
function prevOnboarding() { if(onboardingStep>0) onboardingStep--; renderOnboardingStep(); }

function saveOnboardingBalances() {
  var progs = onboardingSelectedProgs.length > 0 ? onboardingSelectedProgs : PROGRAMS.map(function(p){return p.id;});
  progs.forEach(function(pid) {
    var el = document.getElementById('ob-bal-'+pid);
    if(el) {
      var val = parseInt(el.value) || 0;
      if(val > 0) state.balances[pid] = val;
    }
  });
  saveState();
}

function finishOnboarding() {
  var overlay = document.getElementById('onboarding-overlay');
  if(overlay) overlay.remove();
  if(currentUser) localStorage.setItem('onboarding-done-'+currentUser.uid, '1');
  showToast('success', 'Bem-vindo ao Couri Mile$!', 'Seu painel está pronto. Boas milhas! ✈️');
  render();
}


function showTermsModal(context) {
  
  var overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');

  var acceptBtn = context === 'register'
    ? '<button onclick="acceptTerms()" style="flex:2;padding:12px;border-radius:14px;border:none;background:linear-gradient(145deg,#22c997,#17a37a);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif">Li e aceito os termos</button>'
    : '<button onclick="closeModal()" style="flex:1;padding:12px;border-radius:14px;border:none;background:linear-gradient(145deg,#1a6fb5,#0a3558);color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif">Fechar</button>';

  document.getElementById('modal').innerHTML =
    '<div class="modal-header">' +
      '<h3>📋 Termos de Uso e Privacidade</h3>' +
      '<button class="close-btn" onclick="closeModal()">✕</button>' +
    '</div>' +
    '<div class="terms-modal-body">' +
      '<h4>1. Termos de Uso — Couri Mile$</h4>' +
      '<p>Ao utilizar o aplicativo Couri Mile$, você concorda com os seguintes termos:</p>' +
      '<p><strong>1.1 Natureza do Serviço:</strong> O Couri Mile$ é uma ferramenta de gestão e controle de milhas aéreas e pontos de programas de fidelidade. O app NÃO realiza compra, venda ou intermediação de milhas.</p>' +
      '<p><strong>1.2 Responsabilidade:</strong> As informações inseridas no app são de responsabilidade do usuário. O Couri Mile$ não se responsabiliza por decisões financeiras tomadas com base nos dados exibidos.</p>' +
      '<p><strong>1.3 Conta e Acesso:</strong> Cada conta é pessoal e intransferível. O usuário é responsável por manter a segurança de suas credenciais de acesso.</p>' +
      '<p><strong>1.4 Disponibilidade:</strong> O serviço é fornecido "como está". Nos esforçamos para manter alta disponibilidade, mas não garantimos funcionamento ininterrupto.</p>' +
      '<p><strong>1.5 Propriedade Intelectual:</strong> Todo o conteúdo, design e código do Couri Mile$ são propriedade da Courinvest Consultoria em Investimentos.</p>' +
      '<p><strong>1.6 Assinaturas:</strong> Planos pagos são cobrados mensalmente. O cancelamento pode ser feito a qualquer momento e terá efeito no próximo ciclo de cobrança.</p>' +

      '<h4>2. Política de Privacidade (LGPD)</h4>' +
      '<p>Em conformidade com a Lei Geral de Proteção de Dados (Lei 14.058/2020):</p>' +
      '<p><strong>2.1 Dados Coletados:</strong> Coletamos apenas: email, nome, dados de milhas/pontos inseridos pelo usuário, e dados de uso do app (páginas visitadas, funcionalidades utilizadas).</p>' +
      '<p><strong>2.2 Finalidade:</strong> Os dados são utilizados exclusivamente para fornecer o serviço de gestão de milhas, melhorar a experiência do usuário e comunicar atualizações do serviço.</p>' +
      '<p><strong>2.3 Armazenamento:</strong> Os dados são armazenados no Google Firebase (servidores nos EUA) com criptografia em trânsito e em repouso. Nenhuma senha de programas de fidelidade é armazenada.</p>' +
      '<p><strong>2.4 Compartilhamento:</strong> NÃO compartilhamos seus dados com terceiros, exceto quando exigido por lei.</p>' +
      '<p><strong>2.5 Seus Direitos:</strong> Você tem direito a: acessar seus dados, solicitar correção, solicitar exclusão, revogar consentimento e portabilidade dos dados. Para exercer estes direitos, envie email para courinvest.67@gmail.com.</p>' +
      '<p><strong>2.6 Cookies:</strong> Utilizamos localStorage para funcionamento do app. Não utilizamos cookies de rastreamento de terceiros.</p>' +
      '<p><strong>2.7 Retenção:</strong> Seus dados são mantidos enquanto sua conta estiver ativa. Após exclusão da conta, os dados são removidos em até 30 dias.</p>' +

      '<h4>3. Contato</h4>' +
      '<p>Para dúvidas sobre estes termos ou sobre privacidade:<br>' +
      '<strong>Courinvest Consultoria em Investimentos</strong><br>' +
      'Email: courinvest.67@gmail.com</p>' +

      '<p style="margin-top:16px;font-size:10px;color:var(--text-dim)">Última atualização: Abril 2026</p>' +
    '</div>' +
    '<div style="display:flex;gap:10px;margin-top:12px">' +
      (context === 'register' ? '<button onclick="closeModal()" style="flex:1;padding:12px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.03);color:#9ba4b8;font-size:13px;font-weight:600;cursor:pointer;font-family:\'Plus Jakarta Sans\',sans-serif">Cancelar</button>' : '') +
      acceptBtn +
    '</div>';
}

function acceptTerms() {
  if(currentUser) {
    localStorage.setItem('terms-accepted-'+currentUser.uid, new Date().toISOString());
  }
  closeModal();
  showToast('success','Termos aceitos','Obrigado! Você pode consultar os termos a qualquer momento na aba Contas.');
}

function hasAcceptedTerms() {
  if(!currentUser) return true;
  return !!localStorage.getItem('terms-accepted-'+currentUser.uid);
}


async function parsePDFFile(file) {
  if(typeof pdfjsLib === 'undefined') {
    showToast('error','Erro','Biblioteca PDF não carregada. Tente recarregar a página.');
    return [];
  }
  try {
    var arrayBuffer = await file.arrayBuffer();
    var pdf = await pdfjsLib.getDocument({data: arrayBuffer}).promise;
    var allText = '';

    for(var i = 1; i <= pdf.numPages; i++) {
      var page = await pdf.getPage(i);
      var textContent = await page.getTextContent();
      var pageText = textContent.items.map(function(item) { return item.str; }).join(' ');
      allText += pageText + '\n';
    }

    
    var lines = allText.split('\n').filter(function(l) { return l.trim().length > 10; });
    var rows = [];

    lines.forEach(function(line) {
      
      var dateMatch = line.match(/(\d{2})[\/\-](\d{2})[\/\-](\d{2,4})/);
      if(!dateMatch) return;

      var year = dateMatch[3].length === 2 ? '20' + dateMatch[3] : dateMatch[3];
      var date = year + '-' + dateMatch[2] + '-' + dateMatch[1];

      
      var numbers = line.match(/[\d\.]+/g);
      if(!numbers) return;

      var miles = 0;
      var value = 0;
      var possibleMiles = numbers.filter(function(n) {
        var v = parseInt(n.replace(/\./g, ''));
        return v >= 100 && v <= 10000000;
      });

      if(possibleMiles.length > 0) {
        miles = parseInt(possibleMiles[0].replace(/\./g, ''));
      }

      
      var valueMatch = line.match(/R\$\s*([\d\.]+,\d{2})/);
      if(valueMatch) {
        value = parseFloat(valueMatch[1].replace(/\./g, '').replace(',', '.'));
      }

      if(miles === 0) return;

      
      var desc = line
        .replace(/(\d{2})[\/\-](\d{2})[\/\-](\d{2,4})/, '')
        .replace(/R\$\s*[\d\.]+,\d{2}/, '')
        .replace(/\s+/g, ' ')
        .trim();
      if(desc.length > 80) desc = desc.substring(0, 80) + '…';
      if(!desc) desc = 'Importado do PDF';

      
      var lower = line.toLowerCase();
      var type = 'compra';
      if(lower.includes('venda') || lower.includes('resgate')) type = 'venda';
      else if(lower.includes('uso') || lower.includes('emiss') || lower.includes('passag')) type = 'uso';
      else if(lower.includes('transf')) type = 'transferencia';

      rows.push({
        raw: [line],
        date: date,
        miles: miles,
        value: value,
        desc: desc,
        type: type,
        destProgId: null,
        bonusPct: 0,
        origin: ''
      });
    });

    if(rows.length === 0) {
      showToast('warning','PDF importado','Não foi possível detectar transações automaticamente. O texto foi extraído mas o formato não é reconhecido. Tente exportar como Excel/CSV.');
    }

    return rows;
  } catch(e) {
    console.error('PDF parse error:', e);
    showToast('error','Erro ao ler PDF', e.message);
    return [];
  }
}


let historySearch = '';
let historyTypeFilter = '';
let historyDateFrom = '';
let historyDateTo = '';
let historySortBy = 'date-desc';

function renderHistoryFiltered() {
  
  let txs = filterProgram==='all' ? state.transactions : state.transactions.filter(function(t){return t.program===filterProgram;});

  
  if(historyTypeFilter) {
    txs = txs.filter(function(t){ return t.type === historyTypeFilter; });
  }

  
  if(historyDateFrom) {
    txs = txs.filter(function(t){ return t.date >= historyDateFrom; });
  }
  if(historyDateTo) {
    txs = txs.filter(function(t){ return t.date <= historyDateTo; });
  }

  
  if(historySearch) {
    var q = historySearch.toLowerCase();
    txs = txs.filter(function(t){
      var prog = PROGRAMS.find(function(p){return p.id===t.program;});
      return (t.description||'').toLowerCase().indexOf(q) >= 0
        || (prog && prog.name.toLowerCase().indexOf(q) >= 0)
        || (TYPE_LABELS[t.type]||'').toLowerCase().indexOf(q) >= 0
        || String(t.miles).indexOf(q) >= 0;
    });
  }

  
  if(historySortBy === 'date-asc') txs.sort(function(a,b){return new Date(a.date)-new Date(b.date);});
  else if(historySortBy === 'miles-desc') txs.sort(function(a,b){return b.miles-a.miles;});
  else if(historySortBy === 'miles-asc') txs.sort(function(a,b){return a.miles-b.miles;});
  else if(historySortBy === 'value-desc') txs.sort(function(a,b){return (b.cost||b.savedValue||0)-(a.cost||a.savedValue||0);});
  else txs.sort(function(a,b){return new Date(b.date)-new Date(a.date);});

  return txs;
}

function setHistorySearch(val) { historySearch = val; render(); }
function setHistoryTypeFilter(val) { historyTypeFilter = val; render(); }
function setHistoryDateFrom(val) { historyDateFrom = val; render(); }
function setHistoryDateTo(val) { historyDateTo = val; render(); }
function setHistorySort(val) { historySortBy = val; render(); }
function clearHistoryFilters() {
  historySearch = '';
  historyTypeFilter = '';
  historyDateFrom = '';
  historyDateTo = '';
  historySortBy = 'date-desc';
  render();
}


const PLANS = {
  free:    { id:'free',    name:'Free',    price:0,     badge:'FREE',    badgeClass:'plan-badge-free',    color:'#556177', maxPrograms:3, maxTransactions:30 },
  trial:   { id:'trial',   name:'Trial',   price:0,     badge:'TRIAL 7d',badgeClass:'plan-badge-trial',   color:'#3b82f6', maxPrograms:8, maxTransactions:9999, durationDays:7 },
  pro:     { id:'pro',     name:'Pro',     price:19.90, badge:'PRO',     badgeClass:'plan-badge-pro',     color:'#f5c518', maxPrograms:8, maxTransactions:9999 },
  premium: { id:'premium', name:'Premium', price:69.90, badge:'PREMIUM', badgeClass:'plan-badge-premium', color:'#c084fc', maxPrograms:8, maxTransactions:9999 },
};

const PLAN_FEATURES = {
  free:    { dashboard:true, programs:3, transactions:30, simulator:false, reports:false, promos:false, recurring:false, import:false, analytics:true, export:false },
  trial:   { dashboard:true, programs:8, transactions:9999, simulator:true, reports:true, promos:true, recurring:true, import:true, analytics:true, export:true },
  pro:     { dashboard:true, programs:8, transactions:9999, simulator:true, reports:true, promos:true, recurring:true, import:true, analytics:true, export:true },
  premium: { dashboard:true, programs:8, transactions:9999, simulator:true, reports:true, promos:true, recurring:true, import:true, analytics:true, export:true },
};

const WHATSAPP_NUMBER = '5532988414085'; 

function getUserPlan() {
  if(!currentUser) return PLANS.free;
  const planId = state._plan || 'free';
  const planExpiry = state._planExpiry ? new Date(state._planExpiry) : null;
  const now = new Date();

  
  if(planId === 'trial' && planExpiry && now > planExpiry) {
    state._plan = 'free';
    state._planStatus = 'expired';
    saveState();
    return PLANS.free;
  }
  if((planId === 'pro' || planId === 'premium') && planExpiry && now > planExpiry) {
    state._plan = 'free';
    state._planStatus = 'expired';
    saveState();
    return PLANS.free;
  }

  return PLANS[planId] || PLANS.free;
}

function getUserPlanFeatures() {
  const plan = getUserPlan();
  return PLAN_FEATURES[plan.id] || PLAN_FEATURES.free;
}

function canAccessFeature(feature) {
  if(isAdmin()) return true;
  const features = getUserPlanFeatures();
  return features[feature] === true || (typeof features[feature] === 'number' && features[feature] > 0);
}

function canAddProgram() {
  if(isAdmin()) return true;
  const features = getUserPlanFeatures();
  const activePrograms = Object.entries(state.balances).filter(([k,v]) => v > 0).length;
  return activePrograms < features.programs;
}

function canAddTransaction() {
  if(isAdmin()) return true;
  const features = getUserPlanFeatures();
  return state.transactions.length < features.transactions;
}

function isFeatureLocked(tabId) {
  if(isAdmin()) return false;
  const map = {
    simulator: 'simulator',
    reports: 'reports',
    promos: 'promos',
  };
  if(!map[tabId]) return false;
  return !canAccessFeature(map[tabId]);
}

function getPlanBadgeHTML() {
  const plan = getUserPlan();
  const p = PLANS[plan.id] || PLANS.free;
  let extra = '';
  if(plan.id === 'trial' && state._planExpiry) {
    const days = Math.max(0, Math.ceil((new Date(state._planExpiry) - new Date()) / (1000*60*60*24)));
    extra = ` · ${days}d restantes`;
  }
  return `<span class="plan-badge ${p.badgeClass}">${p.badge}${extra}</span>`;
}

function initUserPlan() {
  if(!currentUser) return;
  
  if(!state._plan && state.transactions.length === 0) {
    state._plan = 'trial';
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    state._planExpiry = expiry.toISOString();
    state._planStatus = 'active';
    state._planStarted = new Date().toISOString();
    saveState();
  }
}

function getPaywallHTML(feature, title, description) {
  const plan = getUserPlan();
  return `<div class="paywall-overlay">
    <div class="paywall-icon">🔒</div>
    <div class="paywall-title">${title || 'Recurso Premium'}</div>
    <div class="paywall-desc">${description || 'Este recurso está disponível nos planos Pro e Premium.'}<br>
      ${plan.id==='trial'?'Seu trial expirou.':plan.id==='free'?'Você está no plano Free.':'Seu plano expirou.'}</div>
    <button class="paywall-btn" onclick="switchTab('plans')">⭐ Ver Planos</button>
  </div>`;
}

function renderPaywalledContent(tabId, contentFn) {
  if(isFeatureLocked(tabId)) {
    const titles = {
      simulator: 'Simulador de Emissão',
      reports: 'Relatórios e Exportação',
      promos: 'Promoções em Tempo Real',
    };
    const descs = {
      simulator: 'Compare custos de emissão com milhas vs dinheiro e encontre a melhor opção.',
      reports: 'Gere relatórios detalhados e exporte seus dados em Excel.',
      promos: 'Acompanhe promoções de milhas atualizadas em tempo real.',
    };
    return `<div style="position:relative;min-height:300px">
      <div style="filter:blur(4px);opacity:0.3;pointer-events:none">${contentFn()}</div>
      ${getPaywallHTML(tabId, titles[tabId], descs[tabId])}
    </div>`;
  }
  return contentFn();
}


function renderPlans() {
  const currentPlan = getUserPlan();
  const trialUsed = !!state._planStarted;

  const checkIcon = '<span style="color:#22c997;font-size:12px">✓</span>';
  const crossIcon = '<span style="color:#3a4558;font-size:12px">✕</span>';

  return `<div style="display:flex;flex-direction:column;gap:14px">
    <div style="text-align:center;margin-bottom:8px">
      <div style="font-size:22px;font-weight:800;color:var(--text-primary)">Escolha seu plano</div>
      <div style="font-size:12px;color:var(--text-muted);margin-top:6px">Gerencie suas milhas como um profissional</div>
      <div style="margin-top:10px">Plano atual: ${getPlanBadgeHTML()}</div>
    </div>

    <div class="plans-grid">
      <!-- FREE -->
      <div class="pricing-card">
        <div style="font-size:14px;font-weight:700;color:#556177">Free</div>
        <div class="pricing-price" style="color:#556177">R$ 0 <span>/mês</span></div>
        <div style="font-size:10px;color:var(--text-dim)">Para começar a explorar</div>
        <div class="pricing-features">
          <div class="pricing-feature">${checkIcon} Dashboard básico</div>
          <div class="pricing-feature">${checkIcon} Até 3 programas</div>
          <div class="pricing-feature">${checkIcon} Até 30 transações</div>
          <div class="pricing-feature">${checkIcon} Análise de custo/milheiro</div>
          <div class="pricing-feature disabled">${crossIcon} Simulador de emissão</div>
          <div class="pricing-feature disabled">${crossIcon} Relatórios e exportação</div>
          <div class="pricing-feature disabled">${crossIcon} Promoções em tempo real</div>
          <div class="pricing-feature disabled">${crossIcon} Importação de extratos</div>
          <div class="pricing-feature disabled">${crossIcon} Lançamentos recorrentes</div>
        </div>
        ${currentPlan.id==='free'?'<div style="padding:10px;border-radius:12px;background:rgba(85,97,119,0.1);color:#556177;font-size:12px;font-weight:700;text-align:center">Plano Atual</div>':''}
      </div>

      <!-- PRO -->
      <div class="pricing-card featured">
        <div style="font-size:14px;font-weight:700;color:#f5c518">Pro</div>
        <div class="pricing-price" style="color:#f5c518">R$ 19,90 <span>/mês</span></div>
        <div style="font-size:10px;color:var(--text-dim)">Para quem leva milhas a sério</div>
        <div class="pricing-features">
          <div class="pricing-feature">${checkIcon} Dashboard completo</div>
          <div class="pricing-feature">${checkIcon} <strong>Todos os 8 programas</strong></div>
          <div class="pricing-feature">${checkIcon} <strong>Transações ilimitadas</strong></div>
          <div class="pricing-feature">${checkIcon} Análise de custo/milheiro</div>
          <div class="pricing-feature">${checkIcon} <strong>Simulador de emissão</strong></div>
          <div class="pricing-feature">${checkIcon} <strong>Relatórios + exportação Excel</strong></div>
          <div class="pricing-feature">${checkIcon} <strong>Promoções em tempo real</strong></div>
          <div class="pricing-feature">${checkIcon} <strong>Importação de extratos</strong></div>
          <div class="pricing-feature">${checkIcon} <strong>Lançamentos recorrentes</strong></div>
        </div>
        ${currentPlan.id==='pro'?'<div style="padding:10px;border-radius:12px;background:rgba(245,197,24,0.1);color:#f5c518;font-size:12px;font-weight:700;text-align:center">✓ Plano Atual</div>':`
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Quero assinar o plano Pro do Couri Mile$ (R$19,90/mês). Meu email: '+(currentUser?currentUser.email:''))}" target="_blank" rel="noopener" style="display:block;padding:12px;border-radius:14px;background:linear-gradient(145deg,#f5c518,#d4a910);color:#0a3558;font-size:14px;font-weight:700;text-align:center;text-decoration:none;font-family:inherit;box-shadow:0 4px 16px rgba(245,197,24,0.3)">Assinar Pro</a>`}
      </div>

      <!-- PREMIUM -->
      <div class="pricing-card">
        <div style="font-size:14px;font-weight:700;color:#c084fc">Premium</div>
        <div class="pricing-price" style="color:#c084fc">R$ 69,90 <span>/mês</span></div>
        <div style="font-size:10px;color:var(--text-dim)">Máxima performance em milhas</div>
        <div class="pricing-features">
          <div class="pricing-feature">${checkIcon} <strong>Tudo do Pro</strong></div>
          <div class="pricing-feature">${checkIcon} Suporte prioritário WhatsApp</div>
          <div class="pricing-feature">${checkIcon} Consultoria mensal 1:1</div>
          <div class="pricing-feature">${checkIcon} Alertas personalizados (em breve)</div>
          <div class="pricing-feature">${checkIcon} Multi-carteira (em breve)</div>
        </div>
        ${currentPlan.id==='premium'?'<div style="padding:10px;border-radius:12px;background:rgba(192,132,252,0.1);color:#c084fc;font-size:12px;font-weight:700;text-align:center">✓ Plano Atual</div>':`
        <a href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Quero assinar o plano Premium do Couri Mile$ (R$69,90/mês). Meu email: '+(currentUser?currentUser.email:''))}" target="_blank" rel="noopener" style="display:block;padding:12px;border-radius:14px;background:linear-gradient(145deg,#c084fc,#9333ea);color:#fff;font-size:14px;font-weight:700;text-align:center;text-decoration:none;font-family:inherit;box-shadow:0 4px 16px rgba(192,132,252,0.3)">Assinar Premium</a>`}
      </div>
    </div>

    ${!trialUsed && currentPlan.id==='free' ? `
    <div class="card" style="border:2px solid #3b82f6;text-align:center">
      <div style="font-size:16px;font-weight:800;color:#3b82f6;margin-bottom:6px">🎁 Teste grátis por 7 dias!</div>
      <div style="font-size:12px;color:var(--text-secondary);margin-bottom:14px">Experimente todos os recursos Pro sem compromisso. Sem cartão de crédito.</div>
      <button onclick="startTrial()" style="padding:12px 32px;border-radius:14px;border:none;background:linear-gradient(145deg,#3b82f6,#2563eb);color:#fff;font-size:14px;font-weight:700;cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:0 4px 16px rgba(59,130,246,0.3)">Começar Trial Grátis</button>
    </div>` : ''}

    <div class="card" style="text-align:center">
      <div style="font-size:11px;color:var(--text-dim);line-height:1.7">
        💬 Dúvidas? Entre em contato pelo <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" style="color:#22c997;text-decoration:none;font-weight:600">WhatsApp</a><br>
        📧 ou por email: <a href="mailto:courinvest.67@gmail.com" style="color:#3b82f6;text-decoration:none;font-weight:600">courinvest.67@gmail.com</a>
      </div>
    </div>
  </div>`;
}

function startTrial() {
  if(!currentUser) { showToast('error','Erro','Faça login para iniciar o trial.'); return; }
  if(state._planStarted) { showToast('warning','Trial já utilizado','Você já usou seu período de teste.'); return; }
  state._plan = 'trial';
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  state._planExpiry = expiry.toISOString();
  state._planStatus = 'active';
  state._planStarted = new Date().toISOString();
  saveState();
  showToast('success','Trial ativado!','Você tem 7 dias para testar todos os recursos Pro. Aproveite! 🎉');
  renderTabs();
  render();
}


function adminSetPlan(uid, planId, months) {
  if(!isAdmin() || !useFirebase) return;
  months = months || 1;
  const expiry = new Date();
  expiry.setMonth(expiry.getMonth() + months);

  db.collection('users').doc(uid).update({
    _plan: planId,
    _planExpiry: expiry.toISOString(),
    _planStatus: 'active',
    _planSetBy: currentUser.email,
    _planSetAt: new Date().toISOString(),
  }).then(function() {
    showToast('success','Plano atualizado','Plano '+planId+' ativado por '+months+' mês(es).');
    loadAdminUsers();
  }).catch(function(e) {
    showToast('error','Erro','Falha ao atualizar plano: '+e.message);
  });
}

function adminRevokePlan(uid) {
  if(!isAdmin() || !useFirebase) return;
  if(!confirm('Revogar plano deste usuário? Voltará ao Free.')) return;
  db.collection('users').doc(uid).update({
    _plan: 'free',
    _planExpiry: null,
    _planStatus: 'revoked',
    _planRevokedBy: currentUser.email,
    _planRevokedAt: new Date().toISOString(),
  }).then(function() {
    showToast('info','Plano revogado','Usuário voltou ao plano Free.');
    loadAdminUsers();
  }).catch(function(e) {
    showToast('error','Erro','Falha ao revogar: '+e.message);
  });
}


let consultorHistory = [];
let consultorSending = false;
const CONSULTOR_MONTHLY_LIMIT = 50;

function getConsultorMsgCount() {
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
  if(state._consultorMsgMonth !== monthKey) {
    state._consultorMsgsUsed = 0;
    state._consultorMsgMonth = monthKey;
  }
  return state._consultorMsgsUsed || 0;
}

function canSendConsultorMsg() {
  return getConsultorMsgCount() < CONSULTOR_MONTHLY_LIMIT;
}

function incrementConsultorMsg() {
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0');
  state._consultorMsgMonth = monthKey;
  state._consultorMsgsUsed = (state._consultorMsgsUsed || 0) + 1;
  saveState();
}

function buildConsultorSystemPrompt() {
  const m = getMetrics();
  const plan = getUserPlan();

  let balancesText = '';
  PROGRAMS.forEach(function(p) {
    const bal = state.balances[p.id] || 0;
    if(bal > 0) {
      const acq = getProgAcquisition(p.id);
      const mv = getMarketValBRL(p.id);
      balancesText += '- ' + p.name + ': ' + fMiles(bal) + ' milhas (custo médio R$' + acq.avgCostPerK.toFixed(2) + '/K, valor mercado R$' + mv.toFixed(2) + '/K)\n';
    }
  });
  if(!balancesText) balancesText = '- Nenhum saldo registrado ainda\n';

  const recentTxs = state.transactions.slice(0, 10).map(function(t) {
    const prog = PROGRAMS.find(function(p){return p.id===t.program;});
    return '  ' + t.date + ' | ' + (prog?prog.name:t.program) + ' | ' + TYPE_LABELS[t.type] + ' | ' + fMiles(t.miles) + ' milhas' + (t.cost>0?' | R$'+t.cost.toFixed(2):'');
  }).join('\n');

  return `Você é o Consultor de Milhas do Couri Mile$, um assistente especializado em programas de fidelidade e milhas aéreas do Brasil.

IDENTIDADE:
- Nome: Consultor Couri Mile$
- Tom: consultivo, direto, amigável, com dados concretos
- Especialidade: milhas aéreas, pontos de fidelidade, programas brasileiros (Livelo, Smiles, TudoAzul, LATAM Pass, ALL Accor, Esfera, C6 Átomos, Inter Loop)
- Responda SEMPRE em português brasileiro

DADOS DO USUÁRIO (use para personalizar respostas):
Plano: ${plan.name}
Saldos atuais:
${balancesText}
Total de milhas: ${fMiles(m.totalMiles)}
Total investido: ${fCur(m.totalSpent)}
Custo médio geral: R$ ${m.avgCostPerK.toFixed(2)}/milheiro
Receita com vendas: ${fCur(m.totalRevenue)}
Economia com resgates: ${fCur(m.totalSaved)}
Lucro total: ${fCur(m.totalProfit)}
Valor de mercado do portfólio: ${fCur(getTotalPortfolioValue())}

Últimas movimentações:
${recentTxs || '  Nenhuma movimentação registrada'}

CONHECIMENTO:
- Programas: Livelo (Bradesco/BB), Smiles (GOL), TudoAzul (Azul), LATAM Pass (LATAM), ALL Accor (hotéis), Esfera (Santander), C6 Átomos (C6 Bank), Inter Loop (Banco Inter)
- Transferências bonificadas: promoções frequentes entre bancos e cias aéreas (ex: Livelo→Smiles com 80% bônus)
- Clubes de milhas: Clube Livelo, Clube Smiles, Clube TudoAzul, Clube LATAM Pass
- Valor de mercado: varia por programa (Livelo ~R$35/K, Smiles ~R$23/K, TudoAzul ~R$22/K, LATAM Pass ~R$29/K)
- MaxMilhas/HotMilhas: plataformas para venda de milhas
- Bumerangue: parte dos pontos retorna à origem em algumas transferências

FUNCIONALIDADES DO APP QUE VOCÊ PODE EXPLICAR:
- Dashboard: visão geral de KPIs, saldo, distribuição, movimentações recentes
- Programas: saldo por programa com custo médio, valor de mercado, lucro
- Histórico: todas as movimentações com filtros e busca
- Simulador: compara custo de emissão com milhas vs dinheiro vs híbrido
- Promoções: promoções de milhas em tempo real do Melhores Destinos e outros
- Relatórios: exportação Excel detalhada por período
- Contas: atualizar saldos, valor de mercado, lançamentos recorrentes
- Transferências: com paridade, bônus e bumerangue

REGRAS:
1. Sempre baseie recomendações nos DADOS REAIS do usuário quando possível
2. Cite números específicos (custo, saldo, valor de mercado)
3. Seja objetivo e prático — dê ações concretas
4. Não dê conselho financeiro genérico — foque em milhas e pontos
5. Se não souber algo, diga honestamente
6. Respostas concisas (2-4 parágrafos no máximo, use listas quando útil)
7. Use emojis moderadamente para tornar a leitura mais agradável
8. Quando relevante, sugira funcionalidades do app que ajudem o usuário`;
}

function renderConsultor() {
  const plan = getUserPlan();
  const isPremium = plan.id === 'premium' || isAdmin();

  if(!isPremium) {
    return `<div style="display:flex;flex-direction:column;gap:14px">
      <div class="card" style="position:relative;min-height:400px;border-top:3px solid #c084fc">
        <div style="filter:blur(4px);opacity:0.2;pointer-events:none">
          <div style="font-size:16px;font-weight:800;margin-bottom:12px">💬 Consultor de Milhas IA</div>
          <div style="background:rgba(255,255,255,0.03);border-radius:16px;padding:12px 16px;margin-bottom:8px;font-size:13px;color:var(--text-muted)">Olá! Sou seu consultor de milhas pessoal...</div>
          <div style="background:rgba(26,111,181,0.2);border-radius:16px;padding:12px 16px;margin-bottom:8px;font-size:13px;align-self:flex-end;margin-left:auto;max-width:70%">Quero saber se devo vender ou usar minhas milhas</div>
          <div style="background:rgba(255,255,255,0.03);border-radius:16px;padding:12px 16px;font-size:13px;color:var(--text-muted)">Com base nos seus dados, suas milhas Smiles custaram R$18,50/K...</div>
        </div>
        <div class="paywall-overlay">
          <div class="paywall-icon">💬</div>
          <div class="paywall-title">Consultor de Milhas IA</div>
          <div class="paywall-desc">Seu consultor pessoal que analisa seus dados e dá recomendações inteligentes.<br>Disponível exclusivamente no plano Premium.</div>
          <button class="paywall-btn" onclick="switchTab('plans')">⭐ Assinar Premium</button>
        </div>
      </div>
    </div>`;
  }

  const used = getConsultorMsgCount();
  const remaining = Math.max(0, CONSULTOR_MONTHLY_LIMIT - used);

  let messagesHTML = '';
  if(consultorHistory.length === 0) {
    messagesHTML = `
      <div class="chat-bubble chat-bubble-ai">
        <strong>Olá! 👋</strong> Sou seu consultor de milhas pessoal do Couri Mile$.<br><br>
        Tenho acesso aos seus saldos, custos e movimentações. Posso te ajudar com:<br>
        • Quando vender ou resgatar milhas<br>
        • Melhores momentos para transferir<br>
        • Análise de rentabilidade dos seus programas<br>
        • Dúvidas sobre o app<br><br>
        <em style="color:var(--text-dim)">Como posso te ajudar?</em>
      </div>`;
  } else {
    messagesHTML = consultorHistory.map(function(msg) {
      if(msg.role === 'user') {
        return '<div class="chat-bubble chat-bubble-user">' + escapeHTML(msg.content) + '</div>';
      } else {
        return '<div class="chat-bubble chat-bubble-ai">' + formatConsultorResponse(msg.content) + '</div>';
      }
    }).join('');
  }

  if(consultorSending) {
    messagesHTML += '<div class="chat-bubble chat-bubble-ai chat-typing"><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div><div class="chat-typing-dot"></div></div>';
  }

  const suggestions = [
    'Devo vender ou usar minhas milhas?',
    'Qual programa tem melhor custo-benefício?',
    'Como funciona o simulador?',
    'Quando transferir com bônus?',
    'Análise do meu portfólio',
    'Como importar meu extrato?',
  ];

  const suggestionsHTML = consultorHistory.length === 0 ? `
    <div class="chat-suggestions">
      ${suggestions.map(function(s){ return '<button class="chat-suggestion" onclick="sendConsultorFromSuggestion(this)" data-msg="'+s+'">'+s+'</button>'; }).join('')}
    </div>` : '';

  return `<div style="display:flex;flex-direction:column;gap:14px">
    <div class="card" style="border-top:3px solid #c084fc;padding:20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
        <div style="font-size:16px;font-weight:800;color:var(--text-primary)">💬 Consultor de Milhas IA</div>
        <div style="display:flex;align-items:center;gap:8px">
          ${consultorHistory.length>0?'<button onclick="consultorHistory=[];render()" style="background:none;border:1px solid var(--border);border-radius:8px;color:var(--text-muted);cursor:pointer;padding:4px 10px;font-size:10px;font-family:inherit">🗑 Limpar</button>':''}
          <span class="plan-badge plan-badge-premium">PREMIUM</span>
        </div>
      </div>
      <div class="chat-counter">${remaining} mensagens restantes este mês (${used}/${CONSULTOR_MONTHLY_LIMIT} usadas)</div>

      <div class="chat-container">
        <div class="chat-messages" id="chat-messages">
          ${messagesHTML}
        </div>
        ${suggestionsHTML}
        <div class="chat-input-bar">
          <textarea class="chat-input" id="chat-input" placeholder="${remaining>0?'Pergunte sobre suas milhas...':'Limite mensal atingido. Renova no próximo mês.'}" rows="1" ${remaining<=0?'disabled':''} onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendConsultorMessage()}" oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,120)+'px'"></textarea>
          <button class="chat-send-btn" onclick="sendConsultorMessage()" ${remaining<=0||consultorSending?'disabled':''}>➤</button>
        </div>
      </div>
    </div>
  </div>`;
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function formatConsultorResponse(text) {
  // Convert markdown-like formatting to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.06);padding:1px 4px;border-radius:4px;font-size:12px">$1</code>')
    .replace(/^• /gm, '• ')
    .replace(/\n/g, '<br>');
}

function sendConsultorFromSuggestion(btn) {
  var msg = btn.getAttribute('data-msg');
  if(msg) {
    document.getElementById('chat-input').value = msg;
    sendConsultorMessage();
  }
}

async function sendConsultorMessage() {
  if(consultorSending) return;
  var inputEl = document.getElementById('chat-input');
  if(!inputEl) return;
  var msg = inputEl.value.trim();
  if(!msg) return;

  if(!canSendConsultorMsg()) {
    showToast('warning', 'Limite atingido', 'Você usou todas as ' + CONSULTOR_MONTHLY_LIMIT + ' mensagens deste mês. Renova automaticamente no próximo mês.');
    return;
  }

  // Add user message
  consultorHistory.push({ role: 'user', content: msg });
  inputEl.value = '';
  inputEl.style.height = 'auto';
  consultorSending = true;
  render();

  // Scroll to bottom
  setTimeout(function() {
    var chatEl = document.getElementById('chat-messages');
    if(chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }, 100);

  try {
    // Build messages array for API
    var apiMessages = consultorHistory.map(function(m) {
      return { role: m.role, content: m.content };
    });

    var response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: buildConsultorSystemPrompt(),
        messages: apiMessages
      })
    });

    if(!response.ok) {
      var errData = await response.json().catch(function(){return {};});
      throw new Error(errData.error?.message || 'Erro na API (status ' + response.status + ')');
    }

    var data = await response.json();
    var aiText = data.content.map(function(c) { return c.type === 'text' ? c.text : ''; }).join('');

    if(!aiText) aiText = 'Desculpe, não consegui processar sua pergunta. Tente reformular.';

    consultorHistory.push({ role: 'assistant', content: aiText });
    incrementConsultorMsg();

  } catch(err) {
    console.error('Consultor error:', err);
    consultorHistory.push({ role: 'assistant', content: '⚠️ **Erro ao conectar com o consultor.** ' + (err.message || '') + '\n\nTente novamente em alguns instantes. Se o problema persistir, verifique sua conexão.' });
  }

  consultorSending = false;
  render();

  // Scroll to bottom after render
  setTimeout(function() {
    var chatEl = document.getElementById('chat-messages');
    if(chatEl) chatEl.scrollTop = chatEl.scrollHeight;
  }, 150);
}
