function fetchAndRenderProjects() {
  fetch('assets/projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Not OK');
      return res.json();
    })
    .then(data => {
      window.projectCategories = data;
      renderCategories();
    })
    .catch(err => {
      try {
        window.projectCategories = [
          {
            "category": "Boss Fights",
            "projects": [
              {
                "title": "Zeus Boss Fight",
                "description": "A Zeus boss fight where you have to dodge lightning bolts, kill its minions, and then try to kill Zeus without dying.",
                "video": "https://pouch.jumpshare.com/preview/GP40RBJYLXt7AkfcDLDkZnblkLZp2hzPOhs2N_datv5V0tL2Rrsffq6AfBsvtLyfEC1WOh5ZBO-l6cPfV4VJvpDuaJpU2j8OtxoM1DE0BewtZFHJ7uMOmAcV9q_A6HDy9DBHPH1SkmKZefAtn2QbjW6yjbN-I2pg_cnoHs_AmgI.mp4"
              },
              {
                "title": "Warden Squid Fight",
                "description": "A boss where at 50% health, it becomes invulnerable and strikes you with a sonic boom.",
                "video": "assets/videos/glow_squid.mp4"
              },
              {
                "title": "Ancient Elder Guardian",
                "description": "A boss fight where you have to dodge its attacks, kill its minions and kill it for its overpowered rewards.",
                "video": "assets/videos/ancient_elder_guardian.mp4"
              }
            ]
          },
          {
            "category": "GUI's",
            "projects": [
              {
                "title": "Shops",
                "description": "A basic shop GUI for Minecraft.",
                "video": "assets/videos/shop_gui.mp4"
              }
            ]
          },

        ];
        renderCategories();
      } catch (e) {
        const carousel = document.querySelector('.category-carousel');
        if (carousel) carousel.innerHTML = '<div class="category-card"><h3>Failed to load projects</h3></div>';
      }
    });
}

function renderCategories() {
  const carousel = document.querySelector('.category-carousel');
  if (!carousel) return;
  carousel.innerHTML = '';
  if (!window.projectCategories || !Array.isArray(window.projectCategories)) return;
  window.projectCategories.forEach((cat, idx) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.innerHTML = `
      <h3>${cat.category || 'Uncategorized'}</h3>
      <button class="view-projects-btn" data-idx="${idx}">View Projects</button>
    `;
    carousel.appendChild(card);
  });
  if (window.projectCategories.length === 0) {
    const msg = document.createElement('div');
    msg.className = 'category-card';
    msg.innerHTML = '<h3>No categories found</h3>';
    carousel.appendChild(msg);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderProjects);

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('view-projects-btn')) {
    const idx = e.target.getAttribute('data-idx');
    openProjectModal(idx);
  }
  if (e.target.classList.contains('close-modal')) {
    closeProjectModal();
  }
  if (e.target.classList.contains('modal')) {
    closeProjectModal();
  }
});

function openProjectModal(idx) {
  const modal = document.getElementById('projectModal');
  const cat = window.projectCategories[idx];
  document.getElementById('modalCategoryTitle').textContent = cat.category || 'Uncategorized';
  const list = document.getElementById('modalProjectList');
  if (cat.projects && cat.projects.length > 0) {
    list.innerHTML = cat.projects.map(p => {
      let media = '';
      if (p.video) {
        if (/^https?:\/\//.test(p.video)) {
          media = `<div class='video-wrap'><iframe src='${p.video}' frameborder='0' allowfullscreen></iframe></div>`;
        } else {
          media = `<div class='video-wrap'><video controls src='${p.video}' style='width:100%;max-width:340px;border-radius:12px;'></video></div>`;
        }
      }
      return `
        <div class="modal-project">
          <h4>${p.title}</h4>
          <p>${p.description}</p>
          ${media}
        </div>
      `;
    }).join('');
  } else {
    list.innerHTML = '<p>No projects in this category yet.</p>';
  }
  modal.classList.add('open');
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('open');
}
