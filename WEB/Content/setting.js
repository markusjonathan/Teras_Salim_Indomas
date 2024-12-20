$(document).ready(function () {
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");
    if (value == "all") {
      $(".post-box").show("1000");
    } else {
      $(".post-box")
        .not("." + value)
        .hide("1000");
      $(".post-box")
        .filter("." + value)
        .show("1000");
    }
  });

  // Tambahkan kelas aktif ke tombol yang diklik
  $(".filter-item").click(function () {
    $(this).addClass("active-filter").siblings().removeClass("active-filter");
  });
});

// header background change on scroll

let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});

// pagination

$(document).ready(function () {
  const postsPerPageDesktop = 9; // Total posts per page on desktop
  const postsPerPageMobile = 3; // Total posts per page on mobile
  let currentPage = 1; // Default start page
  let postsPerPage =
    window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop; // Posts per page based on screen size
  const posts = $(".post-box");
  let filteredPosts = posts;
  let totalPosts = posts.length;
  let totalPages = Math.ceil(totalPosts / postsPerPage);

  // Reset pagination state on refresh or navigation
  function resetPagination() {
    localStorage.removeItem("lastViewedPage");
    localStorage.removeItem("lastViewedCard");
    currentPage = 1;
    updatePagination();
  }

  // Attach reset logic to logo and navbar links
  $(".logo, .navbar-link").on("click", resetPagination);

  // Initialize pagination
  document.getElementById("totalPages").textContent = totalPages;
  updatePagination();

  // Restore last viewed page and card if exists
  const lastViewedPage = localStorage.getItem("lastViewedPage");
  const lastViewedCard = localStorage.getItem("lastViewedCard");

  if (lastViewedPage) {
    currentPage = parseInt(lastViewedPage);
    updatePagination();
    if (lastViewedCard) {
      setTimeout(() => {
        const cardElement = document.getElementById(lastViewedCard);
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  }

  // Save last viewed page and card
  $(".post-title").on("click", function () {
    const cardId = $(this).closest(".post-box").attr("id");
    localStorage.setItem("lastViewedPage", currentPage);
    localStorage.setItem("lastViewedCard", cardId);
  });

  // Update pagination display
  function updatePagination() {
    posts.hide();
    filteredPosts.each((index, post) => {
      if (
        index >= (currentPage - 1) * postsPerPage &&
        index < currentPage * postsPerPage
      ) {
        $(post).show();
      }
    });

    document.getElementById("currentPage").textContent = currentPage;
    $(".prev").prop("disabled", currentPage === 1);
    $(".next").prop("disabled", currentPage === totalPages);
  }

  // Change page function
  window.changePage = function (step) {
    currentPage += step;
    currentPage = Math.max(1, Math.min(currentPage, totalPages));
    updatePagination();
  };

  // Filter posts logic
  $(".filter-item").click(function () {
    const value = $(this).attr("data-filter");

    if (value === "all") {
      filteredPosts = posts;
    } else {
      filteredPosts = posts.filter("." + value);
    }

    totalPosts = filteredPosts.length;
    totalPages = Math.ceil(totalPosts / postsPerPage);
    currentPage = 1;

    document.getElementById("totalPages").textContent = totalPages;
    updatePagination();
  });

  // Adjust items per page on resize
  window.addEventListener("resize", () => {
    postsPerPage =
      window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop;
    totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    currentPage = Math.min(currentPage, totalPages);
    document.getElementById("totalPages").textContent = totalPages;
    updatePagination();
  });
});

// logika pagenation awal

// $(document).ready(function () {
//   const postsPerPageDesktop = 9; // Total posts per page on desktop
//   const postsPerPageMobile = 3; // Total posts per page on mobile
//   let currentPage = 1; // Current page number
//   let postsPerPage = window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop; // Determine posts per page based on screen size
//   const posts = $('.post-box'); // Select all posts
//   let filteredPosts = posts; // To store filtered posts
//   let totalPosts = posts.length; // Total number of posts
//   let totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages

//   // Initialize pagination on load
//   document.getElementById("totalPages").textContent = totalPages;
//   updatePagination();

//   // Filter posts
//   $(".filter-item").click(function () {
//     const value = $(this).attr("data-filter");

//     // Filter logic
//     if (value === "all") {
//       filteredPosts = posts; // Show all posts
//     } else {
//       filteredPosts = posts.filter("." + value); // Filter based on selected category
//     }

//     totalPosts = filteredPosts.length; // Update total posts based on filter
//     totalPages = Math.ceil(totalPosts / postsPerPage); // Recalculate total pages
//     currentPage = 1; // Reset to first page

//     // Update pagination display
//     document.getElementById("totalPages").textContent = totalPages;
//     updatePagination();
//   });

//   // Update pagination display based on current page
//   function updatePagination() {
//     // Hide all posts initially
//     posts.hide();

//     // Show only the filtered posts based on current page
//     filteredPosts.each((index, post) => {
//       if (index >= (currentPage - 1) * postsPerPage && index < currentPage * postsPerPage) {
//         $(post).show();
//       }
//     });

//     // Update pagination info
//     document.getElementById("currentPage").textContent = currentPage;
//     document.querySelector('.prev').disabled = currentPage === 1; // Disable 'prev' button if on first page
//     document.querySelector('.next').disabled = currentPage === totalPages; // Disable 'next' button if on last page
//   }

//   // Change page function
//   window.changePage = function (step) {
//     currentPage += step; // Update current page
//     currentPage = Math.max(1, Math.min(currentPage, totalPages)); // Ensure current page stays within bounds
//     updatePagination(); // Update pagination display
//   };

//   // Adjust items per page on resize
//   window.addEventListener('resize', () => {
//     postsPerPage = window.innerWidth <= 768 ? postsPerPageMobile : postsPerPageDesktop; // Adjust posts per page
//     totalPages = Math.ceil(filteredPosts.length / postsPerPage); // Recalculate total pages based on filtered posts
//     currentPage = Math.min(currentPage, totalPages); // Reset current page if exceeds total pages
//     document.getElementById("totalPages").textContent = totalPages; // Update total pages display
//     updatePagination(); // Update pagination display
//   });
// });
