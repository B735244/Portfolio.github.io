 // ===== Scrollspy (데스크톱 + 모바일 공통) =====
    const sectionIds = [
      "about",
      "skills",
      "projects",
      "experience",
      "education",
      "blog",
      "contact",
    ];

    const sidebarLinks = Array.from(
      document.querySelectorAll(".sidebar-link")
    );
    const mobileLinks = Array.from(
      document.querySelectorAll(".mobile-nav-link")
    );

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
        if (scrollPos + 120 >= offsetTop) {
          currentId = id;
        }
      });

      setActiveLink(currentId);
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);

    // 링크 클릭 시 부드러운 스크롤 + 모바일 메뉴 닫기
    function setupLinkClick(linkList) {
      linkList.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("href").substring(1);
          const el = document.getElementById(targetId);
          if (!el) return;
          const top = el.offsetTop - (window.innerWidth <= 900 ? 70 : 20);
          window.scrollTo({ top, behavior: "smooth" });

          // 모바일 메뉴 접기
          if (window.innerWidth <= 900) {
            mobileNav.classList.remove("open");
            mobileMenuBtn.classList.remove("active");
          }
        });
      });
    }

    setupLinkClick(sidebarLinks);
    setupLinkClick(mobileLinks);

    // ===== 모바일 메뉴 토글 =====
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("active");
        mobileNav.classList.toggle("open");
      });
    }