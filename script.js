document.addEventListener('DOMContentLoaded', () => {
    const categories = ['learned', 'fuzzy', 'challenge', 'goal'];
  
    // ---------- 1. Carregar registros existentes ----------
    fetch('/api/journal')               // em produção (Vercel), o front e o back costumam compartilhar domínio;
      .then(r => r.json())
      .then(entries => {
        entries.forEach(({ category, entry_text }) => addListItem(category, entry_text));
      })
      .catch(console.error);
  
    // ---------- 2. Tratar UI de cada categoria ----------
    categories.forEach(category => {
      const addBtn        = document.getElementById(`${category}-add-btn`);
      const inputContainer= document.getElementById(`${category}-input-container`);
      const saveBtn       = document.getElementById(`${category}-save-btn`);
      const input         = document.getElementById(`${category}-input`);
  
      if (!addBtn) return;     // id não encontrado? pula
  
      addBtn.addEventListener('click', () => {
        inputContainer.classList.remove('d-none');
        input.focus();
      });
  
      saveBtn.addEventListener('click', async () => {
        const entryText = input.value.trim();
        if (!entryText) return;
  
        try {
          // POST no backend
          const res  = await fetch('/api/journal', {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify({ category, entryText }),
          });
          if (!res.ok) throw new Error('POST failed');
  
          const saved = await res.json();         // resposta = linha gravada
          addListItem(saved.category, saved.entry_text);
  
          // Limpa e esconde textarea
          input.value = '';
          inputContainer.classList.add('d-none');
        } catch (err) {
          console.error('Erro ao gravar:', err);
          alert('Erro ao salvar. Tente novamente.');
        }
      });
    });
  
    // ---------- Utilitário ----------
    function addListItem(category, text) {
      const list = document.getElementById(`${category}-records`);
      if (!list) return;
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = text;
      list.appendChild(li);
    }
  });
  