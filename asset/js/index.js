// ======================= 공통 요소 캐싱 =======================
    const sectionIds = [
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "blog",
      "contact",
    ];

    const sidebarLinks = Array.from(document.querySelectorAll(".sidebar-link"));
    const mobileLinks  = Array.from(document.querySelectorAll(".mobile-nav-link"));

    //  모바일 햄버거/내비 요소를 최상단에서 캐싱 (클릭 시 참조 오류 방지)
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav     = document.getElementById("mobileNav");

    // ======================= Scrollspy =======================
    function setActiveLink(id) {
      sidebarLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
      mobileLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }

    function onScroll() {
      const scrollPos = window.scrollY;
      let currentId = sectionIds[0];

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const offsetTop = el.offsetTop;
        const offsetBottom = offsetTop + el.offsetHeight;

        // Contact 같은 하단 섹션도 잘 잡히도록 처리
        if (scrollPos + window.innerHeight >= offsetBottom - 100) {
          currentId = id;
        } else if (scrollPos + 150 >= offsetTop) {
          currentId = id;
        }
      });

      setActiveLink(currentId);
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);

    // ==================== 섹션 클릭 시 부드러운 스크롤 ====================
    function setupLinkClick(linkList) {
      linkList.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const el = document.getElementById(targetId);
          if (!el) return;

          // 모바일에서는 헤더 높이(60px)를 고려한 오프셋 적용
          const offset = window.innerWidth <= 900 ? 70 : 20;
          const top = el.offsetTop - offset;
          window.scrollTo({ top, behavior: "smooth" });

          // 모바일에서 메뉴 항목 클릭 시 내비/아이콘 닫기
          if (window.innerWidth <= 900 && mobileNav && mobileMenuBtn) {
            mobileNav.classList.remove("open");
            mobileMenuBtn.classList.remove("active");
          }
        });
      });
    }

    setupLinkClick(sidebarLinks);
    setupLinkClick(mobileLinks);

    // ======================= 모바일 햄버거 메뉴 토글 =======================
    //  모바일 헤더의 햄버거 버튼 클릭 시 메뉴 열고/닫기
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("active");
        mobileNav.classList.toggle("open");
      });
    }