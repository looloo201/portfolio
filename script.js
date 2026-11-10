'use strict';

// 1. GitHub Pages 주소를 이곳에서 수정하면 프로젝트 카드와 버튼에 모두 반영됩니다.
// 아직 정확한 URL을 모르는 프로젝트는 빈 문자열로 두었습니다.
const CONFIG = {
  projects: {
    rent: 'https://looloo201.github.io/car-rental-demo/',
    card: 'https://looloo201.github.io/lottecard-portfolio/',
    uplus: 'https://looloo201.github.io/lguplus-portfolio/',
    igs: 'https://looloo201.github.io/igs-admin-portfolio/'
  },
  email: 'looloo201@naver.com'
};

// 2. 프로젝트 링크 설정
// 주소를 입력하지 않은 프로젝트는 클릭 시 안내 메시지가 나옵니다.
document.querySelectorAll('[data-project]').forEach((link) => {
  const projectKey = link.dataset.project;
  const url = CONFIG.projects[projectKey];

  if (url) {
    link.href = url;
  } else {
    link.href = '#projects';
    link.removeAttribute('target');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.alert('아직 프로젝트 링크가 등록되지 않았습니다. script.js의 CONFIG.projects에 GitHub Pages 주소를 입력해 주세요.');
    });
  }
});

// 3. 모바일 메뉴
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  });
});

// 4. PDF 저장: 브라우저 인쇄 창에서 'PDF로 저장'을 선택합니다.
document.querySelectorAll('[data-print]').forEach((button) => {
  button.addEventListener('click', () => window.print());
});

// 5. 이메일 버튼
const emailLink = document.querySelector('[data-email]');
if (CONFIG.email) {
  emailLink.href = `mailto:${CONFIG.email}`;
} else {
  emailLink.href = '#contact';
  emailLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.alert('script.js의 CONFIG.email에 이메일 주소를 입력해 주세요.');
  });
}

// 6. 현재 섹션 내비게이션 표시
if ('IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = navigation.querySelectorAll('a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach((section) => observer.observe(section));
}
