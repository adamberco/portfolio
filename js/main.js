console.log('Starting up');

renderPortfolio()

function renderPortfolio() {
  const projects = getProjects()
  var strHtml = ''
  for (var i = 0; i < projects.length; i++) {
    strHtml += `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${projects[i].id}')"
         href="#portfolioModal${projects[i].id}">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${projects[i].id}-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${projects[i].name}</h4>
          <p class="text-muted">${projects[i].title}</p>
        </div>
      </div>
      `
  }

  $('.portfolio').html(strHtml)
}

function renderModal(projId) {
  var project = getProjectById(projId)
  var strHtml = ''
  strHtml += `
        <div class="portfolio-modal modal fade" id="portfolioModal${project.id}" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                  <div class="rl"></div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-lg-8 mx-auto">
                    <div class="modal-body">
                      <!-- Project Details Go Here -->
                      <h2>${project.name}</h2>
                      <p class="item-intro text-muted">${project.title}</p>
                      <button class="btn btn-primary" data-dismiss="modal" type="button" onclick = "openProject('${project.id}')">
                      <i class="fa fa "></i>
                      Check it out</button><br>
                      <img class="img-fluid d-block mx-auto mt-2" src="img/portfolio/${project.id}.jpg" alt="">
                      <p>${project.desc}</p>
                      <ul class="list-inline">
                        <li>Date: ${(new Date(project.publishedAt) + '').slice(4, 15)}</li>
                        <li>Client: Threads</li>
                        <li>Category: Illustration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`

  $('.modals').html(strHtml)
}