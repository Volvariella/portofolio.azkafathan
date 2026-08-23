function getImageUrl(project, width) {
  width = width || 800;
  if (project.image) {
    return project.image;
  }
  if (project.imageId) {
    return "https://images.unsplash.com/" + project.imageId + "?auto=format&fit=crop&w=" + width + "&q=80";
  }
  return "";
}

function renderCards(containerId, projects, options) {
  options = options || {};
  var container = document.getElementById(containerId);
  if (!container) return;

  var filter = options.filter || "all";
  var width = options.width || 800;
  var linkResolver = options.linkResolver || null;

  var filtered = filter === "all" ? projects : projects.filter(function(p) { return p.category === filter; });

  container.innerHTML = filtered.map(function(project) {
    var image = getImageUrl(project, width);
    var alt = project.alt || project.title;
    var cardContent = '<div class="project-card__image"><img src="' + image + '" alt="' + alt + '" loading="lazy" /></div>' +
      '<div class="project-card__body">' +
        '<div class="project-card__meta">' +
          "<span>" + project.category + "</span>" +
          "<span>" + project.year + "</span>" +
        "</div>" +
        "<h3 class=\"project-card__title\">" + project.title + "</h3>" +
        "<p class=\"project-card__summary\">" + project.summary + "</p>" +
      "</div>";

    if (linkResolver) {
      var href = linkResolver(project);
      if (href) {
        return '<a class="project-card-link" data-category="' + project.category + '" href="' + href + '"><article class="project-card">' + cardContent + "</article></a>";
      }
    }

    return '<article class="project-card" data-category="' + project.category + '">' + cardContent + "</article>";
  }).join("");
}
